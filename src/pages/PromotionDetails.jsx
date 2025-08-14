import { FaRegClock } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";
import { API_LIST, BASE_URL, useGetRequest } from "../lib/api/apiClient";
import { useQuery } from "@tanstack/react-query";

const PromotionDetails = () => {
  const { id: promotionId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const getRequest = useGetRequest();

  const {
    data: promoDetails,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["promotion", promotionId],
    queryFn: () =>
      getRequest({
        url: BASE_URL + API_LIST.GET_PROMOTION_DETAILS + `?id=${promotionId}`,
        errorMessage: "Failed to fetch promotions",
        isPublic: true,
      }),
    enabled: !!promotionId, // make sure the ID exists
  });

  // handle signup
  const handleRegisterClick = () => {
    navigate("/register");
  };

  console.log(promotionId);
  return (
    <div className="!max-w-[900px] mx-auto px-4 py-8">
      <h1 className="text-[22px] flex items-center font-bold text-white">
        <Link
          className="text-white font-bold text-[25px] mr-2 hover:text-yellow-400"
          to={"/promotions"}
        >
          <IoIosArrowBack />
        </Link>
        {promoDetails?.data?.promotionName || "Read full details"}
      </h1>
      <img
        src={promoDetails?.data?.bannerImg}
        className="w-full rounded-md mt-4 max-h-[300px] object-cover"
        alt=""
      />
      {promoDetails?.data?.promotionType?.data?.length > 0 && (
        <div className="flex items-center flex-wrap mt-4 gap-2 mb-3">
          {promoDetails?.data?.promotionType?.data.map((category, idx) => (
            <p
              key={idx}
              className="text-gray-400 rounded-[4px] px-2 text-[10px] border-gray-400 border"
            >
              {category?.title}
            </p>
          ))}
        </div>
      )}
      <div className="flex items-center mb-3">
        <span className="flex items-center bg-gray-700 text-yellow-200 text-xs font-semibold px-3 py-1 rounded-full">
          <FaRegClock className="mr-1 text-yellow-400" />
          {promoDetails?.data?.dateRange || "Date not available"}
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
        dangerouslySetInnerHTML={{ __html: promoDetails?.data?.description }}
      ></div>

      <div className="header-auth">
        {user?.id ? (
          <button
            className="signup-btn w-full h-[45px]"
            onClick={() => navigate(`/deposit?promotionId=${promotionId}`)}
          >
            Deposit now
          </button>
        ) : (
          <button
            className="signup-btn w-full h-[45px]"
            onClick={() => handleRegisterClick()}
          >
            Signup
          </button>
        )}
      </div>
    </div>
  );
};

export default PromotionDetails;
