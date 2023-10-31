"use client"
import styles from './login.css'
import { useState } from 'react';
import axios from "axios"

//import axios from 'axios';

 function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const loginHandler = async (e) => {
    e.preventDefault();
      try {
        if (!email) {
          return alert("Email를 입력하세요.");
        }
        else if (!password) {
          return alert("Password를 입력하세요.");
        }
        const axios = require('axios')
          await axios.post('/api/user/login',{
            email : email,
            password : password
        }).then((res)=>{
          console.log(res.data);
          if(res.data.code === 200) {
            console.log("로그인");
            dispatch(loginUser(res.data.userInfo));
          }
         
        });
    }catch(error){
      if(error.response.status === 401) {
        alert("ID, Password가 틀립니다.");
      }else{
        console.log("error : ", error);
      }
    }
  }
    
/*
  const aa = (e) => {
    const response = axios({
      url : "api/tokentest",
      method : "GET",
      withCredentials : true,
    })
    if (response.ok) {
      const data = response.json();
      console.log(data.authority);
      console.log(data.email);
      console.log(data.name);

    } else {
      console.error('User creation failed');
    }
    console.log()
  }
*/
    return (
        <main className={styles.main}>
        
        <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
        </div>
        <form onSubmit={loginHandler}>
            <h3>Login Here</h3>

            <label htmlFor="username">Username</label>
            <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>

            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>

            <button type='submit'>Log In</button>
            <div className="social">
            <div className="go"><i className="fab fa-google"></i>  Google</div>
            </div>
        </form>
        </main>
    )
}

export default Login;
