import { User, JWTPayload } from "../types";

const MOCK_USERS: User[] = [
  { id: 1, username: "admin", role: "admin" },
  { id: 2, username: "user", role: "user" },
];

export class AuthService {
  static createToken(user: User): string {
    const payload: JWTPayload = {
      sub: user.id,
      username: user.username,
      role: user.role,
      exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    };

    // In a real app, we will use a proper JWT library
    return btoa(JSON.stringify(payload));
  }

  static verifyToken(token: string): JWTPayload | null {
    try {
      const payload = JSON.parse(atob(token)) as JWTPayload;
      if (payload.exp < Date.now()) {
        return null;
      }
      return payload;
    } catch {
      return null;
    }
  }

  static login(username: string): string | null {
    // In a real app, we will verify the password at backend
    const user = MOCK_USERS.find((u) => u.username === username);
    if (!user) return null;

    return this.createToken(user);
  }
}
