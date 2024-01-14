import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { createNewCourse as createCourse } from "../../Redux/Slice/courseSlice";
import { HomeLayout } from "../../Layout";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";

function CreateCourse() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userInput, setUserInput] = useState({
        title: "",
        category: "",
        createdBy: "",
        description: "",
        thumbnail: null,
        previewImage: ""
    })

    function handleImageUpload(e){
        e.preventDefault();
        const uploadImage = e.target.files[0];
        if(uploadImage){
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadImage);
            fileReader.addEventListener("load", function(){
                setUserInput({
                    ...userInput,
                    previewImage: this.result,
                    thumbnail: uploadImage
                })
            })
        }
    }

    function handleUserInput(e){
         const {name, value} = e.target;
         setUserInput({
            ...userInput,
            [name]: value
         })
    }

    async function formSubmit(e){
        e.preventDefault();

        if(!userInput.title || !userInput.category || !userInput.createdBy || !userInput.description || !userInput.thumbnail || !userInput.previewImage){
            toast.error("All fields are required");
            return;
        }
        const formData = new FormData();
        formData.append("title",userInput.title);
        formData.append("category",userInput.category);
        formData.append("createdBy",userInput.createdBy);
        formData.append("description",userInput.description);
        formData.append("thumbnail",userInput.thumbnail);
        formData.append("previewImage", userInput.previewImage);

        const response = await dispatch(createCourse(formData));

        if(response?.payload?.success){
         setUserInput({
            title: "",
            category: "",
            createdBy: "",
            description: "",
            thumbnail: null,
        })
        navigate('/')
    }
    }
  return (
    <HomeLayout>
        {/* <div className="flex justify-center items-center h-[100vh]">
        <form noValidate  onClick={formSubmit} className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
            <Link className="absolute top-8 text-2xl link text-accent cursor-pointer">
            <AiOutlineArrowLeft/>
            </Link>
            <h1 className="text-2xl text-center font-bold">Create Course</h1>
           <input 
        //    onChange={getImage}
           className="hidden"
           type="file" 
           name="image_uploads"
           id="image_uploads"
           accept=".jpg,.jpeg,.png,.svg"/>

          <div className="flex flex-col gap-1">
            <label htmlFor="title" className="font-semibold">Title:</label>
            <input 
            type="text"
            placeholder="Enter title of your course "
            name="title"
            id="title"
            className="bg-transparent px-2 py-1 border rounded-md"
             onChange={handleUserInput}
            value={userInput.title}
            required />
           </div>
           <div className="flex flex-col gap-1">
            <label htmlFor="category" className="font-semibold">Category:</label>
            <input 
            type="text"
            placeholder="Enter Category of your course "
            name="category"
            id="category"
            className="bg-transparent px-2 py-1 border rounded-md"
            onChange={handleUserInput}
            value={userInput.category}
            required />
           </div>
           <div className="flex flex-col gap-1">
            <label htmlFor="createdBy" className="font-semibold">createdBy:</label>
            <input 
            type="text"
            placeholder="Faculty Name"
            name="createdBy"
            id="createdBy"
            className="bg-transparent px-2 py-1 border rounded-md"
            onChange={handleUserInput}
            value={userInput.createdBy}
            required />
           </div>
           <div className="flex flex-col gap-1">
            <label htmlFor="description" className="font-semibold">Description:</label>
            <input 
            type="text"
            placeholder="Tell About Something your course"
            name="description"
            id="description"
            className="bg-transparent px-2 py-1 border rounded-md"
            onChange={handleUserInput}
            value={userInput.description}
            required />
           </div>
           <div className="flex flex-col gap-1">
            <label htmlFor="thumbnail" className="font-semibold">Thumbnail:</label>
            <input 
            type="file"
            name="thumbnail"
            id="thumbnail"
            className="bg-transparent px-2 py-1 border rounded-md"
            onChange={handleImageUpload}
            value={userInput.thumbnail}
            required />
           </div>
         <button onClick={formSubmit} className="mt-2 bg-error rounded-md  hover:bg-red-300 transition-all ease-in-out duration-300 py-2 font-semibold text-lg cursor-pointer">Create Course</button>
           
        </form>
    </div> */}

<div className="flex items-center justify-center h-[100vh]">
                <form
                    onSubmit={formSubmit}
                    className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-[700px] my-10 shadow-[0_0_10px_black] relative"
                >
                    
                    <Link className="absolute top-8 text-2xl link text-accent cursor-pointer">
                        <AiOutlineArrowLeft />
                    </Link>

                    <h1 className="text-center text-2xl font-bold">
                        Create New Course
                    </h1>

                    <main className="grid grid-cols-2 gap-x-10">
                        <div className="gap-y-6">
                            <div>
                                <label htmlFor="image_uploads" className="cursor-pointer">
                                    {userInput.previewImage ? (
                                        <img 
                                            className="w-full h-44 m-auto border"
                                            src={userInput.previewImage}
                                        />
                                    ): (
                                        <div className="w-full h-44 m-auto flex items-center justify-center border">
                                            <h1 className="font-bold text-lg">Upload your course thumbnail</h1>
                                        </div>
                                    )}

                                </label>
                                <input 
                                    className="hidden"
                                    type="file"
                                    id="image_uploads"
                                    accept=".jpg, .jpeg, .png"
                                    name="image_uploads"
                                    onChange={handleImageUpload}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-lg font-semibold" htmlFor="title">
                                    Course title
                                </label>
                                <input
                                    required
                                    type="text"
                                    name="title"
                                    id="title"
                                    placeholder="Enter course title"
                                    className="bg-transparent px-2 py-1 border"
                                    value={userInput.title}
                                    onChange={handleUserInput}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <div className="flex flex-col gap-1">
                                <label className="text-lg font-semibold" htmlFor="createdBy">
                                    Course Instructor
                                </label>
                                <input
                                    required
                                    type="text"
                                    name="createdBy"
                                    id="createdBy"
                                    placeholder="Enter course instructor"
                                    className="bg-transparent px-2 py-1 border"
                                    value={userInput.createdBy}
                                    onChange={handleUserInput}
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-lg font-semibold" htmlFor="category">
                                    Course category
                                </label>
                                <input
                                    required
                                    type="text"
                                    name="category"
                                    id="category"
                                    placeholder="Enter course category"
                                    className="bg-transparent px-2 py-1 border"
                                    value={userInput.category}
                                    onChange={handleUserInput}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-lg font-semibold" htmlFor="description">
                                    Course description
                                </label>
                                <textarea
                                    required
                                    type="text"
                                    name="description"
                                    id="description"
                                    placeholder="Enter course description"
                                    className="bg-transparent px-2 py-1 h-24 overflow-y-scroll resize-none border"
                                    value={userInput.description}
                                    onChange={handleUserInput}
                                />
                            </div>
                        </div>
                    </main>

                    <button type="submit" className="w-full py-2 rounded-sm font-semibold text-lg cursor-pointer bg-error hover:bg-red-300 transition-all ease-in-out duration-300">
                        Create Course
                    </button>


                </form>
            </div>
    </HomeLayout>
  )
}

export default CreateCourse
