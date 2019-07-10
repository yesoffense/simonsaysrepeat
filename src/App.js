import React, { Component } from 'react';
import './App.css';
import Game from './components/Game';


class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      startOnClick: false,      
    };
  
  }
  
  intialiseGame = () => {
    this.setState({startOnClick: true});
  }

  resetGame = () => {
    this.setState({startOnClick: false});
  }
  render() {

    if (this.state.startOnClick === true) {
      return (
        <div className='App'>
        <Game resetGame={this.resetGame} />
        </div>
      )
    } else {

      return (
        <div className="App">
          <header className="App-header">
            <h1> simon says 🔁</h1>
          </header>
          <body>
          <div className="Start-Box">
          <p className="Start-Paragraph">
          The computer presents a color pattern.
          Repeat the pattern 15 times to win the game. Good luck.

          </p>
          <button className="Start-Button" onClick={this.intialiseGame}>
          Start
          </button>
          </div>

          </body>
        </div>
      );
    }
  }
}
export default App;
