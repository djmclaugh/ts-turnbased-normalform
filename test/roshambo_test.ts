import { Game } from "ts-turnbased";
import { NormalFormGame, roshamboPayoffTensor } from "../index";

import { assert } from "chai";

describe("Roshambo", function() {
  it("should report the winner(s) correctly for 1 round games", function() {
    let game: NormalFormGame;
    let winners: Array<number>;

    game = new NormalFormGame({
      payoffTensor: roshamboPayoffTensor(),
      numRounds: 1
    });
    game.start();
    game.playMove(0, 0);
    game.playMove(0, 1);
    winners = game.getLatestUpdate().winners;
    assert.equal(2, winners.length);

    game = new NormalFormGame({
      payoffTensor: roshamboPayoffTensor(),
      numRounds: 1
    });
    game.start();
    game.playMove(0, 0);
    game.playMove(1, 1);
    winners = game.getLatestUpdate().winners;
    assert.equal(1, winners.length);
    assert.include(winners, 1);

    game = new NormalFormGame({
      payoffTensor: roshamboPayoffTensor(),
      numRounds: 1
    });
    game.start();
    game.playMove(0, 0);
    game.playMove(2, 1);
    winners = game.getLatestUpdate().winners;
    assert.equal(1, winners.length);
    assert.include(winners, 0);

    game = new NormalFormGame({
      payoffTensor: roshamboPayoffTensor(),
      numRounds: 1
    });
    game.start();
    game.playMove(1, 0);
    game.playMove(0, 1);
    winners = game.getLatestUpdate().winners;
    assert.equal(1, winners.length);
    assert.include(winners, 0);

    game = new NormalFormGame({
      payoffTensor: roshamboPayoffTensor(),
      numRounds: 1
    });
    game.start();
    game.playMove(1, 0);
    game.playMove(1, 1);
    winners = game.getLatestUpdate().winners;
    assert.equal(2, winners.length);

    game = new NormalFormGame({
      payoffTensor: roshamboPayoffTensor(),
      numRounds: 1
    });
    game.start();
    game.playMove(1, 0);
    game.playMove(2, 1);
    winners = game.getLatestUpdate().winners;
    assert.equal(1, winners.length);
    assert.include(winners, 1);

    game = new NormalFormGame({
      payoffTensor: roshamboPayoffTensor(),
      numRounds: 1
    });
    game.start();
    game.playMove(2, 0);
    game.playMove(0, 1);
    winners = game.getLatestUpdate().winners;
    assert.equal(1, winners.length);
    assert.include(winners, 1);

    game = new NormalFormGame({
      payoffTensor: roshamboPayoffTensor(),
      numRounds: 1
    });
    game.start();
    game.playMove(2, 0);
    game.playMove(1, 1);
    winners = game.getLatestUpdate().winners;
    assert.equal(1, winners.length);
    assert.include(winners, 0);

    game = new NormalFormGame({
      payoffTensor: roshamboPayoffTensor(),
      numRounds: 1
    });
    game.start();
    game.playMove(2, 0);
    game.playMove(2, 1);
    winners = game.getLatestUpdate().winners;
    assert.equal(2, winners.length);
  });

  it("should be able to play a simple game", function() {
    let game: NormalFormGame;
    let winners: Array<number>;

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

    winners = game.getLatestUpdate().winners;
    assert.equal(1, winners.length);
    assert.include(winners, 1);
  });
});
