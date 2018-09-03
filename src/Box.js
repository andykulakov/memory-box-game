import React, {Component} from 'react';
import './Box.css';

//Grey div that hides the colorful div
const BoxFill = props => {
  return (<div className="fill" ></div>);
}

class Box extends Component {
  render() {
    const {handleClick} = this.props;
    const {color} = this.props;
    const style = {
      backgroundColor: color
    }
    
    return (
      <div className="box" style={style} onClick={handleClick}><BoxFill /></div>
    )
  }
}

export default Box;