import React, { PureComponent } from "react";
import './Citty.css';


class Citty extends PureComponent{
    state = {
        postitionX: null,
        positionY: null,
        isAddedKitty: false,
        kittyHovered: false
    }
    
    buttonClicked = (e) =>{
        this.setState({
            isAddedKitty: !this.state.isAddedKitty,
        })
        
        
        // Заменить на onMOunt
        let lilKit = document.querySelector('.kitty')
        document.onmousemove = (e) => {
            // console.log(e.clientX, e.clientY);
            this.setState({
                postitionX: e.clientX,
                positionY: e.clientY,
            })
            
        }
    }
    kittyMeow =(e)=>{
        this.setState({
            kittyHovered: !this.state.kittyHovered,
        })
    }
    


    render(){
        return (
            <div>
                <button onClick ={this.buttonClicked}>Click me!!</button>
                {this.state.isAddedKitty ? <div onMouseOver = {this.kittyMeow} onMouseLeave={this.kittyMeow} className='kitty' style ={{left : this.state.postitionX - 50, top: this.state.positionY-50, transition: 'all .8s'}}>{this.state.kittyHovered && <span>Meow</span>}</div> : <span>none</span>}
                
            </div>
           
        )
    }
}

export default Citty;