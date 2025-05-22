import React from "react";
import { FaRegClock } from "react-icons/fa";

interface PromotionCardProps {
  image: string;
  title: string;
  description: string;
  tag: string;
  time: string;
  signupLink: string;
  detailsLink: string;
}

const PromotionCard: React.FC<PromotionCardProps> = ({
  image,
  title,
  description,
  tag,
  time,
  signupLink,
  detailsLink,
}) => {
  return (
    <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-gray-700 hover:shadow-yellow-400/40 transition-shadow duration-300 group promotion-fade-in-up">
      {/*
        Add this to your global CSS if not using Tailwind's arbitrary keyframes:
        @keyframes promotion-fade-in-up {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .promotion-fade-in-up {
          animation: promotion-fade-in-up 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }
      */}
      <div className="w-full h-52 overflow-hidden relative">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110 rounded-t-2xl"
        />
        <span className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-gray-900 text-xs font-bold px-4 py-1 rounded-full shadow-lg drop-shadow-md">
          {tag}
        </span>
      </div>
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-extrabold text-yellow-300 mb-2 leading-tight drop-shadow-sm">
            {title}
          </h3>
          <p className="text-gray-100 mb-3 text-base leading-relaxed">
            {description}
          </p>
          <div className="flex items-center mb-4">
            <span className="flex items-center bg-gray-700 text-yellow-200 text-xs font-semibold px-3 py-1 rounded-full">
              <FaRegClock className="mr-1 text-yellow-400" /> {time}
            </span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-2 mt-2">
          <a
            href={signupLink}
            className="w-full md:w-auto bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-6 rounded-lg transition text-base shadow-md text-center"
          >
            সাইনআপ
          </a>
          <a
            href={detailsLink}
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition text-base shadow-md text-center"
          >
            বিস্তারিত
          </a>
        </div>
      </div>
    </div>
  );
};

export default PromotionCard;
