import { RouterProvider } from 'react-router';
import { router } from './routes';
import { NoiseOverlay } from './components/NoiseOverlay';
import { CustomCursor } from './components/CustomCursor';

export default function App() {
  return (
    <>
      <CustomCursor />
      <NoiseOverlay />
      <RouterProvider router={router} />
    </>
  );
}