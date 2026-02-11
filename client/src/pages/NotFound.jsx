import { Link } from "react-router-dom";
import { Scissors } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#0B0E14] flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-xl bg-[rgba(124,124,255,0.12)] flex items-center justify-center">
            <Scissors className="h-7 w-7 text-[#7C7CFF]" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl font-medium text-gray-100 mb-3 tracking-wide">
          404
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-gray-300 mb-2">
          Page not found
        </p>

        {/* Description */}
        <p className="text-sm text-gray-400 mb-8 leading-relaxed">
          The page you’re looking for doesn’t exist or may have been moved.
        </p>

        {/* Action */}
        <Link to="/">
          <button
            className="
              inline-flex items-center justify-center
              px-6 py-3 rounded-lg
              bg-[#7C7CFF] text-white
              font-medium
              hover:bg-[#6A6AF5]
              transition-colors
              cursor-pointer
              cursor-target
            "
          >
            Go back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
