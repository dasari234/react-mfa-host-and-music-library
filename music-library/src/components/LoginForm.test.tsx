import { render, screen, fireEvent } from "@testing-library/react";
import { LoginForm } from "../components/LoginForm";

describe("LoginForm Component", () => {
  const mockOnLogin = jest.fn();

  beforeEach(() => {
    mockOnLogin.mockClear();
  });

  it("renders login form", () => {
    render(<LoginForm onLogin={mockOnLogin} />);

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in/i }),
    ).toBeInTheDocument();
  });

  it("calls onLogin with form data when submitted", () => {
    render(<LoginForm onLogin={mockOnLogin} />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /sign in/i }));

    expect(mockOnLogin).toHaveBeenCalledWith("testuser", "password123");
  });

  it("displays error message when provided", () => {
    const errorMessage = "Invalid credentials";
    render(<LoginForm onLogin={mockOnLogin} error={errorMessage} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
