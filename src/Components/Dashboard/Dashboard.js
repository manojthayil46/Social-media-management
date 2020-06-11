import React, { Component } from 'react';
import firebase from 'firebase';
import fire from '../../Fire';
import Styles from'./Dashboard.module.css';
import {NavLink} from 'react-router-dom';

class Dashboard extends Component {



    onSignOut = () =>{
        fire.auth().signOut();
        if(fire.auth().signOut()){
            this.props.history.replace('/');
            
        }
        else{
            console.log("logout failed");
        }
        
        
    }
    render() {

        return (
            <div>
                
            <div className = {Styles.header}>
            <div className ={Styles.headerLeft}>

            <ul>
                            <li className = {Styles.list_tabs}><NavLink className = {Styles.Nav_Link} to="/" >Create Post</NavLink></li>
                            <li className = {Styles.list_tabs}><NavLink className = {Styles.Nav_Link} to="/" >Queue</NavLink></li>
                            <li className = {Styles.tabs}><NavLink className = {Styles.Nav_Link} to="/" >History</NavLink></li>
                            <li className = {Styles.tabs}><NavLink className = {Styles.Nav_Link} to="/" >Settings</NavLink></li>
            </ul>
            </div>

            <div className = {Styles.headerRight}>

            
            <div>
            <h5>Welcome Manoj!!</h5> 
            <img className = {Styles.profileLogo} alt="profile picture" src='zoho.png'/> 
            <h6 style = {{color : 'white'}}>manojthayil786@gmail.com</h6>  
            
            </div>
            <button className = {Styles.logout} onClick={this.onSignOut}>Logout</button>
            </div> 
            </div>
    
            </div>
        );
    }
}

export default Dashboard;