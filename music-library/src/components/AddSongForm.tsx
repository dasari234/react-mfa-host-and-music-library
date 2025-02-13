import React, { useState } from "react";
import { Song } from "../types";

interface AddSongFormProps {
  onAdd: (song: Omit<Song, "id">) => void;
}

export const AddSongForm: React.FC<AddSongFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [coverUrl, setCoverUrl] = useState("");

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ title, artist, album, coverUrl });
    setTitle("");
    setArtist("");
    setAlbum("");
    setCoverUrl("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded p-6 mb-6"
    >
      <div className="flex items-center mb-4">
        <h3 className="text-lg font-semibold">Add New Song</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            area-labledby="title"
          >
            Title
          </label>
          <input
            type="text"
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            area-labledby="artist"
          >
            Artist
          </label>
          <input
            type="text"
            value={artist}
            placeholder="Artist"
            onChange={(e) => setArtist(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            area-labledby="album"
          >
            Album
          </label>
          <input
            type="text"
            value={album}
            placeholder="Album"
            onChange={(e) => setAlbum(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            area-labledby="coverUrl"
          >
            Cover URL
          </label>
          <input
            type="url"
            value={coverUrl}
            placeholder="Cover URL"
            onChange={(e) => setCoverUrl(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
      </div>

      <div className="mt-4">
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Song
        </button>
      </div>
    </form>
  );
};
export default AddSongForm;
