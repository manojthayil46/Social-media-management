import React, { Component } from 'react';
import './Modal.css';
import axios from 'axios';

class Modal extends Component {

    state = {
        description : '',
        timestamp : ''
        
    }

    closeModal = (event) =>{
        this.props.closeModal(event) && this.props.closeModal();
    }

    schedule = () =>{
            axios.post(`https://graph.facebook.com/101549628270074/feed?published=false&message=${this.state.description}&access_token=EAADrPoZB6tE0BABJIWx0jkwGnDSCyb2h0qLfTNShWNH5IBdAqIwx4W9A3Wtj0hZCdTZC3q2zNN0yRENz3P5aOs9ZBZAZCe2VqKUXvzBM6P8SQpbkwkfQlLOWB2vqEelRZAcSMnvZAUyUt4ZATeQInCHMCPTwGj9eam2D8Cmwqb4hDbpPnMTWLFlxdF9ZCaEJsKL7dKcPXEgZCzPfQZDZD&scheduled_publish_time=${this.state.timestamp}`
            ).
        then(response =>{
            console.log(response)
        }).catch(error => console.log(error));

    }

    shareNow = () =>{
        axios.post("https://graph.facebook.com/101549628270074/feed?",{
            message : this.state.description,
            access_token:"EAADrPoZB6tE0BAJWeNJp3z6XxlPgIMgBkfWlEWOkxNNHl7xXLPbU96HaGQBtjm0b2YgZARyPs9eywjFJZBPqTQqktfma8JuU7aomlUMjKc1kwAmgPF5TXPoeKf24FWkT3cOVqyuFwx17fHUq78DpnbhmmitYL2OdcuBZBbS7hUhBgA3ogrZBa29XID4bOGffY0srxdHpkRwZDZD"
            
        }).then(response =>{
            axios.post("https://capstone-c76c3.firebaseio.com/users.json",{
                message : this.state.description
            }).then(this.closeModal)
            
            
        }).catch(console.log("Token has been expired"))
    }

    myPost = (event) =>{
        let value = event.target.value;
        if(event.target.id === "textarea"){
            this.setState({
                description : value
            })
        }
        if(event.target.id === "timestamp"){
            this.setState({
                timestamp : value
            })
        }
        

    }

    render() {
        return (
            <div>
                

                <div className="Modal" style={{height: '300px', textAlign: 'center', position: 'fixed', 
                        backgroundColor: '#D3D3D3', zIndex: '500', left: '15%', top: '15%', 
                        boxSizing: 'border-box', width: '50%', borderRadius:'10px'}}>
                            <button type="button" className="close" onClick ={this.closeModal} >&times;</button>
                      
                        <form>
                            <label htmlFor='name'> <strong>Write some text</strong></label><br/><br/>
                            
                            <textarea wrap="off" cols="60" rows="5" id = "textarea" placeholder = "Write some text..." onChange= {this.myPost}></textarea>
                                <br/><br/>

                                <label htmlFor='timestamp'> <strong>Enter Unix timestamp</strong></label><br/><br/>
                                <input type = "text" name = "unix"  onChange= {this.myPost} id = "timestamp"/>
        
                        
                        </form>
                       
                        <button type="button" class="btn btn-primary" onClick={this.shareNow}>Share Now</button>
                        <button type="button" class="btn btn-primary" onClick={this.schedule}style ={{margin:'10px'}}>Schedule</button>
                       <div id="errorMsg"></div>
                 </div>
            </div>
        );
    }
}



export default Modal;