import axios from "axios";
import { PureComponent } from "react";

class Form extends PureComponent{
    state ={
        adress: this.props.adress,
        title: '',
        body: '',
        isEmpty: null,
        error: '',  
        statusText:''
    }
    addNewPost = (adress, data)=>{
        axios({
            method: 'post',
            url: adress,
            data: {
              title:data.title,
              body: data.body
            }
          })
          .then((e) =>{
             if(e.status >= 200 && e.status <= 299){
                this.getPosts(adress)
             }
             else{
                this.setState({
                    statusText: e.status
                })
             }
          })
          .catch((e)=> {
            console.dir(e.message);
              this.setState({
                statusText: e.message
            })
            
           
        })
          
    }
    getPosts =(adress) =>{
        axios.get(adress)
                    .then((res)=>{
                    let {status, data} = res;
                        console.log('---> get',res);
                        let error = status === 200 ? null : error.massage;
                        this.setState({
                        data,
                        isLoading: false
                        })
                    })
    }

    handleForm =(e)=>{
        e.preventDefault();
        let dataPost = {title:this.state.title, body: this.state.body};

        if(dataPost.title.length >=1 && dataPost.body.length >=1){
            this.setState({
                error: '',
                isEmpty: false,
            })
            this.addNewPost(this.state.adress, dataPost);
        }
        else{
            this.setState({
                isEmpty:true,
            })
        }
       
       
       
    }

    handleTitle = (e) =>{
        this.setState({
            title: e.target.value 
        })

    }
    handleBody = (e) =>{
        this.setState({
            body: e.target.value 
        })
    }

    render(){
       
        return(
            <div>
                {this.state.statusText && <div>Error form!{this.state.statusText}</div>}
                <form onSubmit ={this.handleForm}>
                {this.state.isEmpty && <h2>Fill the fields!!!</h2>}
                    <label htmlFor=''>Title<input type='text' onChange = {this.handleTitle}></input></label>
                    <label htmlFor=''>Body<input type= 'text-area' onChange = {this.handleBody}></input></label>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default Form
