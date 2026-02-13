import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './pages/Layout/Layout.jsx';
import Home from './pages/Home/Home.jsx';
import Profile from './pages/Profile/Profile.jsx';
import Register from './pages/Register/Register.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';
import Login from './pages/Login/Login.jsx';
import { UserDataProvider } from './Context/UserData.jsx';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import PostDetails from './components/PostDetails/PostDetails.jsx';
import { Toaster } from 'react-hot-toast';
const query = new QueryClient(); // Create a QueryClient instance to use with React Query

const router = createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    children: [
      {
        index: true,
        path: '/',
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: '/profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: '/PostDetails/:id',
        element: (
          <ProtectedRoute>
            <PostDetails />
          </ProtectedRoute>
        ),
      },
      { path: '/register', element: <Register /> },
      { path: '/login', element: <Login /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <UserDataProvider>
      <QueryClientProvider client={query}>
        <RouterProvider router={router} />
        <Toaster />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </UserDataProvider>
  );
}

export default App;
