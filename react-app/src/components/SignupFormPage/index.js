import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [img, setImg] = useState("");
  const [artistName, setArtistName] = useState('')
  const [artistAccount, setArtistAccount] = useState(false)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(signUp(username, email, password, bio, img, artistAccount, artistName));
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(['Confirm Password field must be the same as the Password field']);
    }
  };

  return (
    <>
      <form className="signup-form-container" onSubmit={handleSubmit}>
        <h1 className="login-heading">Sign Up</h1>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label className="signup-input">
          Email
          <input
            className='input-field'
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="signup-input">
          Username
          <input
            className='input-field'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label className="signup-input">
          Artist Account
          <input
            type="checkbox"
            checked={artistAccount}
            onChange={(e) => setArtistAccount(e.target.checked)}
          />
        </label>
        <label className="signup-input">
          Artist Name
          <input
            className='input-field'
            type="text"
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
          />
        </label>
        <label className="signup-input">
          Profile Picture
          <input
            className='input-field'
            type="text"
            value={img}
            onChange={(e) => setImg(e.target.value)}
          />
        </label>
        <label className="signup-input">
          Bio
          <input
            className='input-field'
            type="text"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </label>
        <label className="signup-input">
          Password
          <input
            className='input-field'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label className="signup-input">
          Confirm Password
          <input
            className='input-field'
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button className="login-button" type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormPage;
