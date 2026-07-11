import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';
import Login from './pages/Login.jsx'; // Import the new Login component
import Home from './pages/Home.jsx'; // import the home page here 
import MyHistory from './pages/MyHistory.jsx';


import AdminLayout from './pages/Admin/AdminLayout';
import AddBook from './pages/Admin/AddBook';
import DashboardOverview from './pages/Admin/DashboardOverview';
import PendingRequests from './pages/Admin/PendingRequests';
import ManageBooks from './pages/Admin/ManageBooks.jsx';
import UsersList from './pages/Admin/UsersList.jsx';
import { AdminRoute, ProtectedRoute } from './components/ProtectedRoute.jsx';

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        {/* We'll add /register soon */}

        <Route element={<ProtectedRoute />}>
          <Route path="/my-history" element={<MyHistory />} />
          {/* You can add user profile, settings, etc. here later */}
        </Route>


        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="add-book" element={<AddBook />} />
            <Route path="manage-books" element={<ManageBooks />} />
            <Route path="requests" element={<PendingRequests />} />
            <Route path="users" element={<UsersList />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

    </Router>
  );
}

export default App;