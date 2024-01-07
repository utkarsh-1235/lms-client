import React from 'react'
import { HomeLayout } from '../Layout'
import { Link } from 'react-router-dom'
import HomeImage from "../assets/Images/homePageMainImage.png"

function Homepage() {
  return (
    <HomeLayout>
        <div className="pt-top text-white flex items-center justify-center gap-10 mx-16 h-[90vh]">
            <div className="w-1/2 space-y-6">
                <h1 className="text-5xl font-bold">
                    Find Out Best
                    <span className="text-error font-bold">
                        Online Courses
                    </span>
                </h1>
                <p className="text-xl text-gray-200">
                    We have a large library of courses taught by highly skilled and qualified faculties at a very affordable cost.
                </p>
                <div className="space-x-6">
                    <Link to="/courses">
                        <button className="bg-error px-5 py-3 rounded-md font-bold text-lg cursor-pointer transition-all ease-in-out duration-300">
                            Explore Courses
                        </button>
                    </Link>

                    <Link to="/contact">
                        <button className="border border-error px-5 py-3 rounded-md font-bold text-lg cursor-pointer transition-all ease-in-out duration-300 hover:bg-error">
                            Contact Us
                        </button>
                    </Link>
                </div>
            </div>
            <div className="w-1/2 flex items-center justify-center">
                <img src={HomeImage} alt="Homepage image" />
            </div>
        </div>
    </HomeLayout>
  )
}

export default Homepage
