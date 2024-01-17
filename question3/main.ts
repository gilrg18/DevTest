import { points, cell } from "./types";

export class Connect4 {
  private grid: cell[][];
  private player:number;
  private winner:number;

  constructor() {
    // Good luck
    this.grid = [];
    for (let i = 0; i < 6; i++) {
      //@ts-ignore
      this.grid.push(Array<cell>(7).fill({value:0, visited:false}));
    }
    this.player = 1;
    this.winner = 0;
    
    // console.log(this.grid);  
    // console.log(this.grid[0][0].value)
  }

  play(col: number): string {
    // Good luck
    if(this.winner){
      return "Game has finished!";
    }
    let row;
    if (this.isValidCol(col) && !this.isFull(col)) {   
      row = this.findRowPositon(col);
      this.grid[row][col] = {value:this.player, visited:false};
      //console.log('row: ', row);
    } else {
      //console.log(this.grid);
      return "Column full!";
    }

    const points: points = {
      diagonalAbajoHaciaArriba: 0,
      diagonalArribaHaciaAbajo: 0,
      horizontal: 0,
      vertical: 0,
    };

    //Checar si hay ganador
    this.getWinnerVertical(this.player, points, row, col);
    this.getWinnerHorizontal(this.player, points,row, col)
    //console.log("Player: ", this.player," Points: ", points);
    if (points.vertical === 4 || points.horizontal === 4) {
      //console.log('WINNER GRID: ', this.grid);
      this.winner = this.player;
      return `Player ${this.player} wins!`;
    }

    if (this.player === 1) {
      this.player = 2;
      return "Player 1 has a turn";
    } else {
      this.player = 1;
      return "Player 2 has a turn";
    }
  }

  isValidCol(col: number): boolean {
    if (col < 0 || col > 6) {
      return false;
    }
    return true;
  }

  isValidRow(row: number): boolean {
    if (row < 0 || row > 5) {
      return false;
    }
    return true;
  }

  isFull(col: number): boolean {
    if (this.grid[0][col].value !== 0) {
      return true;
    }
    return false;
  }

  findRowPositon(col: number): number {
    let row = 5;
    // console.log('ROW VALUE : ',this.grid[row][col].value)
    // console.log('COLUMN INDEX: ', col)
    while (this.grid[row][col].value !== 0) {
      row--;
    }
    return row;
  }

  getWinnerVertical(player: number, points: points, row: number, col: number): void {
    // if (points.vertical === 4) {
    //   return;
    // }
    if (this.isValidCol(col) && this.isValidRow(row)) {
      if (this.grid[row][col].value === player) {
        points.vertical++;
        this.getWinnerVertical(player, points, row + 1, col); //Vertical Abajo
      }
    }
  }

  getWinnerHorizontal(player: number, points: points, row: number, col: number): void {
    // if (points.horizontal === 4) {
    //     return;  
    // }

    if (this.isValidCol(col) && this.isValidRow(row)) {
        if (this.grid[row][col].value === player && !this.grid[row][col].visited) {
            points.horizontal++;
            this.grid[row][col]= {value: player, visited:true};
            this.getWinnerHorizontal(player, points, row, col - 1); // Horizontal izquierda
            this.getWinnerHorizontal(player, points, row, col + 1); // Horizontal derecha
            this.grid[row][col].visited = false;
            //console.log('horizontal grid: ',this.grid, ' points: ',points.horizontal)
        }
    }
}
}
