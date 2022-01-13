import React, { Fragment } from 'react';
import './App.scss';

type CallbackFunction = () => void;

interface SquareProps {
  value: null | 'X' | 'O';
  onClick: CallbackFunction;
}

function Square(props: SquareProps) {
  return (
    <button className='square' onClick={props.onClick}>
      {props.value}
    </button>
  );
}

type CallbackFunctionVariadic = (i: number) => void;

interface BoardProps {
  squares: (null | 'X' | 'O')[];
  onClick: CallbackFunctionVariadic;
}

class Board extends React.Component<BoardProps> {
  renderSquare(i: number) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <Fragment>
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
      </Fragment>
    );
  }
}

interface GameStates {
  history: { squares: (null | 'X' | 'O')[] }[];
  stepNumber: number;
  xIsNext: boolean;
}

class Game extends React.Component<{}, GameStates> {
  constructor(props: any) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i: number) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = [...current.squares];

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState((state) => ({
      history: [...history, { squares }],
      stepNumber: history.length,
      xIsNext: !state.xIsNext
    }));
  }

  jumpTo(step: number) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((_, move) => {
      const desc = move ? `Go to move ${move}` : 'Go to gamestart';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;

    winner
      ? (status = `Winner: ${winner}`)
      : (status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`);

    return (
      <div className='App'>
        <header>
          <h1 className='title'>Tic Tac Toe</h1>
        </header>
        <main>
          <div className='game'>
            <div className='game-board'>
              <Board
                squares={current.squares}
                onClick={(i) => this.handleClick(i)}
              />
            </div>
            <div className='game-info'>
              <div className='status'>{status}</div>
              <ol>{moves}</ol>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

function calculateWinner(
  squares: BoardProps['squares']
): SquareProps['value'] | null {
  const lines = [
    // row
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // column
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonal
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (const [firstIndex, ...rest] of lines) {
    if (
      rest.every(
        (restIndex) =>
          squares[firstIndex] && squares[firstIndex] === squares[restIndex]
      )
    ) {
      return squares[firstIndex];
    }
  }

  return null;
}

export default Game;
