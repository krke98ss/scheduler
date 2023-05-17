import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';


const RequireAuth = () => {
  const login = useSelector((state) => {
    return state.user.isLogin;
  });
  const location = useLocation();

  return (
    login
    ? <Outlet/>
    : <Navigate to="login" state={{ from: location }} replace />
  )
}

export default RequireAuth