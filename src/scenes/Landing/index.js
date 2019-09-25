import React, { useState } from 'react';
import { Lock } from 'react-feather';
import Loading from '../Loading/';
import './style.css';

// <=========== Graphql ===========>
import { useMutation } from '@apollo/react-hooks';
import { LOGIN } from '../../services/graphql/mutation';

export default ({ setIsLogin }) => {

  const [emailLogin, setEmailLogin] = useState('');
  const [passLogin, setPassLogin] = useState('');
  const [login, { loading, error }] = useMutation(LOGIN, {
    onCompleted({ loginCompany: data }) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('ccid', data._id);
      setIsLogin(true);
    },
  });

  const handleSubmit = e => {
    e.preventDefault();
    login({
      variables: {
        email: emailLogin,
        password: passLogin,
      }
    }).catch(console.log);
  }

  if (loading) {
    return <Loading/>
  }

  if (error && error.message === 'GraphQL error: Request failed with status code 401') {
    return (
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
              <p>Don't make your customer wait! Awan solves one of the most irritating daily problems which is standing in line by offering an automated mobile queuing app to better manage the flow of the queue and save people a lot of time. Get in the queue before you arrive, use Awan!</p>
            </div>
          </div>

          <div id="box-auth">
            <div id="form-auth">
              <Lock size='50' color="rgba(98, 124, 240, .7)"></Lock>
              <h2>Login</h2>
              <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Email" value={emailLogin} onChange={e => setEmailLogin(e.target.value)} />
                <input type="password" placeholder="Password" value={passLogin} onChange={e => setPassLogin(e.target.value)}/>
                <span id="wrong">Wrong username or password</span>
                <button type="submit" className="btn btn-blue btn-max" id="btn-login">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
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
              <p>Don't make your customer wait! Awan solves one of the most irritating daily problems which is standing in line by offering an automated mobile queuing app to better manage the flow of the queue and save people a lot of time. Get in the queue before you arrive, use Awan!</p>
            </div>
          </div>

          <div id="box-auth">
            <div id="form-auth">
              <Lock size='50' color="rgba(98, 124, 240, .7)"></Lock>
              <h2>Login</h2>
              <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Email" value={emailLogin} onChange={e => setEmailLogin(e.target.value)} />
                <input type="password" placeholder="Password" value={passLogin} onChange={e => setPassLogin(e.target.value)}/>                
                <button type="submit" className="btn btn-blue btn-max" id="btn-login">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* <section id="main-intro">
        <div id="main-intro-box">
          <h2>Why Awan?</h2>
          <p>Cause this is perfect yeah...</p>
        </div>
      </section> */}
    </>
  )
}