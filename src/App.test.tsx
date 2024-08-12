import { render, screen } from "@testing-library/react";
import { App } from "./App";

describe("App", () => {
  test("renders TodoViews component", () => {
    render(<App />);
    expect(screen.getByText("todos")).toBeInTheDocument();
  });
});
