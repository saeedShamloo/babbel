import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Card } from "../Card";

describe("<Card />", () => {
  it("Should support 'title' prop", () => {
    const title = "title";
    render(<Card title={title} />);
    expect(screen.getByText(/title/)).toBeInTheDocument();
  });

  it("Should support 'avatar' prop", () => {
    const avatarUrl = "someUrl";
    render(<Card avatar={avatarUrl} />);

    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", avatarUrl);
    expect(screen.getByRole("img")).not.toHaveAttribute("alt");
    expect(screen.getByRole("img")).not.toHaveAttribute("aria-label");
  });

  it("Should use 'title' on avatar to improve accessibility ", () => {
    const avatarUrl = "someUrl";
    const title = "title";
    render(<Card avatar={avatarUrl} title={title} />);

    expect(screen.getByAltText(title)).toBeInTheDocument();
    expect(screen.getByLabelText(title)).toBeInTheDocument();
  });

  it("Should not render any image when 'avatar' prop has no value", () => {
    render(<Card />);
    expect(screen.queryByRole("img")).toBeNull();
  });

  it("Should support 'children' prop", () => {
    const content = "Hello Card";
    render(<Card>{content}</Card>);
    expect(screen.getByText(content)).toBeInTheDocument();
  });

  it("Should support 'action' prop", () => {
    render(<Card action={<button>action</button>} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("Should support rest props", () => {
    render(<Card aria-label="card" />);
    expect(screen.getByLabelText("card")).toBeInTheDocument();
  });
});
