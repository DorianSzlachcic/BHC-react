import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CandidateSide from './CandidateSide.jsx';
import RecruiterSide from './RecruiterSide.jsx';

const router = createBrowserRouter([
  {
    path: "candidate/:username/:channel/",
    element: <CandidateSide />,
  },
  {
    path: "recruiter/:username/:channel/",
    element: <RecruiterSide />,
  },
]);

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
