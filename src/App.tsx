import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './views/login/Login'
import Tasks from './views/tasks/Tasks'
import TaskDetail from './views/task-details/TaskDetail'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { fetchUserDetails, isUserLoading } from './reducers/userSlice'
import Loader from './components/Loader'
import PrivateRoute from './components/shared/PrivateRoute'
import Header from './components/shared/Header'

const App: React.FC = () => {
  const userLoading = useAppSelector(isUserLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserDetails())
    // eslint-disable-next-line
  }, [])

  if (userLoading) {
    return <Loader />
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path="/home" element={
          <PrivateRoute>
            <Tasks />
          </PrivateRoute>
        }
        />
        <Route path="/task-detail/:id" element={
          <PrivateRoute>
            <TaskDetail />
          </PrivateRoute>
        }
        />
        <Route path="*" element={<Navigate to="home" replace />} />
      </Routes>
    </>
  )
}

export default App;
