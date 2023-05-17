

import { Route, Routes } from 'react-router-dom';
import './App.css';

import Login from './pages/Login';
import RequireAuth from './components/RequireAuth';
import Calender from './components/Calender';
import Menus from './components/Menus';


const Layout = () => {
  return (
    <div className='flex w-screen h-screen justify-center items-center'>
      <Calender/>
      <Menus/>
    </div>
  )
}

function App() {
  
  return (
    <Routes>
      <Route element={<RequireAuth />}>
        <Route path='/' element={<Layout/>}/>
      </Route>
      <Route path="/login" element={<Login/>}/>

  </Routes>
  );
}

export default App;
