import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { socialLogin, userLogin } from "../../redux/feature/user/action";
import { BiLockAlt } from "react-icons/bi";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
const CLIENT_ID =
"944532919139-soltbsg53sj4dbv5ho4hju953u66sae1.apps.googleusercontent.com";

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
  };
  const onkeyupHandler = (e) => {
    if (e.code === "Enter") {
      login();
    }
  };

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
      <section className='max-w-xs flex justify-center items-center flex-col gap-4  font-bold text-slate-700 bg-white rounded-2xl py-4  w-full'>
        <div className='ml-2'></div>
        <form
          className='flex flex-col gap-3 w-full  justify-center'
          onSubmit={onSubmitHandler}
          onKeyUp={onkeyupHandler}
        >
          <span className='text-center p-3 m-6 text-lg border border-violet-500 rounded-full tracking-wider'>
            LOGIN
          </span>

          <input
            type='text'
            name='id'
            ref={userRef}
            autoComplete='off'
            placeholder='ID'
            className='p-2 font-thin border-b-2 focus:outline-none focus:border-slate-700'
            value={user.id}
            onChange={onChangeHandler}
          />
          <div className='relative flex'>
            <input
              type='password'
              name='pw'
              autoComplete='off'
              placeholder='PW'
              className='p-2 font-thin border-b-2 focus:outline-none focus:border-slate-700 w-full'
              value={user.pw}
              onChange={onChangeHandler}
            />
            <BiLockAlt className='text-2xl absolute right-3 top-2' />
          </div>
          <div className='mt-2 flex gap-2'>
            <input type='checkbox' />{" "}
            <span className='text-xs'>자동로그인</span>
          </div>
          <ErrorMsg errMsg={errMsg} />
          <button type='submit' className='bg-slate-700 text-white p-2 mt-2'>
            로그인
          </button>
        </form>

        <GoogleOAuthProvider clientId={CLIENT_ID}>
        <GoogleLogin from={from}/>
        </GoogleOAuthProvider>
        <Link to='https://kauth.kakao.com/oauth/authorize?client_id=f88e775d67dd7301bc6017738cbf1a60&redirect_uri=http://localhost:3000/redirect&response_type=code' className='w-full text-inherit hover:text-inherit'>
        <button className=' w-full p-3 border flex items-center justify-center '>
          <img src='imgs/kakao.png' alt='' className='w-7' />
          <span className='ml-4'>Kakao로 로그인</span>
        </button>
        </Link>
        
      

        <div className='bg-slate-50 w-full p-3 shadow-md'>
          <div className='flex justify-between mt-2 px-3'>
            <span>계정이 없으신가요?</span>
            <Link to='/register'>회원가입</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

const ErrorMsg = ({ errMsg }) => {
  return <p className='text-red-500 text-sm'>{errMsg}</p>;
};

const GoogleLogin = ({from}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const googleLogin = useGoogleLogin({
    onSuccess: async (res) => {
      const {access_token} = res
      console.log(access_token)
      await dispatch(socialLogin(access_token))
      navigate(from, { replace: true });
    },
  });
  return (
    <button className=' w-full p-3 border flex items-center justify-center'
    onClick={googleLogin}>
    <img src='imgs/google.png' alt='' className='w-7' />
    <span className='ml-4'>Google로 로그인</span>
  </button>
  );
};

export default Login;
