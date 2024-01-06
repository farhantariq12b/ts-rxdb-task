import React from 'react';
import { useAppSelector } from '../../store/hooks';
import { getUserDetails } from '../../reducers/userSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const user = useAppSelector(getUserDetails);
  const navigate = useNavigate();

  const logoutUser = () => {
    localStorage.setItem('user_id', '')
    navigate('/login')
  }

  return (
    <header className="bg-blue-500 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-2xl cursor-pointer font-semibold" onClick={() => navigate('/home')}>Task creator</h1>

        {user && <button onClick={logoutUser}>Logout</button>}
      </div>
    </header>
  );
};

export default Header;
