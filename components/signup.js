"use client"
import React from 'react';
import styles from './login.css'
import { useState } from 'react';

function signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [emailDupleCheck, setEmailDupleCheck] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const signupHandler = async (e) => {
    e.preventDefault();
      try {
        //이름 유효성 검사
        const special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
        if (special_pattern.test(username)) {
          return alert('이름에 특수문자는 사용할 수 없습니다.');
        }

        //이메일 유효성 검사
        const regEmail = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
        if (!regEmail.test(email)) {
          return alert('이메일 형식에 맞지 않습니다.');
        }

        if(email !== emailDupleCheck){
          console.log("여길 왜 와");
          return alert("이메일 중복 검사를 진행해 주세요");
        }
        if(!passwordsMatch){
          return alert("비밀번호를 확인해 주세요");
        }
        const response = await fetch('/api/user/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          
          body: JSON.stringify({ username, email, password }),
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log(data);
        } else {
          console.error('User creation failed');
        }
      } catch (error) {
        console.error('Error:', error);
      }
  }
  const passwordChangerHandler = (e) => {
    setPassword(e.target.value);
    if (e.target.value !== confirmPassword) {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);
    }
  }
  const confirmPasswordChangeHandler = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value !== password) {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);
    }
  };

  const dupliecationEmailCheck = async (e) => {
    try {
      //이메일 유효성 검사
      const regEmail = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
      if (!regEmail.test(email)) {
        return alert('이메일 형식에 맞지 않습니다.');
      }

      e.preventDefault();
        const response = await fetch('/api/user/duplecheck', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          
          body: JSON.stringify({ email }),
        });

      if (response.ok) {
        const data = await response.json();
        if(data.isDuplicate){
          alert("생성 가능");
          setEmailDupleCheck(email);
        }else{
          alert("이미 가입된 이메일");
        }
      } else {
        console.error('User creation failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }finally{
        
    }
  }
  return (
    <main className={styles.main}>
        
        <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
        </div>
        <form onSubmit={signupHandler}>
            <h3>Signup Here</h3>
            <label htmlFor="username">Username</label>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>

            <label htmlFor="email">Email</label>
            <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/> <button onClick={dupliecationEmailCheck}>Check Email</button>

            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Password" value={password} onChange={passwordChangerHandler}/>

            <label htmlFor="password">Check Password</label>
            <input type="password" placeholder="Password" value={confirmPassword} onChange={confirmPasswordChangeHandler}/>
            {!passwordsMatch && <p>Passwords do not match.</p>}
            <button type='submit'>Sign Up</button>
            <div className="social">
            <div className="go"><i className="fab fa-google"></i>Google</div>
            </div>
        </form>
        </main>
  );
}


export default signup;
