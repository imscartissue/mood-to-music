import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, Link, RouterProvider } from 'react-router'

import HomePage from './elements/HomePage';
import MoodPage from './elements/MoodPage';
import Callback from './backend/Callback';

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
    errorElement: <div className="text-gray-200 text-center text-2xl my-10">
      <p className="mb-10">404 Not Found</p>
      <Link to="/" className="bg-yellow-700 rounded-2xl p-3 hover:bg-yellow-800 hover:cursor-pointer transition text-center">Home</Link>
    </div>
  },
  { path: "/mood/:moodName", element: <MoodPage /> },
  { path: "/callback", element: <Callback /> },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
