import React, { Component } from 'react';

class Turn extends Component {
  constructor(props) {
    super(props);


  }

  render() {
    if (this.props.playerTurn) {
      return(
        <div className="turn">
          <p>Your turn</p>
        </div>
      );

    } else if (this.props.waiting) {
      return(
        <div className="turn">
          <p>Please wait while the machine is working...</p>
        </div>
      )
    } else {
      return(
        <div className="turn">
          <p>Computer's turn</p>
          <button className="ready" onClick={this.props.nextSequence}>I am ready</button>
        </div>
      )
    }
  }

}

export default Turn;