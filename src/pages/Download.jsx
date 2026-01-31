import React, { useState } from "react";
import downloadBg from "../assets/download-app-bg.png";
import downloadGirl from "../assets/download-girl.png";
import playStore from "../assets/play-store.png";
import appStore from "../assets/app-store.png";
import { Link } from "react-router-dom";

const Download = () => {
  const [loading, setLoading] = useState(false);

  const handleApkDownload = async () => {
    try {
      setLoading(true);

      const response = await fetch("/gs365v1.apk");

      if (!response.ok) {
        throw new Error(`Download failed: ${response.statusText}`);
      }

      const blob = await response.blob();
      const fileURL = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = fileURL;
      link.download = "gs365v1.apk";

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(fileURL);
    } catch (error) {
      console.error("APK Download Error:", error);
      alert(
        "⚠️ Failed to download the app. Please try again later or contact support.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="relative z-[1] md:min-h-[350px]">
        <img
          src={downloadBg}
          alt=""
          className="absolute h-full z-[-1] object-cover w-full"
        />

        <div className="max-w-[1200px] grid gap-5 grid-cols-1 md:grid-cols-2 px-[15px] pt-16 mx-auto">
          {/* left */}
          <div>
            <h1 className="text-[24px] md:text-[40px] uppercase text-center md:text-left font-bold text-[#121212]">
              DOWNLOAD <br className="hidden md:block" /> GS365 APP For{" "}
              <br className="hidden md:block" /> Android & IOS
            </h1>
            <p className="text-[14px] md:text-[18px] text-center md:text-left mt-2 md:mt-5 font-medium text-[#121212]">
              GS365 is available on both Android and iOS, providing the perfect
              platform for users to start earning rewards while playing.
            </p>

            <div className="flex mt-5 gap-2 md:gap-4 md:justify-start justify-center items-center">
              <a
                href="/gs365v1.apk"
                download={true}
                alt="Download Android App"
                disabled={loading}
                className="relative p-0"
              >
                <img
                  src={playStore}
                  alt="Download Android App"
                  className={`w-[130px] md:w-[170px] cursor-pointer ${
                    loading ? "opacity-50 pointer-events-none" : ""
                  }`}
                />
                {loading && (
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[12px] text-white font-semibold bg-black/70 px-2 py-1 rounded">
                    Downloading...
                  </span>
                )}
              </a>

              {/* <Link to={"#"}>
                <img src={appStore} alt="" className="w-[130px] md:w-[170px]" />
              </Link> */}
            </div>
          </div>

          <div>
            <img
              src={downloadGirl}
              alt=""
              className="md:h-[430px] w-full md:w-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Download;
