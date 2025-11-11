import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import LoadingSpinner from "../components/LoadingSpinner";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const CourseDetails = () => {
const { id } = useParams();
 const { user } = useContext(AuthContext);
const [course, setCourse] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {

  setLoading(true);
    axios.get(`https://study-pilot-server-three.vercel.app/courses/${id}`)
.then(({ data }) => {
  setCourse(data)

            })
.catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, [id]);



const handleEnrolled=()=>{

    const enrolledtCourse = {
      courseId: course?._id,
      title: course?.title,
      imageURL: course?.imageURL,
      price: course?.price,
      duration: course?.duration,
      category: course?.category,
      email: user?.email,
          };

    
 console.log(enrolledtCourse)

axios.post("https://study-pilot-server-three.vercel.app/my-enrolled", enrolledtCourse, {
        headers: { "Content-Type": "application/json" },
      })
      .then(({ data }) => {
        if (data?.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            background: "linear-gradient(to right, #093371, #6E11B0, #093371)",
            color: "white",
            title: "Course Enrolled Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Failed to Enroll Course",
          text: error.response?.data?.message || error.message,
        });
      });
  };







  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <div className=" min-h-screen py-10 px-4">
      <Helmet>
        <title>Study Pilot - {course.title}</title>
      </Helmet>
      <div className="max-w-5xl mx-auto shadow-xl rounded-lg overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 flex items-center justify-center p-6">
            <img
              src={course.imageURL}
              alt={course.title}
              className="rounded-lg object-contain min-w-8/9 lg:min-w-full hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="lg:w-1/2 p-8 space-y-4">
            <h1 className="text-3xl font-bold text-purple-600">
              {course.title}
            </h1>
            
            <div className="flex items-center justify-between  text-lg font-semibold">
       
                <span>Featured: </span>
                <span className="text-green-500">
                 {course.isFeatured?"yes":"No"}
                  </span>
             
              <p>
                <span>Category: </span>
                <span className="text-green-500">
                  {course.category}
                </span>
              </p>
            </div>
            <div className="border-t border-purple-600 my-4"></div>
            <p className="text-purple-600 leading-relaxed font-semibold">
              {course.description}
            </p>
            <div className="border-t border-purple-600 my-4"></div>
            <div className="flex items-center justify-between text-lg font-semibold">
             
              <p>
                {" "}
                Duration:
                <span className="ml-2 text-green-500">
                 {course.duration}
                </span>
              </p>
               <p>
                Price:
                <span className="ml-2 text-green-500">${course.price}</span>
              </p>
{
  user?.email && 
  <button onClick={ handleEnrolled} className="btn btn-primary md:w-40">Enroll Now</button>
}
</div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
