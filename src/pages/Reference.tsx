import React from "react";

interface BannerItem {
  id: string;
  imageUrl: string;
  link?: string;
}

const Reference: React.FC = () => {
  const bannerItems: BannerItem[] = [
    {
      id: "message-message-125716",
      imageUrl: "https://img.b112j.com/upload/announcement/image_221254.jpg",
      link: "#",
    },
    // Add more banner items as needed
  ];

  return (
    <div className="reference-page">
      <div className="w-full mx-auto">
        {/* <Slider {...settings}> */}
        <div>
          <a href="#">
            <div
              className="w-full h-[400px] bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${bannerItems[0].imageUrl})` }}
            />
          </a>
        </div>
        {/* </Slider> */}
      </div>
    </div>
  );
};

export default Reference;
