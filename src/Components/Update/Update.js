import React, { Component } from "react";
import axios from "axios";

class Update extends Component {
  state = {
    description: "",
    timestamp: "",
  };

  update = () => {
    axios
      .post(
        `https://graph.facebook.com/${this.props.postid}?published=false&message=${this.state.description}&access_token=EAADrPoZB6tE0BAKxAg1MIlZC3aD69VZAS44mSBJ6Cub3vuyPVfd6ZCtu1dLP5Y6v9wG6uEm0sbYlgrIW5Hnv3ONQhxLic7doPVAG7TJt5GDN5rCTZAdfximH5iKbqnPU5gdJWUXyytrFR7FWXmuQKSBGf7nITDFgYuC9jVWEiUgNNpybZBTljg7yDv3YKhj6IZD&scheduled_publish_time=${this.state.timestamp}`
      )
      .then(
        fetch(
          `https://capstone-c76c3.firebaseio.com/scheduledpost/${this.props.key}`,
          {
            method: "PUT",
            body: JSON.stringify({
              description: this.state.description,
              timestamp: this.state.timestamp,
              post_id: this.props.id,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        )
          .then((response) => response.json())
          .then((json) => console.log(json))
      );
  };

  updatePost = (event) => {
    let value = event.target.value;
    if (event.target.id === "textarea") {
      this.setState({
        description: value,
      });
    }
    if (event.target.id === "timestamp") {
      this.setState({
        timestamp: value,
      });
    }
  };

  delete = (postid, key) => {
    axios
      .delete(
        `https://graph.facebook.com/${postid}?access_token=EAADrPoZB6tE0BAKxAg1MIlZC3aD69VZAS44mSBJ6Cub3vuyPVfd6ZCtu1dLP5Y6v9wG6uEm0sbYlgrIW5Hnv3ONQhxLic7doPVAG7TJt5GDN5rCTZAdfximH5iKbqnPU5gdJWUXyytrFR7FWXmuQKSBGf7nITDFgYuC9jVWEiUgNNpybZBTljg7yDv3YKhj6IZD`
      )
      .then((response) => {
        axios.delete(
          `https://capstone-c76c3.firebaseio.com/scheduledpost/${key}`
        );
      });
  };

  render() {
    return (
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
            onChange={this.updatePost}
          ></textarea>
          <br />
          <br />

          <label htmlFor="timestamp">
            {" "}
            <strong>Enter the Date</strong>
          </label>
          <br />
          <br />
          <input
            type="text"
            name="unix"
            onChange={this.updatePost}
            id="timestamp"
          />
          <br></br>
          <button type="button" class="btn btn-primary" onClick={this.update}>
            Update
          </button>
          <button
            type="button"
            class="btn btn-danger"
            style={{ margin: "10px" }}
            onClick={() => this.delete(this.props.postid, this.props.key)}
          >
            Delete
          </button>
        </form>
      </div>
    );
  }
}

export default Update;
