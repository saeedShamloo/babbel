import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "../Button";

describe("<Button />", () => {
  it("Should use poper 'type' attribute on button element", () => {
    render(<Button />);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it("Should use 'tabindex' attribute on button element", () => {
    render(<Button />);
    expect(screen.getByRole("button")).toHaveAttribute("tabindex", "0");
  });

  it("Should support 'children' prop", () => {
    const text = "Click me";
    render(<Button>{text}</Button>);
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it("Should support 'disabled' prop", () => {
    render(<Button disabled>disabled bt</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("Shoud support 'onClick' prop", async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("Should support 'fullWidth' prop", () => {
    render(<Button fullWidth>Click me</Button>);
    expect(screen.getByRole("button")).toHaveClass("full-width");
  });

  it("Should render primary button when 'variant' has value primary", () => {
    render(<Button varinat="primary">Click me</Button>);
    expect(screen.getByRole("button")).toHaveClass("btn-primary");
  });

  it("Should render primary button when 'variant' has value 'success'", () => {
    render(<Button varinat="success">Click me</Button>);
    expect(screen.getByRole("button")).toHaveClass("btn-success");
  });

  it("Should render primary button when 'variant' has not value", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toHaveClass("btn-primary");
  });
});
