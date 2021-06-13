import { PureComponent } from "react";
import axios from 'axios';
import Form from "./Form";
const adress = 'https://60bb880442e1d00017620c95.mockapi.io/Postss/';

class App extends PureComponent{
  state={
    isLoading: false,
    error: null,
    data: null,
  }

  componentDidMount(){
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

    .catch((error)=> {
      this.setState({
        error:error.message,
        data: null,
        isLoading:false,
      })
      
    })

    this.setState({
      isLoading: true,
    })

  }

  render(){
    return(
    <div className="list-wrapper">
      <Form adress = {adress}/>
      {this.state.isLoading ?(<div>Loading... </div>): 
      ( <div>{this.state.error !== null ? 
        (
          <div>Error Posts! {this.state.error}</div>
        ) : 
        ( <div>
            {this.state.data && this.state.data.map((el) =>(
            <div key= {el.id} className="element-wrapper">{el.title}
            <h2 className="element-title">{el.title}</h2>
            <p className="element-text">{el.body}</p></div>))}
          </div>
      )}
    </div>
    )
  }
  </div>
  
  );
} 
}
export default App;