import React from 'react';
import * as AppTypes from './types';
import './App.scss';

function Square(props: AppTypes.SquareProps) {
  return (
    <button
      className='square'
      onClick={props.onClick}
      style={
        props.onHover
          ? { background: 'blue' }
          : props.onWinner
          ? { background: 'red' }
          : undefined
      }
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component<AppTypes.BoardProps> {
  renderSquare(i: number) {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        onWinner={this.props.onWinner[i]}
        onHover={this.props.onHover[i]}
      />
    );
  }

  render() {
    return (
      <>
        {[...Array(3)].map((_, i) => (
          <div className='board-row' key={i}>
            {[...Array(3)].map((_, j) => this.renderSquare(i * 3 + j))}
          </div>
        ))}
      </>
    );
  }
}

class Game extends React.Component<{}, AppTypes.GameStates> {
  constructor(props: any) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          hoverArr: Array(9).fill(false),
          prevMove: [-1, -1]
        }
      ],
      selected: Array(9).fill(false),
      winner: null,
      stepNumber: 0,
      xIsNext: true
    };
    this.resetGame = this.resetGame.bind(this);
    this.handleHover = this.handleHover.bind(this);
  }

  componentDidUpdate() {
    if (!this.state.winner) {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      this.checkGame(current.squares);
    } else if (this.state.stepNumber !== this.state.history.length - 1) {
      this.setState({
        winner: null
      });
    }
  }

  handleClick(i: number) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = [...current.squares];

    const prevMove = [Math.floor(i / 3), i % 3];

    if (this.state.winner || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState((state) => ({
      history: [...history, Object.assign({}, current, { squares, prevMove })],
      stepNumber: history.length,
      xIsNext: !state.xIsNext
    }));
  }

  handleHover([row, col]: number[]) {
    const selected = [...this.state.selected];

    const index = row * 3 + col;
    selected[index] = !selected[index];

    this.setState({
      selected
    });
  }

  handleWin(winnerBoxes: number[]) {
    const current = this.state.history[this.state.stepNumber];
    const hoverArr = [...current.hoverArr];

    winnerBoxes.forEach((i) => (hoverArr[i] = true));

    this.setState((state) => ({
      history: [
        ...state.history.slice(0, this.state.history.length - 1),
        Object.assign({}, current, { hoverArr })
      ]
    }));
  }

  checkGame(squares: AppTypes.BoardProps['squares']): void {
    const possibleMoves = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (const [firstIndex, ...rest] of possibleMoves) {
      if (
        rest.every(
          (restIndex) =>
            squares[firstIndex] && squares[firstIndex] === squares[restIndex]
        )
      ) {
        this.handleWin([firstIndex, ...rest]);
        this.setState({
          winner: squares[firstIndex]
        });
      }
    }
  }

  jumpTo(step: number) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  resetGame() {
    this.setState((state) => ({
      history: state.history.slice(0, 1),
      selected: Array(9).fill(false),
      hoverArr: Array(9).fill(false),
      winner: null,
      stepNumber: 0,
      xIsNext: true
    }));
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.state.winner;

    let status;

    winner
      ? (status = `Winner: ${winner}`)
      : (status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`);

    console.log(this.state);

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
                onWinner={current.hoverArr}
                onHover={this.state.selected}
              />
            </div>
            <div className='game-info'>
              <div className='status'>{status}</div>
              <ol>
                {history.map(({ prevMove }, move) => (
                  <li key={move}>
                    <button
                      className='btn btn-blue'
                      onClick={() => this.jumpTo(move)}
                      onMouseOver={() => this.handleHover(prevMove)}
                      onMouseOut={() => this.handleHover(prevMove)}
                    >
                      {move ? `Go to move ${prevMove}` : 'Go to gamestart'}
                    </button>
                  </li>
                ))}
              </ol>
            </div>
            <div className='button-wrapper'>
              <button className='btn btn-red' onClick={this.resetGame}>
                Reset
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default Game;
