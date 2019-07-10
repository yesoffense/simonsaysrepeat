import React, { Component } from 'react';
import Turn from './Turn';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      combination: [],
      savedClicks: [],
      playerTurn: false,
      red: false,
      blue: false,
      yellow: false,
      green: false,
      waiting: false
    };

    this.buttonClicked = this.buttonClicked.bind(this);
    this.nextSequence = this.nextSequence.bind(this);

  }

  //function generating a random combination of array w,a,s,d with length of 15

  generateCombinations() {
    let keys = ["red", "blue", "yellow", "green"];
    
    for (var i = 0; i < 15; i++) {
      this.setState(prevState => ({
        combination: [...prevState.combination, keys[Math.floor(Math.random()*keys.length)]]
      }));
    }
    console.log(this.state.combination);
  }

  componentDidMount() {
    this.generateCombinations();
  }

  async buttonClicked(key) {
    if (this.state.playerTurn) {
      await this.setState(prevState => ({
        savedClicks: [...prevState.savedClicks, key]
      }));

      let currentCombination = this.state.combination.slice(0, this.state.progress);
      let currentInput = this.state.savedClicks;


      if (currentInput.length === this.state.progress) {
        for(let i = currentInput.length; i--;) {
          if(currentInput[i] !== currentCombination[i]) {
            alert("Sorry, that's wrong!");
            this.props.resetGame();
            return;
          }
        }

        if (currentCombination.length === this.state.combination.length) {
          alert("YOU WON EVERYTHING OMG");
          this.props.resetGame();
        }
        this.setState({ playerTurn: false, savedClicks: [] });
      }
    }

  }

  async nextSequence() {
    await this.setState(prevState => ({
      progress: prevState.progress + 1,
      waiting: true
    }));

    let sequence = this.state.combination.slice(0, this.state.progress);

    sequence.forEach((s, index) => {
      setTimeout(() =>{
        this.setState({[s]: true}); //dynamic state

        setTimeout(() => {
          this.resetColors();
        }, 500);

        if (index + 1 === sequence.length) {
          this.setState({ playerTurn: true, waiting: false });
        }
      }, 1000 * (index + 1));
    })
  }

  resetColors() {
    this.setState({
      red: false,
      blue: false,
      yellow: false,
      green: false
    })
  }

  render() {
    return (
      <div className="Game">
        <header className="App-header">
        <h1>simon says 🔁</h1>
        </header>
        <div className="GameButtonsBox">
          <button className={(this.state.red ? ' red' : 'r-button')} onClick={(e) => this.buttonClicked('red')}>red</button> {/* https://reactjs.org/docs/handling-events.html#passing-arguments-to-event-handlers */}
          <button className={(this.state.blue ? ' blue' : 'b-button')} onClick={(e) => this.buttonClicked('blue')}>blue</button>
          <button className={(this.state.yellow ? ' yellow' : 'y-button')} onClick={(e) => this.buttonClicked('yellow')}>yellow</button>
          <button className={(this.state.green ? ' green' : 'g-button')} onClick={(e) => this.buttonClicked('green')}>green</button>
        </div>
        <div className="GreenBG"></div>

        <Turn playerTurn={this.state.playerTurn} nextSequence={this.nextSequence} waiting={this.state.waiting}/>

      </div>
      
    );
  }

}


export default Game;