import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Swal from "sweetalert2";

const UpdateCourse = () => {
  const { id } = useParams();
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFeatured, setSelectedFeatured] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/courses/${id}`)
      .then(({ data }) => {
        setCourse(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    setSelectedCategory(course?.category || "");
    setSelectedFeatured(course?.isFeatured || "");
  }, [course]);

  const handleUpdateCourse = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const imageURL = form.imageURL.value;
    const price = form.price.valueAsNumber;
    const duration = form.duration.value;
    const description = form.description.value;
    const email = course.email;
    const updatedCourse = {
      title,
      imageURL,
      price,
      duration,
      category: selectedCategory,
      description,
      isFeatured: selectedFeatured,
      email,
    };

    axios
      .put(`http://localhost:5000/courses/${course._id}`, updatedCourse, {
        headers: { "Content-Type": "application/json" },
      })
      .then(({ data }) => {
        if (data?.modifiedCount > 0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            background: "linear-gradient(to right, #093371, #6E11B0, #093371)",
            color: "white",
            title: "Successfully updated course",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => {
        Swal.fire("Error", err.response?.data?.message || err.message, "error");
      });
  };

  return (
    <div className="flex justify-center items-center py-2">
      <div className="shadow-lg rounded-xl p-8 max-w-2xl w-full space-y-6">
        <h1 className="text-3xl font-bold text-center text-purple-600 mb-2">
          Update Your Course
        </h1>
        <p className="text-sm text-center mb-4">
          Update course profile so students choose the right path!
        </p>
        <form onSubmit={handleUpdateCourse} className="space-y-4">
          <div className="form-control">
            <label>
              <span className="label-text font-semibold">
                Course Title/Name
              </span>
            </label>
            <input
              defaultValue={course.title}
              name="title"
              type="text"
              placeholder="Enter course title"
              className="input input-bordered w-full px-4 py-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="form-control">
            <label>
              <span className="label-text font-semibold">
                Course Cover Image/Thumbnail (URL)
              </span>
            </label>
            <input
              defaultValue={course.imageURL}
              name="imageURL"
              type="text"
              placeholder="Enter cover image URL"
              className="input input-bordered w-full px-4 py-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <img className="w-50" src={course.imageURL} alt="" />
          </div>

          <div className="form-control">
            <label>
              <span className="label-text font-semibold">Price ($)</span>
            </label>
            <input
              defaultValue={course.price}
              name="price"
              type="number"
              placeholder="Enter course price ($)"
              className="input input-bordered w-full px-4 py-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="form-control">
            <label>
              <span className="label-text font-semibold">
                Duration (1-24 Hour)
              </span>
            </label>
            <input
              defaultValue={course.duration}
              name="duration"
              type="number"
              placeholder="Enter course price ($)"
              className="input input-bordered w-full px-4 py-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
              min="1"
              max="24"
            />
          </div>

          <div className="form-control">
            <label>
              <span className="label-text font-semibold">Category</span>
            </label>
            <select
              value={selectedCategory}
              name="category"
              className="select select-bordered w-full px-4 py-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="Web Development">Web Development</option>
              <option value="Mobile Development">Mobile Development</option>
              <option value="Web Design">Web Design</option>
              <option value="Security">Security</option>
              <option value="Backend Development">Backend Development</option>
              <option value="Cloud & DevOps">Cloud & DevOps</option>
            </select>
          </div>

          <div className="form-control">
            <label>
              <span className="label-text font-semibold">Featured Course</span>
            </label>
            <select
              value={selectedFeatured}
              name="featured"
              className="select select-bordered w-full px-4 py-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
              onChange={(e) => setSelectedFeatured(e.target.value)}
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>

          <div className="form-control">
            <label>
              <span className="label-text font-semibold">
                Course Description
              </span>
            </label>
            <textarea
              defaultValue={course.description}
              name="description"
              placeholder="Write a detailed description about your course"
              className="textarea textarea-bordered w-full px-4 py-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="form-control">
            <label>
              <span className="label-text font-semibold">User Email</span>
            </label>
            <input
              name="email"
              type="email"
              defaultValue={course.email}
              readOnly
              className="input input-bordered w-full px-4 py-3 rounded-md shadow-md  cursor-not-allowed"
            />
          </div>

          <div className="form-control">
            <label>
              <span className="label-text font-semibold">User Name</span>
            </label>
            <input
              name="displayName"
              type="text"
              defaultValue={course.displayName}
              readOnly
              className="input input-bordered w-full px-4 py-3 rounded-md shadow-md  cursor-not-allowed"
            />
          </div>

          <div className="form-control">
            <button className="btn btn-primary w-full py-3 font-semibold transform transition-all hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500">
              Submit Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCourse;
