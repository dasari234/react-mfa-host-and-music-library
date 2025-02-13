import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

//load layout component from as lazy component
const Layout = React.lazy(() => import("./components/Layout"));

//import music library component from remote as a federated module
const MusicLibrary = React.lazy(() => import("musicLibrary/App"));

// render the layout and music library components
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <Suspense fallback={<div>Loading Music Library...</div>}>
                <MusicLibrary />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
