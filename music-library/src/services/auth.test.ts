import { AuthService } from "../services/auth";

describe("AuthService", () => {
  it("creates a valid token for a user", () => {
    const token = AuthService.login("admin");
    expect(token).toBeTruthy();

    const payload = AuthService.verifyToken(token!);
    expect(payload).toBeTruthy();
    expect(payload?.username).toBe("admin");
    expect(payload?.role).toBe("admin");
  });

  it("returns null for invalid credentials", () => {
    const token = AuthService.login("invalid");
    expect(token).toBeNull();
  });

  it("verifies a valid token", () => {
    const token = AuthService.createToken({
      id: 1,
      username: "test",
      role: "user",
    });

    const payload = AuthService.verifyToken(token);
    expect(payload).toBeTruthy();
    expect(payload?.username).toBe("test");
  });

  it("rejects an invalid token", () => {
    const payload = AuthService.verifyToken("invalid-token");
    expect(payload).toBeNull();
  });
});
