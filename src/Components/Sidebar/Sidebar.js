import React, { Component } from "react";

class Sidebar extends Component {
  render() {
    return (
      <div
        className="wrapper"
        style={{
          width: "20%",
          height: "100%",
          position: "fixed",
          backgroundColor: "white",
        }}
      ></div>
    );
  }
}

export default Sidebar;
