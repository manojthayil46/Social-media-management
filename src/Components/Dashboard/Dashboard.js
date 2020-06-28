import React, { Component } from "react";
// import firebase from "firebase";
import fire from "../../Fire";
import Styles from "./Dashboard.module.css";
// import { NavLink } from "react-router-dom";
import Modal from "../../Modal/Modal";
import { connect } from "react-redux";
import Sidebar from "../Sidebar/Sidebar";
import Update from "../Update/Update";

class Dashboard extends Component {
  state = {
    showModal: false,
    description: "",
    timestamp: "",
    key: "",
    postid: "",
    showUpdateBox: false,
  };

  onSignOut = () => {
    fire.auth().signOut();
    if (fire.auth().signOut()) {
      this.props.history.replace("/");
    } else {
      console.log("logout failed");
    }
  };

  createPostt = () => {
    this.setState({
      showModal: true,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
    });
  };

  updateSent = (description, timestamp, key, postid) => {
    console.log("key is" + key);
    this.setState({
      description: description,
      timestamp: timestamp,
      key: key,
      postid: postid,
      showUpdateBox: true,
    });
  };

  nextPath = (path) => {
    this.props.history.push("/History");
  };
  render() {
    return (
      <div>
        <div className={Styles.header}>
          <div className={Styles.headerLeft}>
            <p className={Styles.dashboard_logo}>Social Media Management</p>

            <ul>
              <li>
                <button
                  type="button"
                  class="btn btn-light mr-2"
                  onClick={this.createPostt}
                >
                  create Post
                </button>
              </li>
              <li className={Styles.tabs}>
                <button type="button" class="btn btn-light mr-2" to="/">
                  Queue
                </button>
              </li>
              <li className={Styles.tabs}>
                <button
                  type="button"
                  className="btn btn-light mr-2"
                  onClick={() => this.nextPath("/History")}
                >
                  History
                </button>
              </li>
              <li className={Styles.tabs}>
                <button type="button" className="btn btn-light mr-2" to="/">
                  Settings
                </button>
              </li>
            </ul>
          </div>

          <div className={Styles.headerRight}>
            <div>
              <h5>Welcome {this.props.user.displayName}!</h5>
              <img
                className={Styles.profileLogo}
                alt="profile picture"
                src={this.props.user.photoURL}
              />
              <h6 style={{ color: "white" }}>
                {this.props.user.email
                  ? this.props.user.email
                  : "manojthayil786@gmail.com"}
              </h6>
            </div>

            <button className={Styles.logout} onClick={this.onSignOut}>
              Logout
            </button>
          </div>
        </div>

        <div class={Styles.flexcontainer}>
          <div class={Styles.columns}>
            <Sidebar updateSent={this.updateSent} />
          </div>
          <div class={Styles.columns}>
            {this.state.showModal ? (
              <Modal closeModal={this.closeModal} />
            ) : null}

            {this.state.showUpdateBox ? (
              <Update
                description={this.state.description}
                timestamp={this.state.timestamp}
                postid={this.state.postid}
                key={this.state.key}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Dashboard);
