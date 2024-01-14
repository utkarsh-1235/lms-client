import React from 'react'
import {FiMenu} from 'react-icons/fi'
import {AiFillCloseCircle} from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom';
import { Footer } from '../Components';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Redux/Slice/authSlice';

function HomeLayout({children}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
      console.log(isLoggedIn);

    
    const role = useSelector((state)=>state?.auth?.role)

    function changeWidth(){
         const drawerSide = document.getElementsByClassName('drawer-side');
         drawerSide[0].style.width = 'auto';
    }

     function hideDrawer(){
        const element = document.getElementsByClassName('drawer-toggle')
        element[0].checked = false;

        const drawerSide = document.getElementsByClassName('drawer-side');
         drawerSide[0].style.width = 0;
     }

     async function handleLogout(e){
        e.preventDefault();

       const res = await dispatch(logout());
       if(res?.payload?.success)
        navigate('/')
     }
  return (
    <div className='min-h-[90vh] bg-base-content'>
        <div className="drawer absolute left-0 z-50 w-fit ">
            <input type="checkbox" id="my-drawer" className="drawer-toggle" />
            <div className="drawer-content">
                <label htmlFor="my-drawer" className="cursor-pointer relative">
                      <FiMenu
                      className="font-bold text-white m-4"
                      size={"32px"}
                      onClick={changeWidth}/>      
                </label>
            </div>
            <div className="drawer-side w-0">
                <label htmlFor="my-drawer" className="drawer-overlay">

                </label>
                <ul className="menu p-4 w-48 h-[100%] sm:w-80  text-base-content">
                    <li className="w-fit absolute right-2 z-50 text-white">
                        <button onClick={hideDrawer}>
                            <AiFillCloseCircle size={24}/>
                        </button>
                    </li>
                    <li className='text-white font-bold mt-10 hover:text-error'>
                        <Link to="/"> Home </Link>
                    </li>
                    {
                        isLoggedIn && role==="ADMIN" &&(
                            <li className='text-white font-bold hover:text-error'>
                                 <Link to="/admin/dashboard">Admin Dashboard</Link>
                            </li>
                        )
                    }
                    <li className='text-white font-bold hover:text-error'>
                        <Link to="/courses"> All Courses </Link>
                    </li>
                    <li className='text-white font-bold hover:text-error'>
                        <Link to="/contact"> Contact Us </Link>
                    </li>
                    <li className='text-white font-bold hover:text-error'>
                        <Link to="/about"> About Us </Link>
                    </li>

                    {!isLoggedIn && (
                        <li className="absolute bottom-0 w-[70%]">
                        <div className="w-full flex items-center justify-center gap-4">
                            <button className="btn-primary px-4 py-1 font-bold rounded-md w-full bg-error">
                                <Link to="/login">Login</Link>
                            </button>
                            <button className="btn-secondary px-4 py-1 font-bold rounded-md w-full bg-error">
                                <Link to="/signup">Sign Up</Link>
                            </button>
                        </div>
                        </li>
                    )}

         {isLoggedIn && (
                        <li className="absolute bottom-4 w-[70%]">
                        <div className="w-full flex items-center justify-center gap-4">
                            <button className="btn-primary px-4 py-1 font-bold rounded-md w-full bg-error">
                                <Link to="/user/profile">Profile</Link>
                            </button>
                            <button className="btn-secondary px-4 py-1 font-bold rounded-md w-full bg-error">
                                <Link  onClick={handleLogout}>Logout</Link>
                            </button>
                        </div>
                        </li>
                    )}
                </ul>
            </div>
        </div>
      
      {children}

      <Footer/>
    </div>
  )
}

export default HomeLayout
