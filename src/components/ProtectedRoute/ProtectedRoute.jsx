import { Navigate } from 'react-router-dom';
import './ProtectedRoute.module.css';

// --- IGNORE ---
export default function ProtectedRoute(props) {
  if (localStorage.getItem('token') !== null) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}
