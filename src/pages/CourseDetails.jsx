import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";

const CourseDetails = () => {
  const { id } = useParams();

  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(course);

  useEffect(() => {
    setLoading(true);
    axios(`http://localhost:5000/courses/${id}`)
      .then((data) => setCourse(data.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div> Loading...</div>;
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
            <h1 className="text-3xl font-bold text-blue-500">{course.title}</h1>
            <div className="flex text-gray-600 items-center justify-between text-lg font-semibold">
              <p>
                Price:
                <span className="ml-2 text-green-500">${course.price}</span>
              </p>
              <p>
                {" "}
                Rating:
                <span className="ml-2 text-green-500">
                  ⭐ {course.duration}
                </span>
              </p>
            </div>
            <div className="lg:flex items-center justify-between text-gray-600 text-lg font-semibold">
              <p className="mb-2 lg:mb-0">
                <span>Featured:</span>
                <span className="ml-2 text-green-500">{course.isFeatured}</span>
              </p>
              <p>
                <span>Category: </span>
                <span className="bg-blue-500 text-white rounded-xl px-4">
                  {course.category}
                </span>
              </p>
            </div>
            <div className="border-t border-gray-200 my-4"></div>
            <p className="text-blue-500 leading-relaxed font-semibold">
              {course.description}
            </p>
            <div className="border-t border-gray-200 my-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
