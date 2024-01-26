import { useForm } from "react-hook-form"
import { HomeLayout } from "../Layout"
import { useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast"
import { useDispatch } from "react-redux";
import { createAccount } from "../Redux/Slice/authSlice";
import { isEmail, isValidPassword } from "../Helpers/regexMatcher";

function SignUp() {
    const {register, handleSubmit} = useForm();
    const [previewImage, setPreviewImage] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [signupData, setSignupData] = useState({
        fullName:"",
        email: "",
        role:"",
        password: "",
        avatar: ""
    })

    function handleUserInput(e){
        const {name, value} = e.target;
        setSignupData({
            ...signupData,
            [name]: value
        })
    }

    function getImage(event){
         event.preventDefault();
         //getting the image
         const uploadImage = event.target.files[0];

         if(uploadImage){
            setSignupData({
                ...signupData,
                avatar: uploadImage
            });

            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadImage);
            fileReader.addEventListener("load",function(){
                console.log(this.result);
                setPreviewImage(this.result)
            })
         }
    }

    async function createNewAccount(event){
           event.preventDefault()
           if(!signupData.email || !signupData.password || !signupData.fullName){
                toast.error("Please Enter All the Fields")
                return
           }

           //checking name field length
           if(signupData.fullName.length < 5){
             toast.error("Name should be atleast 5 characters")
             return
           }

           //matching email
           if(!isEmail(signupData.email)){
            toast.error("Invalid email")
            return
           }

           // checking password validation
        if(!isValidPassword(signupData.password)) {
            toast.error("Password should be 6 - 16 character long with atleast a number and special character");
            return;
        }

         const formData = new FormData();
         formData.append("fullName", signupData.fullName);
         formData.append("email", signupData.email);
         formData.append("role", signupData.role);
         formData.append("password", signupData.password);
         formData.append("avatar", signupData.avatar);

         console.log(formData);
        // dispatch create account action
        const response = await dispatch(createAccount(formData));
        if(response?.payload?.success)
            navigate("/");

        setSignupData({
            fullName: "",
            email: "",
            role:"",
            password: "",
            avatar: ""
        });
        setPreviewImage("");
    }
  return (
   <HomeLayout>
    <div className="flex justify-center items-center h-[100vh]">
        <form noValidate onSubmit={createNewAccount} className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
            <h1 className="text-2xl text-center font-bold">Registration Page</h1>
            <label htmlFor="image_uploads" className="cursor-pointer">
                {previewImage ? (
                    <img className="w-24 h-24 rounded-full m-auto" src={previewImage}/>
                ):(
                    <BsPersonCircle className="h-24 w-24 rounded-full m-auto"/>
                )}
            </label>
           <input 
           onChange={getImage}
           className="hidden"
           type="file" 
           name="image_uploads"
           id="image_uploads"
           accept=".jpg,.jpeg,.png,.svg"/>

          <div className="flex flex-col gap-1">
            <label htmlFor="fullName" className="font-semibold">FullName:</label>
            <input 
            type="text"
            placeholder="Enter your full name "
            name="fullName"
            id="fullname"
            className="bg-transparent px-2 py-1 border rounded-md"
            onChange={handleUserInput}
            value={signupData.fullName}
            required />
           </div>
           <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold">Email:</label>
            <input 
            type="email"
            placeholder="Enter your email "
            name="email"
            id="email"
            className="bg-transparent px-2 py-1 border rounded-md"
            onChange={handleUserInput}
            value={signupData.email}
            required />
           </div>
           <div className="flex flex-col gap-1">
            <label htmlFor="role" className="font-semibold">Role:</label>
            <select
             name="role"
             id="role"
             className="bg-transparent px-2 py-1 border rounded-md"
             onChange={handleUserInput}
             value={signupData.role}
             required
             >
            <option value="" disabled>Select your role</option>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>

  {/* Add more options as needed */}
</select>
           </div>
           <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-semibold">Password:</label>
            <input 
            type="password"
            placeholder="Create password "
            name="password"
            id="password"
            className="bg-transparent px-2 py-1 border rounded-md"
            onChange={handleUserInput}
            value={signupData.password}
            required />
           </div>
           <button onClick={createNewAccount} className="mt-2 bg-error rounded-md  hover:bg-red-300 transition-all ease-in-out duration-300 py-2 font-semibold text-lg cursor-pointer">Create Account</button>
           
           <p className="text-center">
            Already have an account ? <Link to='/login' className="link text-accent cursor-pointer">Login</Link>
           </p>
        </form>
    </div>
   </HomeLayout>
  )
}

export default SignUp
