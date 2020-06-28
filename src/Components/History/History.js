import React, { Component } from "react";
import axios from "axios";
import "./History.css";

class History extends Component {
  state = {
    data: [],
  };

  componentDidMount() {
    axios
      .get("https://capstone-c76c3.firebaseio.com/users.json")
      .then((response) => {
        console.log(response);
        const data = response.data;
        const values = Object.values(data);
        console.log(values);

        this.setState({
          data: values,
        });
      });
  }

  render() {
    //   let myMap = this.state.data.map((post, index) => {
    //     return (
    //       <li className="container" key={index}>
    //         {post.message}
    //       </li>
    //     );
    //   });

    //   return <div className="wrapper">{myMap}</div>;
    return (
      <div className="wrapper">
        <p className="recentPosts">Recent Posts</p>
        {this.state.data.map((post, index) => {
          return (
            <li className="container" key={index}>
              {post.message}
            </li>
          );
        })}
        ;
      </div>
    );
  }
}

export default History;
