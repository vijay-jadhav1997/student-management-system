import { Link } from "react-router-dom";
import notFound from "/not-found.svg";

const NotFound = ()=> {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-violet-950 text-white px-4 py-20">
      {/* Icon */}
      <div className=" p-6 animate-pulse">
        <img className="w-[500px] rounded-md bg-white" src={notFound} alt="not found" />
      </div>

      {/* Heading */}
      {/* <h1 className="mt-6 text-7xl font-extrabold text-gray-200 drop-shadow-sm">
        404
      </h1> */}

      {/* Subtitle */}
      <p className="mt-3 text-2xl text-gray-300 text-center max-w-md">
        <span className="text-4xl font-semibold text-white ">Oops! 🤔</span> The page you’re looking for doesn’t exist or has been moved.
      </p>

      {/* Action Button */}
      <Link
        to="/"
        className="mt-8 px-8 py-3 text-lg rounded-xl bg-blue-600 text-white font-semibold shadow-md hover:shadow-lg hover:bg-blue-700 transition-all duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
}

export default NotFound