import { FaRegClock } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

const PromotionDetails = () => {
  const navigate = useNavigate();
  const promotionDetails = {
    id: "promo_003",
    title: "৳10 Crore Prize Pool",
    tagline: "Join Free Contests and Win Big",
    categories: [
      "Slots",
      "Casino",
      "Sports",
      "Fishing",
      "Card",
      "Lottery",
      "Table",
      "Arcade",
      "Crash",
    ],
    duration: {
      start: "2025-05-29T00:00:00+06:00",
      end: "2025-09-14T23:59:59+06:00",
    },
    short_description:
      "Win from a prize pool of ৳10 crore by joining free tournaments and leaderboard events!",
    banner_image_desktop:
      "https://img.b112j.com/upload/announcement/image_130593.jpg",
    banner_image_mobile:
      "https://img.b112j.com/upload/announcement/image_130593.jpg",
    details:
      '<p>Get rewarded every time you deposit! Based on your VIP level, receive up to <strong>4% extra bonus</strong>—no cap, no hidden terms. Just deposit and earn!</p><h3>How It Works</h3><ol><li>Select this offer on the deposit page.</li><li>Make a deposit using any payment method.</li><li>Receive your bonus instantly!</li></ol><h3>Bonus Rates</h3><table border="1"><thead><tr><th>VIP Level</th><th>Bonus %</th></tr></thead><tbody><tr><td>Normal, Elite, Pro</td><td>3%</td></tr><tr><td>Master, Legend, Mythic</td><td>4%</td></tr></tbody></table><p><strong>Example:</strong> If you deposit ৳5,000 and you are at the Legend level, you get an extra ৳200. Your total balance becomes ৳5,200 immediately.</p><h3>Important Rules</h3><ul><li>Bonus has a <strong>1x wagering requirement</strong>.</li><li>Bonus usable on all games and sports.</li><li>Withdrawal available only after wagering is completed.</li></ul><p>BAJ reserves the right to modify or cancel the promotion at any time. Abuse or misuse will lead to forfeiture.</p>',
  };

  // handle signup
  const handleRegisterClick = () => {
    navigate("/register");
  };
  return (
    <div className="!max-w-[900px] mx-auto px-4 py-8">
      <h1 className="text-[22px] flex items-center font-bold text-white">
        <Link
          className="text-white font-bold text-[25px] mr-2 hover:text-yellow-400"
          to={"/promotions"}
        >
          <IoIosArrowBack />
        </Link>
        {promotionDetails?.title || "Read full details"}
      </h1>
      <img
        src={promotionDetails?.banner_image_desktop}
        className="w-full rounded-md mt-4"
        alt=""
      />
      {promotionDetails?.categories?.length > 0 && (
        <div className="flex items-center flex-wrap mt-4 gap-2 mb-3">
          {promotionDetails?.categories.map((category, idx) => (
            <p
              key={idx}
              className="text-gray-400 rounded-[4px] px-2 text-[12px] border-gray-400 border"
            >
              {category}
            </p>
          ))}
        </div>
      )}
      <div className="flex items-center mb-3">
        <span className="flex items-center bg-gray-700 text-yellow-200 text-xs font-semibold px-3 py-1 rounded-full">
          <FaRegClock className="mr-1 text-yellow-400" />
          {promotionDetails?.duration?.start && promotionDetails?.duration?.end
            ? `${new Date(
                promotionDetails.duration.start
              ).toLocaleDateString()} ~ ${new Date(
                promotionDetails.duration.end
              ).toLocaleDateString()}`
            : "Date not available"}
        </span>
      </div>

      <div
        className="prose border-b border-gray-600 pb-5 mb-5 prose-sm max-w-none text-white text-left
    [&_table]:w-full 
    [&_table]:text-white 
    [&_td]:px-2 
    [&_th]:px-2 
    [&_table]:border 
    [&_th]:border 
    [&_td]:border 
    [&_table]:border-white 
    [&_td]:border-white 
    [&_th]:border-white 
    [&_ul]:list-disc 
    [&_ol]:list-decimal 
    [&_ul]:pl-5 
    [&_ol]:pl-5 
    [&_li]:text-white 
    [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mt-5
    [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mt-5
    [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-5
    [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:mt-5
    [&_h5]:text-base [&_h5]:font-medium [&_h5]:mt-5
    [&_h6]:text-sm [&_h6]:font-medium [&_h6]:mt-5"
        dangerouslySetInnerHTML={{ __html: promotionDetails.details }}
      ></div>

      <div className="header-auth">
        <button
          className="signup-btn w-full h-[45px]"
          onClick={() => handleRegisterClick()}
        >
          Signup
        </button>
      </div>
    </div>
  );
};

export default PromotionDetails;
