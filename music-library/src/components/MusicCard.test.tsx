import { render, screen, fireEvent } from "@testing-library/react";
import { MusicCard } from "../components/MusicCard";

describe("MusicCard Component", () => {
  const mockProps = {
    id: 1,
    title: "Test Song",
    artist: "Test Artist",
    album: "Test Album",
    coverUrl: "https://example.com/cover.jpg",
    onRemove: jest.fn(),
  };

  it("renders music card with correct content", () => {
    render(<MusicCard {...mockProps} />);

    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.artist)).toBeInTheDocument();
    expect(
      screen.getByAltText(`${mockProps.title} by ${mockProps.artist}`),
    ).toBeInTheDocument();
  });

  it("calls onPlay when play button is clicked", () => {
    render(<MusicCard {...mockProps} />);

    fireEvent.click(screen.getByRole("button"));
    expect(mockProps.onRemove).toHaveBeenCalled();
  });
});
