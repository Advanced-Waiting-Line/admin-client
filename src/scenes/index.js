import React, { useState, useEffect } from 'react';
import './../assets/ourStyle.css';
import Landing from './Landing/';
import Auth from './Auth/';

const Main = _ => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(_ => {
    if (localStorage.getItem('token') && localStorage.getItem('ccid')) {
      setIsLogin(true);
    }
  }, []);
  
  if (isLogin) {
    return (
      <Auth setIsLogin={setIsLogin}/>
    )
  } else {
    return (
      <Landing setIsLogin={setIsLogin}/>
    )
  }
}

export default Main;