import React from "react";
import { FaRegClock } from "react-icons/fa";

interface PromotionCardProps {
  image: string;
  title: string;
  description: string;
  tag: string[];
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
    <div className="bg-gray-800 text-left rounded-2xl shadow-2xl overflow-hidden flex flex-col h-full border border-gray-700 hover:shadow-yellow-400/40 transition-shadow duration-300 group promotion-fade-in-up">
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
      <div className="w-full overflow-hidden relative">
        <img
          src={image}
          alt={title}
          className="object-cover h-[150px] w-full transition-transform duration-500 group-hover:scale-110 rounded-t-2xl"
        />
      </div>
      <div className="flex-1 p-6 flex flex-col justify-between pt-5">
        <div>
          {tag?.length > 0 && (
            <div className="flex items-center flex-wrap gap-2 mb-3">
              {tag.map((t, idx) => (
                <p
                  key={idx}
                  className="text-gray-400 rounded-[4px] px-2 text-[12px] border-gray-400 border"
                >
                  {t}
                </p>
              ))}
            </div>
          )}

          <div className="flex items-center mb-3">
            <span className="flex items-center bg-gray-700 text-yellow-200 text-xs font-semibold px-3 py-1 rounded-full">
              <FaRegClock className="mr-1 text-yellow-400" /> {time}
            </span>
          </div>
          <h3 className="text-[18px] font-extrabold text-white mb-2 leading-tight drop-shadow-sm">
            {title}
          </h3>
          {/* <p className="text-gray-100 mb-3 text-base leading-relaxed">
            {description}
          </p> */}
          {/* <p className="text-gray-100 mb-3 text-base leading-relaxed">
            {description}
          </p> */}
        </div>
        <div className="flex flex-col md:flex-row gap-2 mt-2">
          <a
            href={signupLink}
            className="w-full md:w-auto bg-yellow-400 hover:bg-yellow-600 text-gray-900 font-bold py-1 px-4 rounded-md transition text-base shadow-md text-center hover:text-gray-900"
          >
            Signup
          </a>
          <a
            href={detailsLink}
            className="w-full md:w-auto border-yellow-400 hover:border-white text-yellow-400 hover:text-white font-bold py-1 px-4 rounded-md transition text-base shadow-md text-center border"
          >
            Read more
          </a>
        </div>
      </div>
    </div>
  );
};

export default PromotionCard;
