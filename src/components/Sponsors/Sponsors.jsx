import React from "react";
import "./Sponsors.scss";
import { API_LIST, BASE_URL, useGetRequest } from "../../lib/api/apiClient";
import { useQuery } from "@tanstack/react-query";
import Shimmer from "../../lib/api/Shimmer";

const Sponsors = () => {
  const getRequest = useGetRequest();

  const {
    data: utilsRes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["active-utils"],
    queryFn: () =>
      getRequest({
        url: BASE_URL + API_LIST.GET_ACTIVE_UTILS,
        errorMessage: "Failed to fetch active utils",
        isPublic: true,
      }),
  });

  const sponsorsList = utilsRes?.data?.sponsors ?? [];
  const ambassadorsList = utilsRes?.data?.ambassador ?? [];
  const licensesList = utilsRes?.data?.gaming_licenses ?? [];
  const responsibleList = utilsRes?.data?.responsible_gamings ?? [];

  if (isLoading) return <Shimmer />;
  if (isError) return null;

  return (
    <div className="sponsors-section">
      {/* Sponsors */}
      {sponsorsList.length > 0 && (
        <div className="ambassador-lists">
          <div className="ambassador-lists__title text-left">Sponsorships</div>
          <div className="ambassador-lists__wrap">
            {sponsorsList.map((sponsor, index) => (
              <div key={sponsor.id} className="ambassador-lists__item item">
                <a href={`/sponsor?index=${index}`}>
                  <div className="item__icon">
                    <img alt={sponsor.name} src={sponsor.logo} loading="lazy" />
                    <div className="item__content">
                      <div className="txt">{sponsor.name}</div>
                      <div className="sub-txt">
                        <span className="sub-txt__title">
                          {sponsor.companyType}
                        </span>
                        <span className="sub-txt__years">
                          {sponsor.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ambassadors */}
      {ambassadorsList.length > 0 && (
        <div className="ambassador-lists brand-ambassadors">
          <div className="ambassador-lists__title text-left">
            Brand Ambassadors
          </div>
          <div className="ambassador-lists__wrap">
            {ambassadorsList.map((ambassador) => (
              <div key={ambassador.id} className="ambassador-lists__item item">
                <a href={`/ambassador?name=${ambassador.id}`}>
                  <div className="item__icon">
                    <img
                      alt={ambassador.name}
                      src={ambassador.photo}
                      loading="lazy"
                      className="ambassador-img"
                    />
                    <div className="item__content">
                      <div className="txt">{ambassador.name}</div>
                      <div className="sub-txt">
                        <span className="sub-txt__years">
                          {ambassador.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ambassadors */}
      {licensesList.length > 0 && (
        <div className="ambassador-lists brand-ambassadors">
          <div className="ambassador-lists__title text-left">
            Gaming Licenses
          </div>
          <div className="ambassador-lists__wrap">
            {licensesList.map((license) => (
              <div key={license.id} className="ambassador-lists__item item">
                <a href={`/license?name=${license.id}`}>
                  <div className="item__icon">
                    <img
                      alt={license.name}
                      src={license.icon}
                      loading="lazy"
                      className="ambassador-img"
                    />
                    <div className="item__content">
                      <div className="txt">{license.name}</div>
                      <div className="sub-txt">
                        <span className="sub-txt__years">
                          {license.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {responsibleList.length > 0 && (
        <div className="ambassador-lists brand-ambassadors">
          <div className="ambassador-lists__title text-left">
            Responsible Gaming
          </div>
          <div className="ambassador-lists__wrap">
            {responsibleList.map((item) => (
              <div key={item.id} className="ambassador-lists__item item">
                <a href={`/responsible-gaming?name=${item.id}`}>
                  <div className="item__icon">
                    <img
                      alt={item.name}
                      src={item.icon}
                      loading="lazy"
                      className="ambassador-img"
                    />
                    <div className="item__content">
                      <div className="txt">{item.name}</div>
                      <div className="sub-txt">
                        <span className="sub-txt__years">{item.duration}</span>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sponsors;
