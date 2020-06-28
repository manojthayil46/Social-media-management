import React, { Component } from "react";
import fire from "./Fire";
import "./App.css";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import Sidebar from "./Components/Sidebar/Sidebar";
import Modal from "./Modal/Modal";
import History from "./Components/History/History";
class App extends Component {
  state = {
    user: "",
  };

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/" exact component={Login} />

          <Switch>
            <Route path="/Dashboard" component={Dashboard} />
            <Route path="/History" component={History} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
