type CallbackFunction = () => void;
type CallbackFunctionVariadic = (i: number) => void;

interface GameStates {
  history: {
    squares: (null | 'X' | 'O')[];
    hoverArr: boolean[];
    prevMove: number[];
  }[];
  selected: boolean[];
  winner: null | 'X' | 'O';
  stepNumber: number;
  xIsNext: boolean;
}

interface BoardProps {
  squares: (null | 'X' | 'O')[];
  onClick: CallbackFunctionVariadic;
  onWinner: boolean[];
  onHover: boolean[];
}

interface SquareProps {
  value: null | 'X' | 'O';
  onClick: CallbackFunction;
  onWinner: boolean;
  onHover: boolean;
}

export type { GameStates, BoardProps, SquareProps };
