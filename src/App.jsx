import React from "react";
import { useRoutes } from "react-router-dom";
import { routes } from "./routes.jsx";
import { Navbar } from "./components/Navbar";
import { PostPage } from "./pages/post/PostPage.jsx";

export const App = () => {
  const element = useRoutes(routes);

  return (
    <>
      {element}
    </>
  );
};

export default App;
