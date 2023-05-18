

import { Outlet, Route, Routes } from 'react-router-dom';
import './App.css';

import Login from './pages/Login';
import RequireAuth from './components/RequireAuth';
import Calender from './components/Calender';
import Menus from './components/Menus';
import Memo from './components/Memo';
import Mypage from './pages/Mypage';
import MemoDetail from './components/MemoDetail';
import MemoBody from './components/MemoBody';


const Layout = () => {
  return (
    <div className='flex w-screen h-screen justify-center items-center'>
      <Outlet/>
      <Menus/>
    </div>
  )
}

function App() {
  
  return (
    <Routes>
      <Route element={<RequireAuth />}>
        <Route path='/' element={<Layout/>}>
          <Route path='calendar' element={<Calender/>}/>
          <Route path='memo' element={<Memo/>}>
            <Route path='' element={<MemoBody/>}/>
            <Route path=':id' element={<MemoDetail/>}/>
          </Route>
          <Route path='mypage' element={<Mypage/>}/>
        </Route>
      </Route>
      <Route path="/login" element={<Login/>}/>

  </Routes>
  );
}

export default App;
