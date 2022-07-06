import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Typography } from "../Typography";

describe("<Typography/>", () => {
  const text = "text";

  it("Should suport 'variant' with 'title' value", () => {
    render(<Typography variant="title">{text}</Typography>);

    expect(screen.getByText(text)).toBeInTheDocument();
    expect(screen.getByText(text)).toHaveClass("title");
  });

  it("Should suport 'variant' with 'subtitle' value", () => {
    render(<Typography variant="subtitle">{text}</Typography>);

    expect(screen.getByText(text)).toBeInTheDocument();
    expect(screen.getByText(text)).toHaveClass("subtitle");
  });

  it("Should suport 'variant' with 'paragraph' value", () => {
    render(<Typography variant="paragraph">{text}</Typography>);

    expect(screen.getByText(text)).toBeInTheDocument();
    expect(screen.getByText(text)).toHaveClass("paragraph");
  });

  it("Should suport 'variant' with 'label' value", () => {
    render(<Typography variant="label">{text}</Typography>);

    expect(screen.getByText(text)).toBeInTheDocument();
    expect(screen.getByText(text)).toHaveClass("label");
  });

  it("Should render content when 'variant' has no value", () => {
    const { rerender } = render(<Typography>{text}</Typography>);
    expect(screen.getByText(text)).toBeInTheDocument();

    rerender(<Typography>{text}</Typography>);
    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
