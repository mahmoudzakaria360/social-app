import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useContext } from 'react';
import { userData } from '../../Context/userData';

export default function Navbar() {
  const navigate = useNavigate();
  const { Token, setToken } = useContext(userData);

  function SignOut() {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');
  }

  return (
    <div className={styles.navbar}>
      <nav className="bg-neutral-primary border-b dark border-default">
        <div className="max-w-screen-xl flex dark flex-wrap items-center justify-between mx-auto p-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-7"
              alt="logo"
            />
            <span className="  self-center text-xl text-heading font-semibold">
              SocialApp
            </span>
          </Link>
          {/* Right side */}
          <div className="flex gap-x-6 items-center">
            {!Token ? (
              <ul className="flex gap-x-6 text-white">
                <li>
                  <Link to="/register">Register</Link>
                </li>
                <li>
                  <Link to="/login">Log In</Link>
                </li>
              </ul>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/"
                  className="p-2 hover:bg-neutral-tertiary-medium  text-white rounded"
                >
                  Home
                </Link>
                <Link
                  to="/profile"
                  className="p-2 hover:bg-neutral-tertiary-medium  text-white rounded"
                >
                  MY-Profile
                </Link>
                <button
                  onClick={SignOut}
                  className="p-2 hover:bg-neutral-tertiary-medium rounded text-white cursor-pointer"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
