import { Game } from "ts-turnbased";
import { NormalFormGame, matchingPenniesPayoffTensor } from "../index";

import { assert } from "chai";

describe("Matching Pennies", function() {
  it("should report the winner(s) correctly for 1 round games", function() {
    let game: Game;
    let winners: Set<number>;

    game = new NormalFormGame({
      payoffTensor: matchingPenniesPayoffTensor(),
      numRounds: 1
    });
    game.start();
    game.playMove(0, 0);
    game.playMove(0, 1);
    winners = game.getWinners();
    assert.equal(1, winners.size);
    assert.isTrue(winners.has(0));

    game = new NormalFormGame({
      payoffTensor: matchingPenniesPayoffTensor(),
      numRounds: 1
    });
    game.start();
    game.playMove(0, 0);
    game.playMove(1, 1);
    winners = game.getWinners();
    assert.equal(1, winners.size);
    assert.isTrue(winners.has(1));

    game = new NormalFormGame({
      payoffTensor: matchingPenniesPayoffTensor(),
      numRounds: 1
    });
    game.start();
    game.playMove(1, 0);
    game.playMove(0, 1);
    winners = game.getWinners();
    assert.equal(1, winners.size);
    assert.isTrue(winners.has(1));

    game = new NormalFormGame({
      payoffTensor: matchingPenniesPayoffTensor(),
      numRounds: 1
    });
    game.start();
    game.playMove(1, 0);
    game.playMove(1, 1);
    winners = game.getWinners();
    assert.equal(1, winners.size);
    assert.isTrue(winners.has(0));
  });

  it("should be able to play a simple game", function() {
    let game: Game;
    let winners: Set<number>;

    game = new NormalFormGame({
      payoffTensor: matchingPenniesPayoffTensor(),
      numRounds: 5
    });
    game.start();

    // p1
    game.playMove(0, 0);
    game.playMove(0, 1);

    // p1
    game.playMove(1, 0);
    game.playMove(1, 1);

    // p2
    game.playMove(1, 0);
    game.playMove(0, 1);

    // p2
    game.playMove(0, 0);
    game.playMove(1, 1);

    // p1
    game.playMove(0, 0);
    game.playMove(0, 1);

    winners = game.getWinners();
    assert.equal(1, winners.size);
    assert.isTrue(winners.has(0));
  });
});
