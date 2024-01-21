import { useSelector } from "react-redux"
import { HomeLayout } from "../../Layout"
import { Link } from "react-router-dom";

function Profile() {
    const userData = useSelector((state)=>state?.auth?.data);
  return (
    <HomeLayout>
         <div className="h-[90vh] flex items-center justify-center">
             <div className="my-10 flex flex-col gap-4 rounded-lg p-4 text-white w-100 shadow-[0_0_10px_black]">
                <img src={userData?.avatar?.secure_url} 
                     className="w-40 m-auto rounded-full border border-black"
                     alt= "user profile photo" />
                    
                <h3 className="text-xl font-semibold text-center capitalize">
                    {userData?.fullName}</h3>    

                 <div className="grid grid-cols-2">
                    <p className="font-bold">Email:</p><p className="font-bold">{userData?.email}</p>
                    <p className="font-bold">Role: </p><p className="font-bold">{userData?.role}</p>
                        <p className="font-bold">Subscription: </p>
                        <p className="font-bold">{userData?.subscription?.status === "active" ? "Active" : "Inactive"}</p>
                </div>
                <div className="flex items-center justify-center gap-2">
                    <Link 
                    to="/"
                    className="w-1/2 bg-error hover:bg-red-300 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center">Change Password</Link>
                    <Link 
                    to="/user/edit-profile"
                    className="w-1/2 bg-error hover:bg-red-300 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center">Edit Profile</Link>
                </div>
                {userData?.subscription?.status === "Active" && (<button className="w-full bg-red-600 hover:bg-red-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center">Cancel Subscription</button>)}
            </div> 
         </div>
    </HomeLayout>
  )
}

export default Profile
