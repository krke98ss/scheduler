import { useState } from "react";
import {Outlet } from "react-router-dom";
import Header from "./Header";
import RenderWrite from "./RenderWrite";
import Footer from "./Footer";

const Memo = () => {
  const [isWrite, setIsWrite] = useState(false);

  return (
    <div className='border w-full shadow-md text-xs  
    lg:text-sm
    
    '>
      <Header />
      {isWrite ? (
        <RenderWrite setIsWrite={setIsWrite} />
      ) : (
        <Outlet context={{ isWrite, setIsWrite }} />
      )}
      <Footer />
    </div>
  );
};

export default Memo;
