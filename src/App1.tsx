import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './views/login/Login'
import Tasks from './views/tasks/Tasks'
import TaskDetail from './views/task-details/TaskDetail'

const App1: React.FC = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />        
      <Route path='/home' element={<Tasks />} />        
      <Route path='/task-detail/:id' element={<TaskDetail />} />        
      <Route path="*" element={<Navigate to="home" replace />} />
    </Routes>
  )
}

export default App1