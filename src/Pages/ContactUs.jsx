import { useState } from "react"
import { HomeLayout } from "../Layout"
import { isEmail } from "../Helpers/regexMatcher";
import axiosInstance from "../Helpers/axiosInstance";
import toast from "react-hot-toast";

function ContactUs() {
    const [userInput, setUserInput] = useState({
        name: "",
        email: "",
        message: ""
    })

    function handleUserInput(e){
        const{name, value} = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        })
    }    

    async function onFormSubmit(e){
            e.preventDefault();
        if(!userInput.name || !userInput.email || !userInput.message){
            toast.error("All fields are mandatory");
            return;
        }
        if(!isEmail(userInput.email)){
            toast.error("Invalid Email");
            return;
        }
        try{
            const response = axiosInstance.post("/contact", userInput);
            toast.promise(response, {
                loading: "Submitting your message...",
                success: "Form submitted successfully",
                error: "Failed to submit the form"
            });

            const contactResponse = await response;
            console.log(contactResponse);
            if(contactResponse?.data?.success){
                setUserInput({
                    name: "",
                    email: "",
                    message: ""
                })
            }
        }
        catch (err) {
            toast.error("operation failed....")
        }
    }
  return (
    <HomeLayout>
        <div className="flex items-center justify-center h-[100vh]">
        <form noValidate onSubmit={onFormSubmit} className="flex flex-col justify-center rounded-lg p-4 gap-3 text-white w-96 shadow-[0_0_10px_black]">
          <h1 className="text-2xl text-center font-bold"> Contact Form</h1>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold">Name</label>
            <input 
                            className="bg-transparent border px-2 py-1 rounded-sm"
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            onChange={handleUserInput}
                            value={userInput.name}
                        />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold">Email:</label>
            <input 
            type="email" 
            className="bg-transparent px-2 py-1 border rounded-md" 
            placeholder="Enter Your Email"
            name="email"
            id="email"
             onChange={handleUserInput}
             value={userInput.email}
            />
          </div>
          
          <div className="flex flex-col gap-1">
            <label htmlFor="message" className="font-semibold">Message</label>
            <textarea 
            type="password" 
            className="bg-transparent px-2 py-1 border rounded-md resize-none h-40" 
            placeholder="Enter Your Password"
            name="message"
            id="message"
            onChange={handleUserInput}
            value={userInput.message}
            />
          </div>
          <button  className="mt-2 bg-error rounded-md  hover:bg-red-300 transition-all ease-in-out duration-300 py-2 font-semibold text-lg cursor-pointer">Submit</button>
        
       </form>

        </div>
    </HomeLayout>
  )
}

export default ContactUs
