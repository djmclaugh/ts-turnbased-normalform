import { Game, IllegalMoveError, InvalidMoveError, InvalidOptionsError, PublicUpdate } from "ts-turnbased";

// A payoff tensor is a multidimensional array that contains the payouts for each player for every
// situation.
// If P is a payout tensor, then P[o_1][o_2]...[o_n][k] is the payout player k should receive if
// player i chose the option o_i.
// Use a mix of "type" and "interface" to defince a recursive type.
// https://github.com/Microsoft/TypeScript/issues/3496#issuecomment-128553540
export type PayoffTensor = Array<number> | PayoffTensorArray;
export interface PayoffTensorArray extends Array<PayoffTensor> {};
function isPayoffTensorArray(tensor: PayoffTensor): tensor is PayoffTensorArray {
    return typeof tensor[0] != "number";
}

export interface NormalFormOptions {
  payoffTensor: PayoffTensor,
  numRounds: number
}

function getNumberOfPlayers(payoffTensor: PayoffTensor): number {
  let currentLevel: PayoffTensor = payoffTensor;
  let depth: number = 0;
  while (isPayoffTensorArray(currentLevel)) {
    currentLevel = currentLevel[0];
    depth += 1;
  }
  return depth;
}

export function sanitizeOptions(options: any): NormalFormOptions {
  if (!Array.isArray(options.payoffTensor)) {
    throw new InvalidOptionsError(options, "Payoffs must be defined as a multidimensional array");
  }
  if (typeof options.numRounds != "number" || options.numRounds < 0) {
    throw new InvalidOptionsError(options, "numRounds must be a non-negative number");
  }
  return {
    payoffTensor: options.payoffTensor,
    numRounds: Math.floor(options.numRounds)
  };
}

// https://en.wikipedia.org/wiki/Normal-form_game
// Technically speaking, this is the iterative verison of normal form games.
export class NormalFormGame extends Game<NormalFormOptions, number, Array<number>, null> {
  private scores: Array<number>
  private currentTurn: number;

  constructor(options: NormalFormOptions) {
    super(options);
  }

  protected numberOfPlayersForOptions(options: NormalFormOptions): number {
    return getNumberOfPlayers(options.payoffTensor);
  }

  protected initialize(seed: string): PublicUpdate<Array<number>> {
    this.scores = [];
    let numPlayers: number = getNumberOfPlayers(this.options.payoffTensor);
    let toPlay: Array<number> = [];
    for (let i = 0; i < numPlayers; ++i) {
      this.scores.push(0);
      toPlay.push(i);
    }
    this.currentTurn = 0;
    return {
      publicInfo: null,
      toPlay: toPlay
    };
  }

  protected sanitizeOptions(options: any): NormalFormOptions {
    return sanitizeOptions(options);
  }

  protected sanitizeMove(move: any): number {
    if (typeof move != "number") {
      throw new InvalidMoveError(move, "Move must be a number");
    }
    if (move < 0) {
      throw new InvalidMoveError(move, "Move must be non-negative");
    }
    return Math.floor(move);
  }

  protected assertMoveIsLegal(move: number, player: number): void {
    let currentTensor: PayoffTensor = this.options.payoffTensor;
    for (let i = 0; i < player; ++i) {
      // We know that the elements of currentTensor are of type PayoffTensor and not number since
      // we don't go too deep in the tensor.
      currentTensor = <PayoffTensor>currentTensor[0];
    }
    if (move >= currentTensor.length) {
      throw new IllegalMoveError(
          move,
          player,
          "There are only " + currentTensor.length + " options to choose from");
    }
  }

  protected processTurn(moves: Map<number, number>): PublicUpdate<Array<number>> {
    let currentTensor: Array<any> = this.options.payoffTensor;
    let movesArray: Array<number> = [];
    for (let i = 0; i < this.scores.length; ++i) {
      currentTensor = currentTensor[moves.get(i)];
      movesArray.push(moves.get(i));
    }
    for (let i = 0; i < this.scores.length; ++i) {
      this.scores[i] += currentTensor[i];
    }
    this.currentTurn += 1;
    return {
      publicInfo: movesArray,
      toPlay: this.currentTurn == this.options.numRounds ? [] : this.getLatestUpdate().toPlay.concat()
    };
  }

  getWinners(): Array<number> {
    if (this.currentTurn == this.options.numRounds) {
      let winners: Array<number> = [];
      let bestScore: number = this.scores[0];
      for (let i = 0; i < this.scores.length; ++i) {
        if (this.scores[i] > bestScore) {
          bestScore = this.scores[i];
          winners = [];
        }
        if (this.scores[i] == bestScore) {
          winners.push(i);
        }
      }
      return winners;
    }
    return [];
  }
}

// Payoff matrix for creating a rock-paper-scissors game:
// https://en.wikipedia.org/wiki/Rock%E2%80%93paper%E2%80%93scissors
export function roshamboPayoffTensor(): PayoffTensor {
  return [
  //p2:rock  paper   scissors
    [[0, 0], [0, 1], [1, 0]],  // p1 choses rock
    [[1, 0], [0, 0], [0, 1]],  // p1 choses paper
    [[0, 1], [1, 0], [0, 0]]   // p1 choses scissors
  ];
};

// Payoff matrix for creating a matching pennies game:
// https://en.wikipedia.org/wiki/Rock%E2%80%93paper%E2%80%93scissors
export function matchingPenniesPayoffTensor(): PayoffTensor {
  return [
    [[1, 0], [0, 1]],
    [[0, 1], [1, 0]],
  ];
};
