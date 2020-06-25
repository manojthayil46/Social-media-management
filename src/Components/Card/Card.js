import React, { Component } from "react";

class Card extends Component {
  render() {
    return (
      <div class="card text-white bg-dark mb-3" style={{ maxWidth: "18rem" }}>
        <div class="card-header">Header</div>
        <div class="card-body">
          <h5 class="card-title">Dark card title</h5>
          <p class="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
        </div>
      </div>
    );
  }
}

export default Card;
