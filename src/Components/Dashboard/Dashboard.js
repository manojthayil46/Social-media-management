import React, { Component } from "react";
// import firebase from "firebase";
import fire from "../../Fire";
import Styles from "./Dashboard.module.css";
// import { NavLink } from "react-router-dom";
import Modal from "../../Modal/Modal";
import { connect } from "react-redux";

class Dashboard extends Component {
  state = {
    showModal: false,
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
  render() {
    return (
      <div>
        <div className={Styles.header}>
          <div className={Styles.headerLeft}>
            <ul>
              <li>
                <button type="button" class="btn btn-primary mr-5">
                  Dashboard
                </button>
              </li>
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
              <li classNameName={Styles.tabs}>
                <button
                  type="button"
                  className="btn btn-light mr-2"
                  to="/History"
                >
                  History
                </button>
              </li>
              <li classNameName={Styles.tabs}>
                <button type="button" className="btn btn-light mr-2" to="/">
                  Settings
                </button>
              </li>
            </ul>
          </div>

          <div classNameName={Styles.headerRight}>
            <div>
              <h5>Welcome {this.props.user.displayName}!</h5>
              {/* <img
                classNameName={Styles.profileLogo}
                alt="profile picture"
                src={this.props.user.photoURL}
              /> */}
              <h6 style={{ color: "white" }}>
                {this.props.user.email ? this.props.user.email : ""}
              </h6>
            </div>

            <button className="btn btn-light mr-2" onClick={this.onSignOut}>
              Logout
            </button>
          </div>
        </div>

        {this.state.showModal ? <Modal closeModal={this.closeModal} /> : null}
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
