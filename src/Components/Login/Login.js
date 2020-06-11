import React from 'react';
import fire from '../../Fire';
import firebase from 'firebase';
import Styles from './Login.module.css';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import {connect} from 'react-redux';

class Login extends React.Component {
    
    uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.TwitterAuthProvider.PROVIDER_ID 
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }

  componentDidMount = () => {
    fire.auth().onAuthStateChanged(user => {
      //this.setState({ isSignedIn: !!user })
      //this.props.onPageLoad(!!user);
     
             
      console.log("user", user)
    })
  }

   signin = () =>
    {
    var provider = new firebase.auth.TwitterAuthProvider();
    fire.auth().useDeviceLanguage();
    fire.auth().signInWithPopup(provider).then(user => {
  // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
  // You can use these server side with your app's credentials to access the Twitter API.
     this.props.history.replace('/Dashboard');
  
  console.log(user);
 
    })
  }

  signintest = ()=>{
    this.props.history.replace('/Dashboard')
  }

  render() {
    return (
        <div className = {Styles.container}>
          <div className = {Styles.wrapper}>
           
           <p className = {Styles.logo}>Social Media Management </p>
              
              <ul className = {Styles.wrapper_right}>
                <li><a href ="#">Home</a></li>
                <li><a href = "#">AboutUs</a></li>
                <li><a href = "#">Contact</a></li>
              </ul>
              
              </div>
              
                   
            {this.props.isSignedIn ? (
          <span>
            <div>Signed In!</div>
            

           
          </span>
        ) :
        <div>
        <button className = {Styles.twitter_btn} onClick={this.signin} id="sign-in">
            Sign in with Twitter
        </button><br></br>

        <button className = {Styles.twitterr_btn} onClick={this.signintest} id="sign-in">
            Signtest
        </button>



        </div>

        
          
          // <StyledFirebaseAuth 
          //   uiConfig={this.uiConfig}
          //   firebaseAuth={firebase.auth()}
          ///>
        }
	
             
  </div>

    )
  }
}

const mapStateToProps = (state) => {
  return{
    isSignedIn : state.isSignedIn

  }
}

const mapDispatchToProps = (dispatch) =>{

  return{
    //onPageLoad = (value) => dispatch({type : 'ISSIGNEDIN',value:value})

  }

}

export default connect(mapStateToProps,mapDispatchToProps) (Login);