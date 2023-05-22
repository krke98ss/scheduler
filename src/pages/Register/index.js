import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';

const Register = () => {
  const USER_REGEX = /^[a-z]+[a-z0-9]{5,19}$/g;
  const PWD_REGEX = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
  const EMAIL_REGEX = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  const navigate = useNavigate();

  const [userInfo, setuserInfo] = useState({
    id: "",
    name: "",
    email: "",
    pw: "",
  });

  const [isValid, setIsValid] = useState({
    id: false,
    pw: false,
    email: false
  });
  const [isErr, setIsErr] = useState({
    id: false,
    name: false,
    email: false,
    pw: false,

  })

  const [confirmPwd, setConfirmPwd] = useState("");
  const [isConfirm, setIsConfirm] = useState(false);
  const userRef = useRef();
  const [errMsg, seterrMsg] = useState("");

  useEffect(() => {
    const result = USER_REGEX.test(userInfo.id);
    if (!result) {
      setIsValid({ ...isValid, id: false });
      return;
    } 
    setIsValid({ ...isValid, id: true });

  }, [userInfo.id]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(userInfo.email);
    if (!result){
      setIsValid({ ...isValid, email: false });
      return;
    } 
    setIsValid({ ...isValid, email: true });

  }, [userInfo.email]);

  useEffect(() => {
    const result = PWD_REGEX.test(userInfo.pw);
    if (!result) {
      setIsValid({ ...isValid, pw: false });
      return;
    }
    if (userInfo.pw === confirmPwd) {
      setIsValid({ ...isValid, pw: true });
    } else {
      setIsValid({ ...isValid, pw: false });
    }

  }, [userInfo.pw, confirmPwd]);

  useEffect(() => {
    if (!isValid.id || !isValid.email || !isValid.pw) {
      setIsConfirm(false);
      return;
    }
    setIsConfirm(true);

  }, [isValid]);


  useEffect(() => {
    userRef.current.focus();
  }, [])
  
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setuserInfo({ ...userInfo, [name]: value });

  }

  const checkId = async (e) => {
    try{
      const response = await axios.post(`/api/users/${userInfo.id}`);
      if(response?.data){
        if(response.data.duplicate){
          setIsErr({ ...isErr, id: true });
          seterrMsg("이미 사용중인 아이디입니다.");
          setIsValid({ ...isValid, id: false });
        } else {
          setIsErr({ ...isErr, id: false });
        }
      }
    }catch(err) {
      console.log(err);
    }
    
  }



  const ErrorMsg = () => {
    return (
      <p className='text-red-500 font-thin text-sm'>
        {errMsg}
      </p>
    )
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    register(userInfo);

  }

  const register = async (userInfo) => {
    const response = await axios.post("/api/auth/new", userInfo);
    console.log(response.data);
    if (response?.data) {
      if (response.data.success) {
        navigate("/login");
      }
    } 
  }





  return (
    <section className='w-screen, h-screen flex justify-center items-center flex-col gap-4  font-bold text-slate-700'>
      <div className='w-96 p-2 ml-2'>
        <Link to="/">← 뒤로가기</Link>
      </div>
      <form className='flex flex-col gap-5 w-96 p-5 justify-center' onSubmit={onSubmitHandler}>
        <span className='border-2 border-violet-400 text-center p-3 mx-6 text-lg rounded-full tracking-wider text-gray-400'>Register</span>
        <div className='flex w-full gap-7 flex-col'>
          <input
            type='text'
            name="id"
            ref={userRef}
            placeholder='아이디'
            className='p-2 font-thin border-b-2 focus:outline-none focus:border-slate-700'
            autoComplete='off'
            onChange={onChangeHandler}
            onBlur={checkId}
            value={userInfo.id}
          />
          {isErr.id ? <ErrorMsg /> : ""}

          <input
            type='text'
            name="name"
            placeholder='이름'
            className='p-2 font-thin border-b-2 focus:outline-none focus:border-slate-700'
            autoComplete='off'
            onChange={onChangeHandler}
            value={userInfo.name}
          />
          <input
            type='email'
            name="email"
            placeholder='이메일'
            className='p-2 font-thin border-b-2 focus:outline-none focus:border-slate-700'
            autoComplete='off'
            onChange={onChangeHandler}
            value={userInfo.email}
          />
          <div className='w-full flex   grow relative'>
            <input
              type='password'
              name="pw"
              placeholder='비밀번호'
              className='p-2 font-thin focus:outline-none  border-b-2 focus:border-slate-700 grow'
              autoComplete='off'
              onChange={onChangeHandler}
              value={userInfo.pw}
            />
            <span>
              <img src="img/lock.svg" alt="" className='w-7 absolute right-0' />
            </span>
          </div>
          <div className='w-full flex   grow relative'>
            <input
              type='password'
              name="confirmPw"
              placeholder='비밀번호 확인'
              className='p-2 font-thin focus:outline-none  border-b-2 focus:border-slate-700 grow'
              onChange={e => setConfirmPwd(e.target.value)}
            />
            <span>
              <img src="img/lock.svg" alt="" className='w-7 absolute right-0' />
            </span>
          </div>

          <div className='w-full flex grow relative'>
            <div className='flex flex-col w-full'>
              <label className='border rounded-md text-center mb-3 py-1'>휴대전화</label>
              <div className='flex mt-5'>
                <input
                  type='number'
                  name="confirmPw"
                  placeholder='휴대폰 번호'
                  className='p-2 font-thin focus:outline-none border-b-2 focus:border-slate-700 grow 
                  [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none'
                  onChange={e => setConfirmPwd(e.target.value)}
                />
                <button className='bg-slate-600 text-white text-sm w-24'>인증번호 받기</button>
              </div>

              <div className='flex mt-5'>
                <input
                  type='number'
                  name="confirmPw"
                  placeholder='인증번호를 입력하세요.'
                  className='p-2 font-thin focus:outline-none  border-b-2 focus:border-slate-700 grow appearance-none
                  [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none'
                  onChange={e => setConfirmPwd(e.target.value)}
                />
                <button className='bg-slate-600 text-white text-sm w-24'>인증</button>
              </div>
            </div>
          </div>
        </div>

        <button
          type='submit'
          className={`bg-slate-700 text-white p-2 mt-2 disabled:opacity-50`}
          disabled={isConfirm ? false : true}
        >
          회원가입</button>
      </form>

      <div className='bg-slate-50 w-96 p-3 shadow-md'>
        <div className='flex justify-between mt-2 px-3 py-2' >
          <span>계정이 있으신가요??</span>
          <Link to="/login">로그인</Link>
        </div>

      </div>
    </section>

  )
}

export default Register