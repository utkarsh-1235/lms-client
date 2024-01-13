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

function App() {


  return (
    <>
    <Routes>
      <Route path="/" element={<Homepage/>}></Route>
      <Route path="/about" element={<AboutUs/>}></Route>
      <Route path="/courses" element={<CourseList/>}></Route>
      <Route path="/contact" element={<ContactUs/>}></Route>
      <Route path="/course/description" element={<CourseDescription/>}></Route>
      <Route path="/denied" element={<Denied/>}></Route>

      <Route path="/signup" element={<SignUp/>}></Route>
      <Route path="/login" element={<Login/>}></Route>

      <Route path="*" element={<NotFoundPage/>}></Route>
    </Routes>
    </>
  )
}

export default App
