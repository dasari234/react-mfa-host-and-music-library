import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { AuthService } from "./services/auth";

// Mock the AuthService
jest.mock("./services/auth", () => ({
  AuthService: {
    login: jest.fn(),
    verifyToken: jest.fn(),
  },
}));

describe("App Component", () => {
  const mockAuthService = AuthService as jest.Mocked<typeof AuthService>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Authentication", () => {
    it("shows login form when not authenticated", () => {
      mockAuthService.login.mockReturnValue(null);
      render(<App />);

      expect(screen.getByText("Login")).toBeInTheDocument();
      expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });

    it("shows error message on failed login", () => {
      mockAuthService.login.mockReturnValue(null);
      render(<App />);

      fireEvent.change(screen.getByLabelText(/username/i), {
        target: { value: "wronguser" },
      });
      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: "wrongpass" },
      });
      fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

      expect(
        screen.getByText("Invalid username or password"),
      ).toBeInTheDocument();
    });

    it("shows main content after successful login", () => {
      const mockToken = "mock-token";
      const mockUser = {
        sub: 1,
        username: "testuser",
        role: "user" as const,
        exp: Date.now() + 3600000,
      };

      mockAuthService.login.mockReturnValue(mockToken);
      mockAuthService.verifyToken.mockReturnValue(mockUser);

      render(<App />);

      fireEvent.change(screen.getByLabelText(/username/i), {
        target: { value: "testuser" },
      });
      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: "password" },
      });
      fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

      expect(screen.getByText("My Play List")).toBeInTheDocument();
      expect(
        screen.getByText(`Welcome, ${mockUser.username} (${mockUser.role})`),
      ).toBeInTheDocument();
    });

    it("allows logout", () => {
      const mockToken = "mock-token";
      const mockUser = {
        sub: 1,
        username: "testuser",
        role: "user" as const,
        exp: Date.now() + 3600000,
      };

      mockAuthService.login.mockReturnValue(mockToken);
      mockAuthService.verifyToken.mockReturnValue(mockUser);

      render(<App />);

      // Login first
      fireEvent.change(screen.getByLabelText(/username/i), {
        target: { value: "testuser" },
      });
      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: "password" },
      });
      fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

      // Then logout
      fireEvent.click(screen.getByText("Logout"));

      expect(screen.getByText("Login")).toBeInTheDocument();
    });
  });

  describe("Song Management", () => {
    beforeEach(() => {
      const mockToken = "mock-token";
      const mockUser = {
        sub: 1,
        username: "admin",
        role: "admin" as const,
        exp: Date.now() + 3600000,
      };

      mockAuthService.login.mockReturnValue(mockToken);
      mockAuthService.verifyToken.mockReturnValue(mockUser);

      render(<App />);

      // Login as admin
      fireEvent.change(screen.getByLabelText(/username/i), {
        target: { value: "admin" },
      });
      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: "password" },
      });
      fireEvent.click(screen.getByRole("button", { name: /sign in/i }));
    });

    it("shows add a new song form only for admins", () => {
      // Login as regular user
      mockAuthService.login.mockReturnValue("user-token");
      mockAuthService.verifyToken.mockReturnValue({
        sub: 2,
        username: "admin",
        role: "admin",
        exp: Date.now() + 3600000,
      });
      expect(screen.queryByText("Add New Song")).toBeInTheDocument();
    });

    it("shows delete button only for admin users", () => {
      // First check as admin
      expect(screen.getAllByTitle("Remove song")).toHaveLength(5);

      // Logout
      fireEvent.click(screen.getByText("Logout"));

      // Login as regular user
      mockAuthService.login.mockReturnValue("user-token");
      mockAuthService.verifyToken.mockReturnValue({
        sub: 2,
        username: "user",
        role: "user",
        exp: Date.now() + 3600000,
      });

      fireEvent.change(screen.getByLabelText(/username/i), {
        target: { value: "user" },
      });
      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: "password" },
      });
      fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

      // Verify no remove buttons are present for regular user
      expect(screen.queryByTitle("Remove")).not.toBeInTheDocument();
    });

    it("allows admin to add a new song", () => {
      const newSong = {
        title: "New Test Song",
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

      fireEvent.click(screen.getByRole("button", { name: /Add Song/i }));

      expect(screen.getByText(newSong.title)).toBeInTheDocument();
      expect(screen.getByText(newSong.artist)).toBeInTheDocument();
    });
  });
});
