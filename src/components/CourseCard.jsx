import { Link } from "react-router";

const CourseCard = ({ course }) => {
  const { _id, title, imageURL, price, duration, category } = course;

  return (
    <div data-aos="fade-up">
      <div key={_id} className="card rounded-xl md:rounded-lg p-4 shadow-lg">
        <figure>
          <img
            className="w-full rounded-xl md:rounded-lg"
            src={imageURL}
            alt={title}
          />
        </figure>
        <div>
          <h2 className="card-title text-lg my-2 ml-2 text-blue-500 min-h-14">
            {title}
          </h2>
          <span className="flex px-1 justify-between text-gray-700 text-xl font-semibold">
            <p className="px-2">${price}</p>
            <p className="px-2">Dur: {duration}</p>
          </span>
          <p className="text-md my-2 font-semibold text-center text-blue-500">
            Category: <span className="text-green-600"> {category}</span>
          </p>
        </div>
        <Link to={`/courses/${_id}`} className="btn btn-primary ">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
