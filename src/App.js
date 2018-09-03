import React, { Component } from 'react';
import Navbar from './Navbar';
import Box from './Box';
import './App.css';

class App extends Component {
  
  //Array of different colors
  static defaultProps = {
    allColors: ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond",
              "Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate",
              "Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod",
              "DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange",
              "DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey",
              "DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue",
              "FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod",
              "Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki",
              "Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan",
              "LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon",
              "LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow",
              "Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid",
              "MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise",
              "MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy",
              "OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen",
              "PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue",
              "Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen",
              "SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen",
              "SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke",
              "Yellow","YellowGreen"]
  }
  
  constructor(props){
    super(props);
    const colors = Array(8).fill().map(this.getRandomColor, this);
    const sortedColors = colors.concat(colors).sort((a, b) => Math.random() - 0.5);
    this.state = {
      sortedColors, 
      clickCount: 0,
      //Array of colors which were clicked on and were defined as matching
      clickedColors: [],
      //Array of indexes of colorful divs which were clicked on and defined as matching - so we don't make them grey again during next stages of the game
      clickedIndexes: [],
      //Keeping track of index and color of the first div which was clicked
      prevIndex: '',
      prevColor: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.newGame = this.newGame.bind(this);
  }
  
  getRandomColor() {
    let randomColor = Math.floor(Math.random() * this.props.allColors.length);
    return this.props.allColors[randomColor];
  }
  
  //New game button logic
  newGame() {
    const allFills = [...document.querySelectorAll('.fill')];
    allFills.forEach(box => box.setAttribute('style', 'opacity: 1;'));
    setTimeout(() => {
      const colors = Array(8).fill().map(this.getRandomColor, this);
      const sortedColors = colors.concat(colors).sort((a, b) => Math.random() - 0.5);
      this.setState({
        sortedColors, 
        clickCount: 0,
        clickedColors: [],
        clickedIndexes: [],
        prevIndex: '',
        prevColor: ''
      });
    }, 1000)
  }
  
  //Game logic
  handleClick(e) {
    
    const clickedFill = window.getComputedStyle(e.target.parentElement).getPropertyValue('background-color');
    const {prevColor} = this.state;
    const {clickedColors} = this.state;
    const {clickedIndexes} = this.state;
    const allFills = [...document.querySelectorAll('.fill')];
    const clickedIndex = Number(allFills.indexOf(e.target));
    const {prevIndex} = this.state;
    
    //Making sure we click the grey div so the colorful ones don't disappear
    if (allFills.includes(e.target)){
      e.target.setAttribute('style', 'opacity: 0;');
    }
    
    //First click logic
    if(this.state.clickCount === 0 && clickedIndex !== -1) {
      this.setState((prevState, props) => {
      return {clickCount: prevState.clickCount + 1, prevColor: clickedFill, prevIndex: clickedIndex}
      }); 
    
    //Second click logic  
    } else if(this.state.clickCount === 1) {
        
        //if we find two matching divs
        if(clickedFill === prevColor && clickedIndex !== prevIndex && (!clickedColors.includes(clickedFill))) {
          this.setState((prevState, props) => {
            const sortedColors = prevState.sortedColors;
            //Keeping track of names and indexes of matching colors
            return {sortedColors, clickCount: 0, prevColor: '', clickedColors: [...prevState.clickedColors, prevColor], clickedIndexes: [...prevState.clickedIndexes, clickedIndex, prevState.prevIndex], prevIndex: ''}
          });
        
        //if we don't find matching divs
        } else if (clickedFill !== prevColor && clickedIndex !== -1 && (!clickedColors.includes(clickedFill))) {
          this.setState((prevState, props) => {
            const sortedColors = prevState.sortedColors;
            return {sortedColors, clickCount: 0, prevColor: ''}
          }, () => {
            
            //Hiding all the colorful divs except matching divs
            setTimeout(() => {
              allFills.filter((val,i) => {
                return (!clickedIndexes.includes(i));
              }).forEach(box => box.setAttribute('style', 'opacity: 1;'));
            }, 1000)
          });
        }
      
    }
  }
  
  render() {
    const boxes = this.state.sortedColors.map((color, i) => {
      return <Box key={i} color={color} handleClick={this.handleClick}/>
    });
    
    return (
      <div>
        <Navbar newGame={this.newGame}/>
        <div className="boxes-wrap">
          {boxes}
        </div>
      </div>
    );
  }
}

export default App;
