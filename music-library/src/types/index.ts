export interface Song {
  id: number;
  title: string;
  artist: string;
  album: string;
  coverUrl: string;
}

export interface User {
  id: number;
  username: string;
  role: "user" | "admin";
}

export type SortKey = "title" | "artist" | "album";
export type FilterKey = SortKey;

export interface JWTPayload {
  sub: number;
  username: string;
  role: "user" | "admin";
  exp: number;
}
