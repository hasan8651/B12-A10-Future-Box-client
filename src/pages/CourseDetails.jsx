import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import useToys from "../hooks/useToys";
import { useParams } from "react-router";
import { AuthContext } from "../context/AuthContext";
import NotFound from "./NotFound";

const ToyDetails = () => {
  const { id } = useParams();
  const { toys } = useToys();
  const { addToy } = useContext(AuthContext);
  const toy = toys.find((t) => t.toyId === Number(id));
  const [form, setForm] = useState({ name: "", email: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTryNow = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast.warn("Please fill in both name and email.");
      return;
    }
    addToy({ ...toy });
    toast.success(`Thank you for trying ${toy.toyName}. You can see this in My Toys!`);
  };

  if (!toy) return <NotFound />;

  const {
    pictureURL,
    toyName,
    rating,
    availableQuantity,
    price,
    description,
    sellerName,
    sellerEmail,
    subCategory,
  } = toy;

  return (
    <div className="bg-blue-50 min-h-screen py-10 px-4">
      <Helmet><title>ToyTopia - {toyName}</title></Helmet>

      <div className="max-w-5xl mx-auto bg-blue-50 shadow-xl rounded-lg overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 flex items-center justify-center p-6">
            <img
              src={pictureURL}
              alt={toyName}
              className="rounded-lg object-contain min-w-8/9 lg:min-w-full hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="lg:w-1/2 p-8 space-y-4">
            <h1 className="text-3xl font-bold text-blue-500">{toyName}</h1>

            <div className="flex text-gray-600 items-center justify-between text-lg font-semibold">
              <p>Price:
                <span className="ml-2 text-green-500">${price}</span>
              </p>
              <p> Rating:
                <span className="ml-2 text-green-500">⭐ {rating}</span>
              </p>
            </div>

            <div className="lg:flex items-center justify-between text-gray-600 text-lg font-semibold">
              <p className="mb-2 lg:mb-0">
                <span>In Stock:</span>
                <span className="ml-2 text-green-500">{availableQuantity}</span>
              </p>
              <p>
                <span>Category: </span>
                <span className="bg-blue-500 text-white rounded-xl px-4">{subCategory}</span>
              </p>
            </div>

            <div className="border-t border-gray-200 my-4"></div>

            <p className="text-blue-500 leading-relaxed font-semibold">{description}</p>

            <div className="border-t border-gray-200 my-4"></div>

            <div className="text-gray-600">
              <h3 className="font-semibold text-lg mb-1">Seller Information</h3>
              <p>
                <span className="font-semibold">Name:</span> {sellerName}
              </p>
              <p>
                <span className="font-semibold">Email: </span>
                <a className="text-blue-500 underline hover:text-blue-700">
                  {sellerEmail}
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="p-8 border-t mt-4 bg-blue-50">
          <h2 className="text-2xl font-semibold mb-4 text-center text-blue-500">
            Feel free to try this Toy
          </h2>

          <form onSubmit={handleTryNow} className="max-w-md mx-auto space-y-4 text-center">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="input input-bordered w-full"
              required
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="input input-bordered w-full"
              required
            />
            <button type="submit" className="btn bg-blue-500 hover:bg-blue-600 text-white w-full">
              Try Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ToyDetails;