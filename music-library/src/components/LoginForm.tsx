import React, { useState } from "react";

interface LoginFormProps {
  onLogin: (username: string, password: string) => void;
  error?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin, error }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  //update username state
  const handleUsername = (e: React.FormEvent) => {
    setUsername((e.target as HTMLInputElement).value);
  };

  //update password state
  const handlePassword = (e: React.FormEvent) => {
    setPassword((e.target as HTMLInputElement).value);
  };

  return (
    <div className="mx-auto flex max-w-sm items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10 m-6">
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex-col items-center px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            value={username}
            onChange={handleUsername}
            placeholder="Enter username"
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            value={password}
            onChange={handlePassword}
            placeholder="******************"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
