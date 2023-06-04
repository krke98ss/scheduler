import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";

import Login from "./pages/Login";
import RequireAuth from "./components/RequireAuth";
import Calender from "./components/calender/Calender";
import Navigation from "./components/Navigation";
import Memo from "./components/memos/Memo";
import Mypage from "./pages/Mypage";
import MemoDetail from "./components/memos/MemoDetail";
import MemoBody from "./components/memos/MemoBody";
import Register from "./pages/Register";
import Schedule from "./components/schedules/Schedule";
import LoginCallback from './components/callback/LoginCallback';

const CLIENT_ID =
  "944532919139-soltbsg53sj4dbv5ho4hju953u66sae1.apps.googleusercontent.com";

const Layout = () => {
  return (
    <div className='flex w-screen h-screen justify-center items-center '>
      <div
        className='max-w-md w-full flex flex-col items-center 
      md:max-w-xl
      lg:flex-row lg:max-w-2xl
      xl:max-w-3xl        
      2xl:max-w-4xl
      '
      >
        <Outlet />
        <Navigation />
      </div>
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route element={<RequireAuth />}>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Calender />} />
          <Route path='schedule' element={<Schedule />} />
          <Route path='memo' element={<Memo />}>
            <Route path='' element={<MemoBody />} />
            <Route path=':id' element={<MemoDetail />} />
          </Route>
          <Route path='mypage' element={<Mypage />} />
        </Route>
      </Route>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/redirect' element={<LoginCallback/>} />
    </Routes>
  );
}

export default App;
