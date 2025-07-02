import React from 'react'
import AdminRoutes from "../../admin-panel/src/routes/AdminRoutes";
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
          <Routes>
      <Route path="admin" element={<  AdminRoutes/>} />
          </Routes>
    </div>
  )
}

export default App
