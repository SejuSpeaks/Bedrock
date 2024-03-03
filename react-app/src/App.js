import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navs/Navigation";
import AlbumForm from "./components/AlbumFormPage";
import AlbumDetails from "./components/AlbumDetailsPage";
import LandingPage from "./components/LandingPage";
import AllPosts from './components/Community/AllPosts'
import PostDetails from "./components/Community/PostDetails";
import MusicTab from "./components/MusicTab";
import UserPage from "./components/UserPage";
import Community from "./components/Community";
import AudioPlayer from "./components/AudioPlayer/AudioPlayer";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <>
          <Navigation isLoaded={isLoaded} />
          <Switch>

            <Route exact path='/'>
              <LandingPage />
            </Route>

            <Route exact path='/community'>
              {/* <Community /> */}
            </Route>

            <Route path='/audioplayertest'>
              <AudioPlayer />
            </Route>

            <Route path='/artists/:artistid/community/:postid'>
              <PostDetails />
            </Route>

            <Route path='/artists/:artistid/community'>
              <Community />
            </Route>

            <Route path='/artists/:artistid/albums/:albumid'>
              <AlbumDetails />
            </Route>

            <Route path='/artists/:artistid/albums'>
              <MusicTab />
            </Route>

            <Route path='/albums/new'>
              <AlbumForm />
            </Route>

            <Route path='/current'>
              <UserPage isLoaded={isLoaded} />
            </Route>

            <Route path="/login" >
              <LoginFormPage />
            </Route>

            <Route path="/signup">
              <SignupFormPage />
            </Route>



            <Route><div>Not Found</div></Route>
          </Switch>
        </>
      )}
      <div className="footer">
        <p style={{ color: "white" }}>BEDROCK</p>
      </div >
    </>
  );
}

export default App;
