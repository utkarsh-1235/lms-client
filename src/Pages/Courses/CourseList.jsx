import { useDispatch, useSelector } from "react-redux"
import { getAllCourses } from "../../Redux/Slice/courseSlice";
import { useEffect } from "react";
import { HomeLayout } from "../../Layout";
import CourseCard from "../../Components/CourseCard";

function CourseList() {
    const dispatch = useDispatch();
    const {courseData} = useSelector(state => state.course);
    console.log(courseData);

    async function loadCourses(){
        await dispatch(getAllCourses());
    }

    useEffect(()=>{
        loadCourses();
    },[])
  return (
    <HomeLayout>
        <div className="min-h-[90vh] pt-12 pl-20 flex flex-col gap-10 text-white">
            <h1 className="text-center font-bold text-2xl">
                Explore Courses made by
                <span className="text-error font-bold">
                    Industry experts
                </span>
            </h1>
                <div className="flex mb-10 flex-wrap gap-14">
                   {courseData?.map((element)=>{
                    return <CourseCard key={element._id} data={element}/>
                   })}
                </div>
        </div>
    </HomeLayout>
  )
}

export default CourseList
