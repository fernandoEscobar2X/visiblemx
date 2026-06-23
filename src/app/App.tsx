import { RouterProvider } from 'react-router';
import { router } from './routes';
import { NoiseOverlay } from './components/NoiseOverlay';

export default function App() {
  return (
    <>
      <NoiseOverlay />
      <RouterProvider router={router} />
    </>
  );
}