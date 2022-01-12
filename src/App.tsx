import React from 'react';
import './App.scss';

interface GameProps {
  value: number | string;
}

interface GameStates {
  value: string | null;
}

class Square extends React.Component<GameProps, GameStates> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: null
    };
    this.setValue = this.setValue.bind(this);
  }

  setValue() {
    this.setState({
      value: 'X'
    });
  }

  render() {
    return (
      <button className='square' onClick={this.setValue}>
        {this.state.value}
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(i: number) {
    return <Square value={i} />;
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
