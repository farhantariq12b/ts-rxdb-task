import React, { useState } from 'react';
import { getDatabase } from '../../schemas/db';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState<string>('');
  const navigate = useNavigate();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const db = await getDatabase();
      const usersCollection = db.users;

      const newUser = await usersCollection.insert({
        id: Date.now(),
        username: username,
      });

      console.log('User entry added:', newUser.toJSON());

      setUsername('');
      navigate('/home');
    } catch (error) {
      console.error('Error adding user entry:', error);
    }

    console.log(`Logging in with username: ${username}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleLogin}>
        <input
          className="p-4 mb-8 w-64 text-lg border rounded"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={handleUsernameChange}
        />
        <button
          className="p-4 w-32 text-lg bg-green-500 text-white border-none cursor-pointer"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
