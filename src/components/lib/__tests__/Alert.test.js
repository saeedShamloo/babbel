import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Alert } from "../Alert";

describe("<Alert />", () => {
  it("Should use proper role attribute", () => {
    render(<Alert />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("Should use propper class name without variant prop", () => {
    render(<Alert />);
    expect(screen.getByRole("alert")).toHaveClass("alert");
  });

  it("Should use proper class name with 'success' variant", () => {
    render(<Alert variant="success" />);
    expect(screen.getByRole("alert")).toHaveClass("alert-success");
  });

  it("Should support children prop", () => {
    const text = "Hello";
    render(
      <Alert>
        <h1>{text}</h1>
      </Alert>
    );

    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it("Should support action prop", () => {
    render(<Alert action={<button>click me</button>} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
