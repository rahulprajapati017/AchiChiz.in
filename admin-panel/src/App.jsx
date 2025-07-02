import React from 'react'
import AdminRoutes from "../../admin-panel/src/routes/AdminRoutes";

function App() {
  return (
    <div>
      <Route path="admin" element={<  AdminRoutes/>} />
    </div>
  )
}

export default App
