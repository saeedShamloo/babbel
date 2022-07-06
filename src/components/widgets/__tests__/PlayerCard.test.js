import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PlayerCard } from "../PlayerCard";

describe("<PlayerCard />", () => {
  const fakePlayer = {
    imageUrl: "url",
    name: "player 1",
  };

  it("Should use 'aria-label' prop to improve accessibilitt", () => {
    render(<PlayerCard player={fakePlayer} />);
    expect(screen.getByLabelText("player")).toBeInTheDocument();
  });

  it("Should support 'player' prop ", () => {
    const { rerender } = render(<PlayerCard />);
    expect(screen.getByLabelText("player")).toBeInTheDocument();

    rerender(<PlayerCard player={fakePlayer} />);
    expect(screen.getByText(fakePlayer.name)).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("alt", fakePlayer.name);
    expect(screen.getByRole("img")).toHaveAttribute("src", fakePlayer.imageUrl);
  });

  it("Shoould support 'score' prop", () => {
    const { rerender } = render(<PlayerCard player={fakePlayer} />);
    expect(screen.getByText(/---/)).toBeInTheDocument();

    rerender(<PlayerCard player={fakePlayer} score={10} />);
    expect(screen.getByText(/10/)).toBeInTheDocument();
  });

  it("Should support 'onRoll' prop", async () => {
    const handleRoll = jest.fn();

    render(<PlayerCard player={fakePlayer} onRoll={handleRoll} />);
    await userEvent.click(screen.getByRole("button"));
    expect(handleRoll).toHaveBeenCalledTimes(1);
  });

  it("Should support 'disabledRoll' prop", () => {
    render(<PlayerCard player={fakePlayer} disabledRoll />);

    expect(screen.getByRole("button")).toBeDisabled();
  });
});
