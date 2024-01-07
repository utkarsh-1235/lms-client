import React from 'react'
import {FiMenu} from 'react-icons/fi'
import {AiFillCloseCircle} from 'react-icons/ai'
import { Link } from 'react-router-dom';
import { Footer } from '../Components';

function HomeLayout({children}) {
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
                <ul className="menu p-4 w-48 sm:w-80 bg-base-content text-base-content">
                    <li className="w-fit absolute right-2 z-50 text-white">
                        <button onClick={hideDrawer}>
                            <AiFillCloseCircle size={24}/>
                        </button>
                    </li>
                    <li className='text-white font-bold'>
                        <Link to="/"> Home </Link>
                    </li>
                    <li className='text-white font-bold'>
                        <Link to="/courses"> All Courses </Link>
                    </li>
                    <li className='text-white font-bold'>
                        <Link to="/contact"> Contact Us </Link>
                    </li>
                    <li className='text-white font-bold'>
                        <Link to="/about"> About Us </Link>
                    </li>
                </ul>
            </div>
        </div>
      
      {children}

      <Footer/>
    </div>
  )
}

export default HomeLayout
