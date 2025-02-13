import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
  it("renders the layout and music library content", async () => {
    render(<App />);

    // Wait for the lazy-loaded "Music Library" text to appear
    await waitFor(() => {
      expect(screen.getByText("Music Library")).toBeInTheDocument();
    });
  });
});
