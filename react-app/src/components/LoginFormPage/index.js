import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoUserArtist = async (e) => {
    const data = await dispatch(login('demo@aa.io', 'password'));
    if (data) {
      setErrors(data);
    }
  }

  const demoUser = async (e) => {
    const data = await dispatch(login('bobbie@aa.io', 'password'));
    if (data) {
      setErrors(data);
    }
  }

  return (
    <div className="login-page-whole">
      <form onSubmit={handleSubmit} className="login-form">
        <div className="login-text-container">
          <h1 className="login-heading">Log In</h1>
        </div>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>

        <div className="input-login-form">
          <div className="input-inner">
            <p>Email</p>
          </div>
          <input
            className="input-field"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-login-form">
          <div>
            password
          </div>
          <input
            className="input-field"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

        </div>

        <button type="submit" className="login-button">Log In</button>
      </form>
      <div className="demo-buttons-container">
        <button onClick={(e) => demoUserArtist(e)}>DEMO ARTIST</button>
        <button onClick={(e) => demoUser(e)}>DEMO USER</button>
      </div>
    </div>
  );
}

export default LoginFormPage;
