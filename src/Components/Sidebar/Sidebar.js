import React, { Component } from "react";
import Card from "../Card/Card";
import { connect } from "react-redux";
import axios from "axios";

class Sidebar extends Component {
  state = {
    change: [],
    isDataSet: false,
  };

  componentDidUpdate = () => {
    axios
      .get("https://capstone-c76c3.firebaseio.com/scheduledpost.json")
      .then((response) => {
        if (response.data == null) {
          this.setState({
            change: null,
            isDataSet: false,
          });
        } else {
          const mydata = Object.entries(response.data);
          console.log(mydata);
          this.setState({
            change: mydata,
            isDataSet: true,
          });
        }
      });
  };

  updateDetails = (description, timestamp, key, postid) => {
    console.log("function called");
    this.props.updateSent(description, timestamp, key, postid);
  };

  render() {
    return (
      <div
        className="wrapper"
        //className="d-flex overflow-auto flex-column m-2"
        style={{
          width: "21%",
          height: "100%",
          position: "fixed",
          backgroundColor: "white",
          overflowY: "scroll",
        }}
      >
        {this.state.isDataSet ? (
          this.state.change.map((data) => {
            return (
              <Card
                key={data[0]}
                description={data[1].description}
                timestamp={data[1].timestamp}
                clicked={() =>
                  this.updateDetails(
                    data[1].description,
                    data[1].timestamp,
                    data[0],
                    data[1].post_id
                  )
                }
              />
            );
          })
        ) : (
          <p
            style={{
              textAlign: "center",
              top: "40%",
              position: "absolute",
              left: "20%",
            }}
          >
            No Post Scheduled...
          </p>
        )}
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     getchange: state.change,
//   };
// };

// export default connect(mapStateToProps, null)(Sidebar);

export default Sidebar;
