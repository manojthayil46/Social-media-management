import React, { Component } from 'react';
import firebase from 'firebase';
import fire from '../../Fire';
import Styles from'./Dashboard.module.css';
import {NavLink, Route,Link} from 'react-router-dom';
import Modal from '../../Modal/Modal';
import {connect} from 'react-redux';

class Dashboard extends Component {


    state = {
        showModal : false
    }



    onSignOut = () =>{
        fire.auth().signOut();
        if(fire.auth().signOut()){
            this.props.history.replace('/');
            
        }
        else{
            console.log("logout failed");
        }
        
        
    }

     createPostt = () =>{
         this.setState({
             showModal : true
         })

    }


    closeModal = () =>{
        this.setState({
            showModal:false
        })
    }
    render() {

        return (
     <div>
                
            <div className = {Styles.header}>

                <div className ={Styles.headerLeft}>
                         <ul>
                            <li><a onClick={this.createPostt}>create Post</a></li>
                            <li className = {Styles.tabs}><NavLink className = {Styles.Nav_Link} to="/" >Queue</NavLink></li>
                            <li className = {Styles.tabs}><NavLink className = {Styles.Nav_Link} to="/History" >History</NavLink></li>
                            <li className = {Styles.tabs}><NavLink className = {Styles.Nav_Link} to="/" >Settings</NavLink></li>
                        </ul>
                </div>

                <div className = {Styles.headerRight}>
                      <div>
                          <h5>Welcome {this.props.user.displayName}!</h5> 
                          <img className = {Styles.profileLogo} alt="profile picture" src={this.props.user.photoURL}/> 
                         <h6 style = {{color : 'white'}}>{this.props.user.email ? this.props.user.email : 'manojthayil786@gmail.com'}</h6>  
                      </div>
            
                       <button className = {Styles.logout} onClick={this.onSignOut}>Logout</button>
                </div> 
            </div>
            
            
         {this.state.showModal ? 
         <Modal closeModal = {this.closeModal} />: null}
          
    </div>
        );
    }
}


const mapStateToProps = (state) => {

    return{
      user: state.user
  
    }
  }
  

export default connect(mapStateToProps) (Dashboard);