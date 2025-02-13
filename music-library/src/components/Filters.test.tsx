import { render, screen, fireEvent } from "@testing-library/react";
import { Filters } from "../components/Filters";

describe("Filters Component", () => {
  const mockProps = {
    sortKey: "title" as const,
    onSortChange: jest.fn(),
    filterKey: "title" as const,
    filterValue: "",
    onFilterValueChange: jest.fn(),
  };

  it("renders sort and filter controls", () => {
    render(<Filters {...mockProps} />);

    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });

  it("calls onSortChange when sort option changes", () => {
    const mockOnSortChange = jest.fn();
    render(<Filters {...mockProps} onSortChange={mockOnSortChange} />);
    const selectElement = screen.getByTestId("sortby");
    fireEvent.change(selectElement, {
      target: { value: "artist" },
    });

    expect(mockOnSortChange).toHaveBeenCalledWith("artist");
  });

  it("calls onFilterValueChange when filter input changes", () => {
    render(<Filters {...mockProps} />);

    fireEvent.change(screen.getByPlaceholderText("Search..."), {
      target: { value: "test" },
    });

    expect(mockProps.onFilterValueChange).toHaveBeenCalledWith("test");
  });
});
