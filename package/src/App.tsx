import { RouterProvider } from "react-router-dom";
import { Flowbite, ThemeModeScript } from 'flowbite-react';
import customTheme from './utils/theme/custom-theme';
import router from "./routes/Router";
import { HelmetProvider } from 'react-helmet-async';



function App() {
  return (
    <>
      <ThemeModeScript />
      <HelmetProvider>
        <Flowbite theme={{ theme: customTheme }}>
          <RouterProvider router={router} />
        </Flowbite>
      </HelmetProvider>
    </>
  );
}

export default App;
