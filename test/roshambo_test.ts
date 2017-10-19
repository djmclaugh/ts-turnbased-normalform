import { Game } from "ts-turnbased";
import { NormalFormGame, roshamboPayoffTensor } from "../index";

import { assert } from "chai";

describe("Roshambo", function() {
  it("should report the winner(s) correctly for 1 round games", function() {
    let game: Game;
    let winners: Set<number>;

    game = new NormalFormGame({
      payoffTensor: roshamboPayoffTensor(),
      numRounds: 1
    });
    game.start();
    game.playMove(0, 0);
    game.playMove(0, 1);
    winners = game.getWinners();
    assert.equal(2, winners.size);

    game = new NormalFormGame({
      payoffTensor: roshamboPayoffTensor(),
      numRounds: 1
    });
    game.start();
    game.playMove(0, 0);
    game.playMove(1, 1);
    winners = game.getWinners();
    assert.equal(1, winners.size);
    assert.isTrue(winners.has(1));

    game = new NormalFormGame({
      payoffTensor: roshamboPayoffTensor(),
      numRounds: 1
    });
    game.start();
    game.playMove(0, 0);
    game.playMove(2, 1);
    winners = game.getWinners();
    assert.equal(1, winners.size);
    assert.isTrue(winners.has(0));

    game = new NormalFormGame({
      payoffTensor: roshamboPayoffTensor(),
      numRounds: 1
    });
    game.start();
    game.playMove(1, 0);
    game.playMove(0, 1);
    winners = game.getWinners();
    assert.equal(1, winners.size);
    assert.isTrue(winners.has(0));

    game = new NormalFormGame({
      payoffTensor: roshamboPayoffTensor(),
      numRounds: 1
    });
    game.start();
    game.playMove(1, 0);
    game.playMove(1, 1);
    winners = game.getWinners();
    assert.equal(2, winners.size);

    game = new NormalFormGame({
      payoffTensor: roshamboPayoffTensor(),
      numRounds: 1
    });
    game.start();
    game.playMove(1, 0);
    game.playMove(2, 1);
    winners = game.getWinners();
    assert.equal(1, winners.size);
    assert.isTrue(winners.has(1));

    game = new NormalFormGame({
      payoffTensor: roshamboPayoffTensor(),
      numRounds: 1
    });
    game.start();
    game.playMove(2, 0);
    game.playMove(0, 1);
    winners = game.getWinners();
    assert.equal(1, winners.size);
    assert.isTrue(winners.has(1));

    game = new NormalFormGame({
      payoffTensor: roshamboPayoffTensor(),
      numRounds: 1
    });
    game.start();
    game.playMove(2, 0);
    game.playMove(1, 1);
    winners = game.getWinners();
    assert.equal(1, winners.size);
    assert.isTrue(winners.has(0));

    game = new NormalFormGame({
      payoffTensor: roshamboPayoffTensor(),
      numRounds: 1
    });
    game.start();
    game.playMove(2, 0);
    game.playMove(2, 1);
    winners = game.getWinners();
    assert.equal(2, winners.size);
  });

  it("should be able to play a simple game", function() {
    let game: Game;
    let winners: Set<number>;

    game = new NormalFormGame({
      payoffTensor: roshamboPayoffTensor(),
      numRounds: 5
    });
    game.start();

    // draw
    game.playMove(0, 0);
    game.playMove(0, 1);

    // p1
    game.playMove(1, 0);
    game.playMove(0, 1);

    // p2
    game.playMove(2, 0);
    game.playMove(0, 1);

    // p2
    game.playMove(1, 0);
    game.playMove(2, 1);

    // draw
    game.playMove(1, 0);
    game.playMove(1, 1);

    winners = game.getWinners();
    assert.equal(1, winners.size);
    assert.isTrue(winners.has(1));
  });
});
