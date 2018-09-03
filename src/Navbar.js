import React, {Component} from 'react';
import './Navbar.css';

class Navbar extends Component {
  static defaultProps = {
    newGame(){}
  }
  render() {
    return(
      <header>
        <h2>Memory Game</h2>
        <nav>
          <li><a href='#' onClick={this.props.newGame}>New Game</a></li>
        </nav>
      </header>
    )
  }
}

export default Navbar;