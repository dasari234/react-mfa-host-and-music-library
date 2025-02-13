import { render, screen, fireEvent } from "@testing-library/react";
import { AddSongForm } from "../components/AddSongForm";

describe("AddSongForm Component", () => {
  const mockOnAdd = jest.fn();

  beforeEach(() => {
    mockOnAdd.mockClear();
  });

  it("renders add song form", () => {
    render(<AddSongForm onAdd={mockOnAdd} />);

    expect(screen.getByPlaceholderText(/Title/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Artist/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Album/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Cover URL/i)).toBeInTheDocument();
  });

  it("calls onAdd with form data when submitted", () => {
    render(<AddSongForm onAdd={mockOnAdd} />);

    const newSong = {
      title: "Test Song",
      artist: "Test Artist",
      album: "Test Album",
      coverUrl: "https://example.com/cover.jpg",
    };

    fireEvent.change(screen.getByPlaceholderText(/Title/i), {
      target: { value: newSong.title },
    });
    fireEvent.change(screen.getByPlaceholderText(/Artist/i), {
      target: { value: newSong.artist },
    });
    fireEvent.change(screen.getByPlaceholderText(/Album/i), {
      target: { value: newSong.album },
    });
    fireEvent.change(screen.getByPlaceholderText(/Cover URL/i), {
      target: { value: newSong.coverUrl },
    });

    fireEvent.submit(screen.getByRole("button", { name: /Add Song/i }));

    expect(mockOnAdd).toHaveBeenCalledWith(newSong);
  });

  it("clears form after submission", () => {
    render(<AddSongForm onAdd={mockOnAdd} />);

    const titleInput = screen.getByPlaceholderText(/Title/i);
    fireEvent.change(titleInput, { target: { value: "Test Song" } });

    fireEvent.submit(screen.getByRole("button", { name: /Add Song/i }));

    expect(titleInput).toHaveValue("");
  });
});
