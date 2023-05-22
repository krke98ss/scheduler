import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiCog8Tooth } from "react-icons/hi2";
import { AiFillEdit } from "react-icons/ai";
import { AiFillPicture} from "react-icons/ai";
import { IoTrashBin } from "react-icons/io5";
import { CiUndo } from "react-icons/ci";
import { editProfile, setProfileImg } from '../../redux/feature/user/action';




const Mypage = () => {
  const {nickname, id, profile_img, profile_msg} = useSelector((state) => state.user.info);
  const [write, setWrite] = useState(false);
  const [writeName, setWriteName] = useState(false);
  const [name, setname] = useState(nickname);
  const [msg, setMsg] = useState(profile_msg);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  
  const writeProfile = (func, data) => {
    
    dispatch(editProfile(data));
    func(false);
  }
  return (
    <>
    <div className='border min-w-[812px] shadow-md p-4 flex flex-col'>
      <div className='h-10 flex justify-end'>
        <button 
          className='p-2 w-10 h-10 text-white bg-slate-600 rounded-full shadow-xl'
          onClick={()=>setOpenModal(true)}
          >
          <HiCog8Tooth className='text-3xl animate-spin'/>
        </button>
      </div>
      <div className='header flex items-center justify-between gap-4'>
        <RenderImage />
        <div className='grow flex p-3 flex-col gap-5'>
          <div>
            {writeName 
            ? <input 
                type='text'
                className='border focus:outline-none p-1'
                value={name}
                onChange={(e)=> setname(e.target.value)}
                onBlur={()=>writeProfile(setWriteName, {nickname : name})}/>
            : <h2 className='text-indigo-800' onDoubleClick={()=> setWriteName(true)}>{nickname}</h2>}
            <p className='text-sm text-gray-400 ml-1' >({id})</p>
          </div>

          <div className='flex flex-col gap-3'>
            <div className='flex item-center gap-3'>
              <p className='border-2 rounded text-gray-500 font-bold border-violet-400 p-1 px-2'>
                Profile
              </p>
              <button 
                className='bg-slate-600 text-white p-2 rounded-md'
                onClick={()=> setWrite(!write)}>
                <AiFillEdit className='text-xl' />
              </button>
            </div>
            {write ? (
              <textarea 
                placeholder='프로필을 적어주세요.'
                className='border focus:outline-slate-400 h-20 resize-none p-2'
                onChange={(e) => setMsg(e.target.value)}
                value={msg}
                onBlur={() => writeProfile(setWrite, {profile_msg : msg})}
              >

              </textarea>
            ) : (
              <div onDoubleClick={()=>setWrite(true)}>
                {profile_msg ? profile_msg : "현재 작성된 프로필이 없습니다."}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='h-20'></div>
    </div>
    {openModal ? <Modal setOpenModal={setOpenModal}/> : ""}
    </>
  );
};

const RenderImage = () => {
  const [over, setOver] = useState(false);
  const userInfo = useSelector((state) => state.user.info);
  console.log(userInfo);
  const file = useRef();
  const [img, setImg] = useState(null);
  const dispatch = useDispatch();

  const handleBtnClick = () => {
    file.current.click();
  }
  const handleChange = (e) => {
    const img = file.current.files[0];
    dispatch(setProfileImg(img, userInfo.id));
    
  }

  
  return (
    <div
      className='bg-slate-300 h-44 w-44 flex justify-center items-center relative'
      onMouseOver={() => setOver(true)}
      onMouseLeave={() => setOver(false)}
    >
      {userInfo.profile_img 
        ? <img src={userInfo.profile_img}/> 
        :<div className='text-white font-bold'>No Image</div>
      }
      
      {over ? (
        <div className='absolute bottom-0 flex'>
          <div 
            className='w-10 h-10  flex justify-center items-center hover:bg-white'
            onClick={handleBtnClick}
            >
            <input type='file' className='hidden' ref={file} onChange={handleChange}/>
            <AiFillPicture className='text-2xl' />
            
          </div>
          <div className='w-10 h-10 bottom-0 flex justify-center items-center hover:bg-white'>
            <IoTrashBin className='text-2xl' />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Mypage;

const Modal = ({setOpenModal }) => {
  const modalRef = useRef();

  
  const closeModal = (e) => {
    if (modalRef.current && modalRef.current.contains(e.target)) {
      return;
    }

    setOpenModal(false);
  };
  

  return (
    <div
    className='w-screen h-screen absolute flex justify-center items-center z-[1200]'
    onClick={closeModal}
  >
    <div
      className='w-96 h-96 bg-white border shadow-md p-3 border-slate-400 flex flex-col gap-2'
      ref={modalRef}
    >
      <div className='h-10 flex items-center justify-between'>
        <span>사용자 설정</span>
        <button 
          className='px-2 hover:bg-gray-400 hover:text-white'
          onClick={() => setOpenModal(false)}
            >X</button>

        </div>
        <button
            className='w-36 text-sm bg-indigo-400 text-white p-3 flex justify-center gap-3'
          >
            <CiUndo className='text-xl' />
            <span>데이터 리셋</span>
          </button>
    </div>
    </div>
  )
}
