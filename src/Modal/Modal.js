import React, { Component } from "react";
import "./Modal.css";
import axios from "axios";
import { connect } from "react-redux";

class Modal extends Component {
  closeModal = (event) => {
    this.props.closeModal(event) && this.props.closeModal();
  };

  schedule = () => {
    const url =
      "EAADrPoZB6tE0BAB1i3yHh3cSyT6Ns1GU2A62n5eexirEJiDYhtuzVRBHJyUBhnEZAH12BvZBEoKBSxNtvoL1FiJMozUZBZBTEGZAqxTcxsbZCtdzbdcqNV2XeagZAiN5LmBOhwTLY4be4ZBmSrQdeZAJoMfFrXZCppAoNQpwyP8XwHCdyZCWPstOVap2ZANaILNr6tBAZD";
    axios
      .post(
        `https://graph.facebook.com/101549628270074/feed?published=false&message=${this.props.getdescription}&access_token=${url}&scheduled_publish_time=${this.props.gettimestamp}`
      )
      .then((response) => {
        console.log(response.data);
        const mydata = {
          description: this.props.getdescription,
          timestamp: this.props.gettimestamp,
          post_id: response.data.id,
        };
        axios
          .post(
            "https://capstone-c76c3.firebaseio.com/scheduledpost.json",
            mydata
          )
          .then((response) => {
            console.log(response);
          });

        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  shareNow = () => {
    const url =
      "EAADrPoZB6tE0BAB1i3yHh3cSyT6Ns1GU2A62n5eexirEJiDYhtuzVRBHJyUBhnEZAH12BvZBEoKBSxNtvoL1FiJMozUZBZBTEGZAqxTcxsbZCtdzbdcqNV2XeagZAiN5LmBOhwTLY4be4ZBmSrQdeZAJoMfFrXZCppAoNQpwyP8XwHCdyZCWPstOVap2ZANaILNr6tBAZD";
    axios
      .post("https://graph.facebook.com/101549628270074/feed?", {
        message: this.props.getdescription,
        access_token: url,
      })
      .then((response) => {
        axios
          .post("https://capstone-c76c3.firebaseio.com/users.json", {
            message: this.props.getdescription,
          })
          .then(this.closeModal);
      })
      .catch(console.log("Token has been expired"));
  };

  myPost = (event) => {
    let value = event.target.value;
    if (event.target.id === "textarea") {
      this.props.description(value);
    }
    if (event.target.id === "timestamp") {
      this.props.timestamp(value);
    }
  };

  render() {
    return (
      <div>
        <div
          className="Modal"
          style={{
            height: "400px",
            textAlign: "center",
            position: "fixed",
            backgroundColor: "#D3D3D3",
            zIndex: "500",
            left: "25%",
            top: "15%",
            boxSizing: "border-box",
            width: "50%",
            borderRadius: "10px",
          }}
        >
          <button type="button" className="close" onClick={this.closeModal}>
            &times;
          </button>

          <form>
            <label htmlFor="name">
              {" "}
              <strong>Write some text</strong>
            </label>
            <br />
            <br />

            <textarea
              wrap="off"
              cols="80"
              rows="5"
              id="textarea"
              placeholder="Write some text..."
              onChange={this.myPost}
            ></textarea>
            <br />
            <br />

            <label htmlFor="timestamp">
              {" "}
              <strong>Enter Unix timestamp</strong>
            </label>

            <br />
            <input
              type="text"
              name="unix"
              onChange={this.myPost}
              id="timestamp"
            />
          </form>

          <button type="button" class="btn btn-primary" onClick={this.shareNow}>
            Share Now
          </button>
          <button
            type="button"
            class="btn btn-primary"
            onClick={this.schedule}
            style={{ margin: "10px" }}
          >
            Schedule
          </button>
          <div id="errorMsg"></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getdescription: state.description,
    gettimestamp: state.timestamp,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    description: (description) =>
      dispatch({ type: "description", value: description }),
    timestamp: (timestamp) => dispatch({ type: "timestamp", value: timestamp }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
