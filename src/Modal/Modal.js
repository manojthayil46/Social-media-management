import React, { Component } from 'react';
import './Modal.css';
import axios from 'axios';

class Modal extends Component {

    state = {
        description : ''
        
    }

    closeModal = (event) =>{
        this.props.closeModal(event) && this.props.closeModal();
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
        
                        
                        </form>
                       
                        <button type="button" class="btn btn-primary" onClick={this.shareNow}>Share Now</button>
                        <button type="button" class="btn btn-primary" style ={{margin:'10px'}}>Schedule</button>
                       <div id="errorMsg"></div>
                 </div>
            </div>
        );
    }
}



export default Modal;