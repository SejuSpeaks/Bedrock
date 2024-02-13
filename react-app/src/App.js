import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import AlbumForm from "./components/AlbumFormPage";
import AlbumDetails from "./components/AlbumDetailsPage";
import LandingPage from "./components/LandingPage";
import CommunityTab from "./components/CommunityTab";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>

          <Route exact path='/'>
            <LandingPage />
          </Route>

          <Route path="/login" >
            <LoginFormPage />
          </Route>

          <Route path="/signup">
            <SignupFormPage />
          </Route>

          <Route path='/albums/new'>
            <AlbumForm />
          </Route>

          <Route path='/artists/:artistid'>
            <CommunityTab />
          </Route>

          <Route><div>Not Found</div></Route>
        </Switch>
      )}
    </>
  );
}

export default App;
