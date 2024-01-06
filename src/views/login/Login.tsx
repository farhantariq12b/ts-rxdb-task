import React, { useState } from 'react';
import { getDatabase } from '../../schemas/db';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { setUserDetails } from '../../reducers/userSlice';

function Login() {
  const [username, setUsername] = useState<string>('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch()


  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const db = await getDatabase();
      const usersCollection = db.users;

      const query = usersCollection.findOne({
        selector: {
          username,
        },
      });
  
      let user = await query.exec();

      if (!user) {
        user = await usersCollection.insert({
          id: Date.now(),
          username: username,
        });  
      }

      setUsername('');
      dispatch(setUserDetails(user.toJSON()))
      localStorage.setItem('user_id', user.id)
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
