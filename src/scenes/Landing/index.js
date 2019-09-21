import React from 'react';
import { Lock } from 'react-feather';
import './style.css';

export default _ => {

  const handleSubmit = e => {
    e.preventDefault();
  }

  return (
    <>
      <div id="main-jumbotron">
        <div id="main-jumbotron-header">
          <div id="main-box-img">
            <img src="./assets/white-cloud.png" alt="logo"/>
          </div>
          <h1>Awan</h1>
        </div>

        <div id="main-jumbotron-body">
          <div id="main-jumbotron-text-box">
            <div id="main-jumbotron-text">
              <h2>Advanced Waiting Line</h2>
              <p>Waiting is bored! Now, Awan ready to help your management customer queue. Increase your service with Awan. Give more care to your customers.</p>
            </div>
          </div>

          <div id="box-auth">
            <div id="form-auth">
              <Lock size='50' color="rgba(98, 124, 240, .7)"></Lock>
              <h2>Login</h2>
              <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Email"/>
                <input type="password" placeholder="Password"/>
                <button type="submit" className="btn btn-blue btn-max" id="btn-login">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <section id="main-intro">
        <div id="main-intro-box">
          <h2>Why Awan?</h2>
          <p>Cause this is perfect yeah...</p>
        </div>
      </section>
    </>
  )
}