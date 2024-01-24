import { Route, Routes } from "react-router-dom"
import Homepage from "./Pages/Homepage"
import AboutUs from "./Pages/AboutUs"
import NotFoundPage from "./Pages/NotFoundPage"
import SignUp from "./Pages/SignUp"
import Login from "./Pages/Login"
import CourseList from "./Pages/Courses/CourseList"
import ContactUs from "./Pages/ContactUs"
import Denied from "./Pages/Denied"
import CourseDescription from "./Pages/Courses/CourseDescription"
import RequireAuth from "./Components/Auth/RequireAuth"
import CreateCourse from "./Pages/Courses/CreateCourse"
import Profile from "./Pages/User/Profile"
// import EditProfile from "./Pages/User/EditProfile"

function App() {


  return (
    <>
    <Routes>
      <Route path="/" element={<Homepage/>}></Route>
      <Route path="/about" element={<AboutUs/>}></Route>
      <Route path="/course/get" element={<CourseList/>}></Route>
      <Route path="/contact" element={<ContactUs/>}></Route>
      <Route path="/course/description" element={<CourseDescription/>}></Route>
      <Route path="/denied" element={<Denied/>}></Route>

      <Route path="/signup" element={<SignUp/>}></Route>
      <Route path="/login" element={<Login/>}></Route>

      <Route element={<RequireAuth allowedRoles={["ADMIN"]}/>}>
         <Route path="/course/create" element={<CreateCourse/>}></Route>
      </Route>

      <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]}/>}>
             <Route path="/user/profile" element={<Profile/>}></Route>
             {/* <Route path="/user/edit-profile" element={<EditProfile/>}></Route> */}
      </Route>
      <Route path="*" element={<NotFoundPage/>}></Route>
    </Routes>
    </>
  )
}

export default App
