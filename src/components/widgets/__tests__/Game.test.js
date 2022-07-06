import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Game } from "../Game";
import { generateRandomNumber } from "../../../util";

const mockGameInfo = {
  players: [
    {
      name: "Player 1",
      id: "o8fi3fk2zn",
      imageUrl: "http://localhost:8000/1.png",
    },
    {
      name: "Player 2",
      id: "bgnv8evw3t",
      imageUrl: "http://localhost:8000/2.png",
    },
  ],
  scoreToWin: 20,
  matchId: "duur43nl62",
};

jest.mock("../../../util", () => {
  return {
    generateRandomNumber: jest.fn(() => 10),
    Api: {
      get: () =>
        new Promise((resolve) => setTimeout(() => resolve(mockGameInfo), 100)),
      post: () => ({}),
    },
  };
});

describe("<Game />", () => {
  it("Should display loading before initializing the app", async () => {
    render(<Game />);
    expect(await screen.findByText(/Loading/)).toBeInTheDocument();
  });

  it("Should display game id properly", async () => {
    render(<Game />);
    expect(
      await screen.findByText(new RegExp(mockGameInfo.matchId))
    ).toBeInTheDocument();
  });

  it("Should display score to win properly", async () => {
    render(<Game />);
    expect(
      await screen.findByText(new RegExp(mockGameInfo.scoreToWin))
    ).toBeInTheDocument();
  });

  it("Should display number of players properly", async () => {
    render(<Game />);
    expect((await screen.findAllByLabelText("player")).length).toBe(
      mockGameInfo.players.length
    );
  });

  it("Should display just one active button to roll the dice", async () => {
    render(<Game />);
    expect(
      await screen.findAllByText("Roll", { selector: ":not([disabled])" })
    ).toHaveLength(1);
  });

  it("Should update user score by clicking on the roll button", async () => {
    render(<Game />);

    await userEvent.click(
      await screen.findByText("Roll", { selector: ":not([disabled])" })
    );

    expect(screen.getByText(/10/)).toBeInTheDocument();
    expect(
      (await screen.findAllByText("Roll", { selector: ":not([disabled])" }))
        .length
    ).toBe(1);

    await userEvent.click(
      await screen.findByText("Roll", { selector: ":not([disabled])" })
    );
    expect(screen.getAllByText(/10/)).toHaveLength(2);
  });

  it("Should finish the game when scroe of player meets the score to win", async () => {
    generateRandomNumber.mockImplementation(() => 20);
    render(<Game />);

    await userEvent.click(
      await screen.findByText("Roll", { selector: ":not([disabled])" })
    );

    expect(
      screen.getByRole("alert", { name: "game-result" })
    ).toBeInTheDocument();
  });

  it("Should reset the game by pressing the reset-game button", async () => {
    generateRandomNumber.mockImplementation(() => 20);
    render(<Game />);

    await userEvent.click(
      await screen.findByText("Roll", { selector: ":not([disabled])" })
    );

    await userEvent.click(screen.getByText(/Reset The Game/));

    expect(
      screen.queryByRole("alert", { name: "game-result" })
    ).not.toBeInTheDocument();
  });
});
