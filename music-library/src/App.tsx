import "./App.css";
import React from "react";
import { useState, useMemo } from "react";
import { Song, SortKey, JWTPayload } from "./types";
import { AuthService } from "./services/auth";

const MusicCard = React.lazy(() => import("./components/MusicCard"));
const Filters = React.lazy(() => import("./components/Filters"));
const LoginForm = React.lazy(() => import("./components/LoginForm"));
const AddSongForm = React.lazy(() => import("./components/AddSongForm"));

// Intial songs data
const INITIAL_SONGS: Song[] = [
  {
    id: 1,
    title: "Summer Breeze",
    artist: "Chill Vibes",
    album: "Seasonal Moods",
    coverUrl:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=500",
  },
  {
    id: 2,
    title: "Mountain Echo",
    artist: "Nature Sounds",
    album: "Wilderness",
    coverUrl:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&q=80&w=500",
  },
  {
    id: 3,
    title: "Urban Night",
    artist: "City Lights",
    album: "Metropolitan",
    coverUrl:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&q=80&w=500",
  },
  {
    id: 4,
    title: "New Boys",
    artist: "City Lights",
    album: "Metropolitan",
    coverUrl:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&q=80&w=500",
  },
  {
    id: 5,
    title: "Street Boys",
    artist: "City Lights",
    album: "Metropolitan",
    coverUrl:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&q=80&w=500",
  },
];

const App = () => {
  const [songs, setSongs] = useState<Song[]>(INITIAL_SONGS);
  const [sortKey, setSortKey] = useState<SortKey>("title");
  const [filterValue, setFilterValue] = useState("");
  const [user, setUser] = useState<JWTPayload | null>(null);
  const [loginError, setLoginError] = useState<string>();

  //handle login
  const handleLogin = (username: string) => {
    const token = AuthService.login(username);
    if (token) {
      const user = AuthService.verifyToken(token);
      setUser(user);
      setLoginError(undefined);
    } else {
      setLoginError("Invalid username or password");
    }
  };

  //handle logout
  const handleLogout = () => {
    setUser(null);
  };

  //handle add song
  const handleAddSong = (newSong: Omit<Song, "id">) => {
    const song: Song = {
      ...newSong,
      id: Math.max(...songs.map((s) => s.id)) + 1,
    };
    setSongs((prev) => [...prev, song]);
  };

  //handle remove song
  const handleRemoveSong = (id: number) => {
    setSongs((prev) => prev.filter((song) => song.id !== id));
  };

  //filter and sort songs with useMemo hook
  const filteredAndSortedSongs = useMemo(() => {
    return songs
      .filter(
        (song) =>
          song.title.toLowerCase().includes(filterValue.toLowerCase()) ||
          song.artist.toLowerCase().includes(filterValue.toLowerCase()) ||
          song.album.toLowerCase().includes(filterValue.toLowerCase()),
      )
      .sort((a, b) => a[sortKey].localeCompare(b[sortKey]));
  }, [songs, sortKey, filterValue]);

  //if user is not logged in, show login form
  if (!user) {
    return <LoginForm onLogin={handleLogin} error={loginError} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1>My Play List</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">
            Welcome, {user.username} ({user.role})
          </span>
          <button
            onClick={handleLogout}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* show add song form for admin user */}
      {user.role === "admin" && <AddSongForm onAdd={handleAddSong} />}

      <Filters
        sortKey={sortKey}
        onSortChange={setSortKey}
        filterValue={filterValue}
        onFilterValueChange={setFilterValue}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedSongs.map((song) => (
          <MusicCard
            key={song.id}
            {...song}
            onRemove={
              user.role === "admin"
                ? () => handleRemoveSong(song.id)
                : undefined
            }
          />
        ))}
      </div>

      {filteredAndSortedSongs.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No songs found matching your filter criteria
        </div>
      )}
    </div>
  );
};

export default App;
