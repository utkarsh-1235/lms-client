import { Link, useNavigate } from "react-router-dom"
import { HomeLayout } from "../Layout"
import { useState } from "react"
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { authenticate } from "../Redux/Slice/authSlice";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginData, setLoginData] = useState({
        email:"",
        password:""
    });

function handleUserInput(e){
  const {name, value}  = e.target;
  setLoginData({
    ...loginData,
    [name]: value
  })
}

async function loginAccount(event){
    event.preventDefault();

    if(!loginData.email || !loginData.password) {
        toast.error("Please fill all the details");
        return;
    }


    const response = await dispatch(authenticate(loginData));

    if(response?.payload?.success){
             navigate('/');
    }
    setLoginData({
        email: "",
        password: ""
    })
}
  return (
    <HomeLayout>
    <div className="flex items-center justify-center h-screen">
       <form noValidate onClick={loginAccount} className="flex flex-col justify-center rounded-lg p-4 gap-3 text-white w-96 shadow-[0_0_10px_black]">
          <h1 className="text-2xl text-center font-bold"> Login Page</h1>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold">Email:</label>
            <input 
            type="email" 
            className="bg-transparent px-2 py-1 border rounded-md" 
            placeholder="Enter Your Email"
            name="email"
            id="email"
            onChange={handleUserInput}
            value={loginData.email}
            required/>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold">Password:</label>
            <input 
            type="password" 
            className="bg-transparent px-2 py-1 border rounded-md" 
            placeholder="Enter Your Password"
            name="password"
            id="password"
            onChange={handleUserInput}
            value={loginData.password}
            required/>
          </div>
          <button onClick={loginAccount} className="mt-2 bg-error rounded-md  hover:bg-red-300 transition-all ease-in-out duration-300 py-2 font-semibold text-lg cursor-pointer">Login</button>
           
           <p className="text-center">
            Don't have an account ? <Link to='/signup' className="link text-accent cursor-pointer">Signup</Link>
           </p>
       </form>
    </div>
    </HomeLayout>
  )
}

export default Login
