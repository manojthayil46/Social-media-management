import React, { Component } from "react";
// import { connect } from "react-redux";

class Card extends Component {
  render() {
    return (
      <div
        class="card text-white bg-dark mb-3"
        style={{ maxWidth: "18rem" }}
        onClick={this.props.clicked}
      >
        <div class="card-header">{this.props.timestamp}</div>
        <div class="card-body">
          <h5 class="card-title"></h5>
          <p class="card-text">{this.props.description}</p>
        </div>
      </div>
    );
  }
}

export default Card;
