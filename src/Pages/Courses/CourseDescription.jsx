import { useEffect } from "react";
import { useLocation } from "react-router-dom"
import { HomeLayout } from "../../Layout";
import { useSelector } from "react-redux";

function CourseDescription() {
    const {state} = useLocation();
    const {role, data} = useSelector((state)=>state?.auth)
    console.log(role,data);
    useEffect(()=>{

    },[])
  return (
    <HomeLayout>
    <div className="min-h-[90vh] pt-12 px-20 flex flex-col items-center justify-center text-white">
      <div className="grid grid-col-2 gap-10 py-10 relative">
        <div className="space-y-5">
            <img src={state?.thumbnail?.secure_url} alt="thumbnail" className="w-full h-64" />

            <div className="space-y-4">
                <div className="flex flex-col items-center justify-center text-xl">
                    <p className="font-semibold">
                        <span className="text-error font-bold">
                            Total Lectures: {""}
                        </span>
                        {state?.numberOfLectures}
                    </p>
                    <p className="font-semibold">
                        <span className="text-error font-bold">
                            Instructor: {""}
                        </span>
                        {state?.createdBy}
                    </p>
                </div>
                {role === "ADMIN" || data?.subscription?.status === "ACTIVE" ? (
                    <button className="bg-error text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-red-300 transition-all ease-in-out duration-300">
                     Watch Lectures
                    </button>
                ) :(
                    <button className="bg-error text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-red-300 transition-all ease-in-out duration-300">
                         Subscribe
                    </button>
                ) }
            </div>
        </div>

        <h1 className="text-3xl font-bold text-error mb-5 text-center">
            {state?.title}
        </h1>
        <p className="text-error">Course Description:</p>
        <p>{state?.description}</p>
      </div>
    </div>
    </HomeLayout>
  )
}

export default CourseDescription
