import { render, screen } from "@testing-library/react";
import App from "./App";

// Mock the remote module
// jest.mock('musicLibrary/App', () => ({
//   __esModule: true,
//   default: () => <div>Music Library Content</div>,
// }));

describe("App Component", () => {
  it("renders the layout and music library content", async () => {
    render(<App />);

    expect(screen.getByText("Music Library")).toBeInTheDocument();
    // Wait for the lazy-loaded component
    const content = await screen.findByText("Music Library");
    expect(content).toBeInTheDocument();
  });
});
