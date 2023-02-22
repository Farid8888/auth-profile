import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import {AuthPage} from './pages/AuthPage'
import People from './pages/People'
import Account from './pages/Account'

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path='/people' element={<People/>}/>
        <Route path='/account/:id' element={<Account/>}/>
        <Route
        path="*"
        element={<Navigate to="/people" replace />}
    />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path="/" exact element={<AuthPage />}/>
      <Route
        path="*"
        element={<Navigate to="/" replace />}
    />
    </Routes>
  )
}
