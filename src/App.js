

import { Outlet, Route, Routes } from 'react-router-dom';
import './App.css';

import Login from './pages/Login';
import RequireAuth from './components/RequireAuth';
import Calender from './components/calender/Calender';
import Navigation from './components/Navigation';
import Memo from './components/memos/Memo';
import Mypage from './pages/Mypage';
import MemoDetail from './components/memos/MemoDetail';
import MemoBody from './components/memos/MemoBody';
import Schedule from './components/Schedule';
import Home from './pages/Home';
import Register from './pages/Register';


const Layout = () => {
  return (
    <div className='flex w-screen h-screen justify-center items-center'>
      <Outlet/>
      <Navigation/>
    </div>
  )
}

function App() {
  
  return (
    <Routes>
      <Route element={<RequireAuth />}>
        <Route path='/' element={<Layout/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='calendar' element={<Calender/>}/>
          <Route path='schedule' element={<Schedule/>}/>
          <Route path='memo' element={<Memo/>}>
            <Route path='' element={<MemoBody/>}/>
            <Route path=':id' element={<MemoDetail/>}/>
          </Route>
          <Route path='mypage' element={<Mypage/>}/>
        </Route>
      </Route>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>

  </Routes>
  );
}

export default App;
