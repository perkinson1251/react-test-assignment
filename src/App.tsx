import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import EditPage from '@/pages/EditPage'
import UsersPage from '@/pages/UsersPage'

import MainLayout from '@/layouts/MainLayout'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<UsersPage />} />
          <Route path="/edit" element={<EditPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
