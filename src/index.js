import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import leafeon from './images/leafeon.png';
import torracat from './images/torracat.png';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

    function Square(props) {
        return (
            <button
                className="square"
                onClick={props.onClick}
            >
                {props.value && <img className="image" src={props.value}/>}
            </button>
        );
    }
  
  class Board extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            squares:Array(9).fill(null),
            leafIsNext: true
        };
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) ||squares[i]){
            return;
        }
        squares[i] = this.state.leafIsNext ? leafeon : torracat;
        this.setState({
            squares: squares,
            leafIsNext: !this.state.leafIsNext,
            });

    }
    renderSquare(i) {
      return (
            <Square
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }
  
    render() {
      const winner = calculateWinner(this.state.squares);
      let imgSrc;
      if (winner) {
          imgSrc = winner;
      } else {
          imgSrc = (this.state.leafIsNext ? leafeon : torracat);
      }
      return (
        <div>
          <div className="status">{winner ? 'Winner:': 'Next player:'} <img className='image' src={imgSrc}/></div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  
  