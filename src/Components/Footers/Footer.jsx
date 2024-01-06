import { Link } from "react-router-dom";
import {BsFacebook, BsInstagram, BsLinkedin, BsTwitter} from "react-icons/bs"

function Footer() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
  return (
    <footer className="relative left-0 bottom-0 h-[10vh] flex flex-col sm:flex-row items-center justify-between text-white bg-gray-800 py-5 sm:px-20">
        <section className="text-lg">
             Copyright {year} || All rights reserved
        </section>
        <section className="flex items-center justify-center gap-5 text-2xl text-white">
            <Link className="hover:text-yellow-500 transition-all ease-in-out duration-3000" to="/">
               <BsFacebook/>
            </Link>
            <Link className="hover:text-yellow-500 transition-all ease-in-out duration-3000" to="/">
               <BsInstagram/>
            </Link>
            <Link className="hover:text-yellow-500 transition-all ease-in-out duration-3000" to="/">
               <BsLinkedin/>
            </Link>
            <Link className="hover:text-yellow-500 transition-all ease-in-out duration-3000" to="/">
               <BsTwitter/>
            </Link>
        </section>
  
    </footer>
  )
}

export default Footer
