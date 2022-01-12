import React from 'react';
import './App.scss';

type CallbackFunction = () => void;

interface SquareProps {
  value: null | 'X' | 'O';
  onClick: CallbackFunction;
}

class Square extends React.Component<SquareProps> {
  render() {
    return (
      <button className='square' onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

interface BoardStates {
  squares: (null | 'X' | 'O')[];
}

class Board extends React.Component<{}, BoardStates> {
  constructor(props: any) {
    super(props);
    this.state = {
      squares: Array(9).fill(null)
    };
  }

  handleClick(i: number) {
    const squares = [...this.state.squares];
    squares[i] = 'X';
    this.setState({
      squares
    });
  }

  renderSquare(i: number) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <h2 className='status'>{status}</h2>
        <div className='board-row'>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className='board-row'>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className='board-row'>
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
      <div className='App'>
        <header>
          <h1 className='title'>Tic Tac Toe</h1>
        </header>
        <main>
          <div className='game'>
            <div className='game-board'>
              <Board />
            </div>
            <div className='game-info'>
              <div>{/* status */}</div>
              <ol>{/* TODO */}</ol>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default Game;
