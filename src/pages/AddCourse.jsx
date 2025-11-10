import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";

const AddCourse = () => {
  const { user } = useContext(AuthContext);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFeatured, setSelectedFeatured] = useState(true);

  const handleAddCourse = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const imageURL = form.imageURL.value;
    const price = form.price.valueAsNumber;
    const duration = form.duration.value;
    const description = form.description.value;
    const email = form.email.value;
    const displayName = form.displayName.value;

    const newCourse = {
      title,
      imageURL,
      price,
      duration,
      category: selectedCategory,
      description,
      isFeatured: selectedFeatured,
      email,
      displayName,
    };

    axios
      .post("http://localhost:5000/courses", newCourse, {
        headers: { "Content-Type": "application/json" },
      })
      .then(({ data }) => {
        if (data?.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Course Added Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Failed to Add Course",
          text: error.response?.data?.message || error.message,
        });
      });
  };

  return (
    <div className="flex mt-24 justify-center items-center min-h-screen bg-primary py-12">
      <div className=" shadow-lg rounded-xl p-8 max-w-2xl w-full space-y-6">
        <h1 className="text-3xl font-bold text-center  mb-4">
          Add Your Course
        </h1>
        <p className="text-gray-600 text-sm text-center mb-6">
          Add a clear, complete course profile so students choose the right
          path!
        </p>
        <form onSubmit={handleAddCourse} className="space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">
                Course Title/Name
              </span>
            </label>
            <input
              name="title"
              type="text"
              placeholder="Enter course title"
              className="input input-bordered w-full px-4 py-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">
                Course Cover Image/Thumbnail (URL)
              </span>
            </label>
            <input
              name="imageURL"
              type="text"
              placeholder="Enter cover image URL"
              className="input input-bordered w-full px-4 py-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Price ($)</span>
            </label>
            <input
              name="price"
              type="number"
              placeholder="Enter course price ($)"
              className="input input-bordered w-full px-4 py-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">
                Duration (1-24 Hour)
              </span>
            </label>
            <input
              name="duration"
              type="number"
              placeholder="Enter course price ($)"
              className="input input-bordered w-full px-4 py-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="1"
              max="24"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Category</span>
            </label>
            <select
              name="category"
              className="select select-bordered w-full px-4 py-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="Web Development">Web Development</option>
              <option value="Mobile Development">Mobile Development</option>
              <option value="Web Design">Web Design</option>
              <option value="Security">Security</option>
              <option value="Backend Development">Backend Development</option>
              <option value="Cloud & DevOps">Cloud & DevOps</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Featured Course</span>
            </label>
            <select
              name="featured"
              className="select select-bordered w-full px-4 py-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedCategory}
              onChange={(e) => setSelectedFeatured(e.target.value)}
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">
                Course Description
              </span>
            </label>
            <textarea
              name="description"
              placeholder="Write a detailed description about your course"
              className="textarea textarea-bordered w-full px-4 py-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">User Email</span>
            </label>
            <input
              name="email"
              type="email"
              value={user?.email || ""}
              readOnly
              className="input input-bordered w-full px-4 py-3 rounded-md shadow-md  cursor-not-allowed"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">User Name</span>
            </label>
            <input
              name="displayName"
              type="text"
              value={user?.displayName || ""}
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

export default AddCourse;
