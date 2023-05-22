import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from '../../api/axios';
import { userLogin } from '../../redux/feature/user/action';


const Login = () => {
  const [user, setUser] = useState({
    id: "",
    pw: "",
  });

  const [errMsg, setErrMsg] = useState("");

  const dispatch = useDispatch();
  
  const navigate = useNavigate();

  const userRef = useRef();
  const location = useLocation();
  const from = location.state?.from.pathname || "/";
  const err = useSelector((state) => state.user.error);
  const isLogin = useSelector((state) => state.user.isLogin);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg(err);
  }, [err]);



  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    login();
  }
  const onkeyupHandler = (e) => {
    if(e.code === "Enter") {
      login();
    }
  }

  const login = async () => {
    if (!user.id) {
      setErrMsg("아이디를 입력해주십시오.");
      return;
    }
    if (!user.pw) {
      setErrMsg("비밀번호를 입력해주십시오.");
      return;
    }

    await dispatch(userLogin(user));
    navigate(from, { replace: true });

    
  };


  
  

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
    <section className='w-[420px] flex justify-center items-center flex-col gap-4  font-bold text-slate-700 bg-white rounded-2xl py-4 '>
      <div className='ml-2'></div>
      <form 
        className='flex flex-col gap-3 w-96 p-5 justify-center'
        onSubmit={onSubmitHandler}
        onKeyUp={onkeyupHandler}
      >
      <span className='text-center p-3 m-6 text-lg border border-violet-500 rounded-full tracking-wider'>
        Login
      </span>

      <input 
              type='text'
              name ="id"
              ref={userRef}
              autoComplete='off'
              placeholder='ID'
              className='p-2 font-thin border-b-2 focus:outline-none focus:border-slate-700'
              value={user.id}
              onChange={onChangeHandler}
              />
            <input 
              type='password'
              name="pw"
              autoComplete='off'
              placeholder='PW'
              className='p-2 font-thin border-b-2 focus:outline-none focus:border-slate-700'
              value={user.pw}
              onChange={onChangeHandler}
              />
              <div className='mt-2'>
              <input type='checkbox'/> <span className='text-sm'>자동로그인</span>
            </div>
            <ErrorMsg errMsg={errMsg}/>
            <button type='submit'  className='bg-slate-700 text-white p-2 mt-2'>로그인</button>
            </form>

            <div className=' w-96 p-3 border flex items-center justify-center '>
          <img src="./img/kakao.png" alt=""className='w-7'/>
          <span className='ml-4'>Kakao로 로그인</span>
        </div>
        <div className=' w-96 p-3 border flex items-center justify-center '>
          <img src="./img/google.png" alt=""className='w-7'/>
          <span className='ml-4'>Google로 로그인</span>
        </div>
        <div className='bg-slate-50 w-96 p-3 shadow-md'>
            <div className='flex justify-between mt-2 px-3' >
              <span>계정이 없으신가요?</span>
              <Link to="/register">회원가입</Link>
            </div>
            <div className='flex justify-between mt-2 px-3'>
              <span>잊으셨나요?</span>
              <Link to="/register">아이디/비밀번호 찾기</Link>
            </div>
        </div>
    </section>
    </div>
  );
}

const ErrorMsg = ({ errMsg }) => {
  return <p className='text-red-500 text-sm'>{errMsg}</p>;
};

export default Login;
