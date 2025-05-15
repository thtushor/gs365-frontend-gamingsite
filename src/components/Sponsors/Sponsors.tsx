import React from "react";
import "./Sponsors.scss";

interface SponsorItem {
  id: string;
  name: string;
  image: string;
  title: string;
  years: string;
  url: string;
}

const sponsorsList: SponsorItem[] = [
  {
    id: "afc-bournemouth",
    name: "AFC Bournemouth",
    image:
      "https://img.b112j.com/bj/h5/assets/v3/images/sponsor/afc-bournemouth.png",
    title: "ফ্রন্ট অফ শার্ট পার্টনার",
    years: "২০২৪ - ২০২৫",
    url: "/sponsor?index=0",
  },
  {
    id: "bologna-fc",
    name: "Bologna FC 1909",
    image:
      "https://img.b112j.com/bj/h5/assets/v3/images/sponsor/bologna-fc-1909.png",
    title: "বেটিং পার্টনার",
    years: "২০২৩ - ২০২৪",
    url: "/sponsor?index=1",
  },
  {
    id: "quetta-gladiators",
    name: "Quetta Gladiators",
    image:
      "https://img.b112j.com/bj/h5/assets/v3/images/sponsor/quetta-gladiators.png",
    title: "টাইটানিয়াম স্পনসর",
    years: "২০২৩",
    url: "/sponsor?index=2",
  },
  {
    id: "sunrisers-eastern-cape",
    name: "Sunrisers Eastern Cape",
    image:
      "https://img.b112j.com/bj/h5/assets/v3/images/sponsor/sunrisers-eastern-cape.png",
    title: "টাইটেল স্পনসর",
    years: "২০২৩ - ২০২৪",
    url: "/sponsor?index=3",
  },
  {
    id: "deccan-gladiators",
    name: "Deccan Gladiators",
    image:
      "https://img.b112j.com/bj/h5/assets/v3/images/sponsor/deccan-gladiators.png",
    title: "টাইটেল স্পনসর",
    years: "২০২৩ - ২০২৪",
    url: "/sponsor?index=4",
  },
  {
    id: "st-kitts-nevis",
    name: "St Kitts & Nevis Patriots",
    image:
      "https://img.b112j.com/bj/h5/assets/v3/images/sponsor/st-kitts-and-nevis-patriots.png",
    title: "প্রধান স্পনসর",
    years: "২০২৪ - ২০২৫",
    url: "/sponsor?index=6",
  },
  {
    id: "biratnagar-kings",
    name: "Biratnagar Kings",
    image:
      "https://img.b112j.com/bj/h5/assets/v3/images/sponsor/biratnagar-kings.png",
    title: "ব্যাক অফ জার্সি স্পনসর",
    years: "২০২৪ - ২০২৫",
    url: "/sponsor?index=7",
  },
];

interface BrandAmbassadorItem {
  id: string;
  name: string;
  years: string;
  signature: string;
  image: string;
}

const ambassadorsList: BrandAmbassadorItem[] = [
  {
    id: "mia-khalifa",
    name: "Mia Khalifa",
    years: "২০২৪",
    signature:
      "https://img.b112j.com/bj/h5/assets/v3/images/sign/mia-khalifa.svg",
    image:
      "https://img.b112j.com/bj/h5/assets/v3/images/sponsor/afc-bournemouth.png",
  },
  {
    id: "kevin-pietersen",
    name: "Kevin Pietersen",
    years: "২০২৪ - ২০২৫",
    signature:
      "https://img.b112j.com/bj/h5/assets/v3/images/sign/kevin-pietersen.svg",
    image:
      "https://img.b112j.com/bj/h5/assets/v3/images/sponsor/bologna-fc-1909.png",
  },
  {
    id: "amy-jackson",
    name: "Amy Jackson",
    years: "২০২৩ - ২০২৪",
    signature:
      "https://img.b112j.com/bj/h5/assets/v3/images/sign/amy-jackson.svg",
    image:
      "https://img.b112j.com/bj/h5/assets/v3/images/sponsor/quetta-gladiators.png",
  },
  {
    id: "hansika-motwani",
    name: "Hansika Motwani",
    years: "২০২৩ - ২০২৪",
    signature:
      "https://img.b112j.com/bj/h5/assets/v3/images/sign/hansika-motwani.svg",
    image:
      "https://img.b112j.com/bj/h5/assets/v3/images/sponsor/sunrisers-eastern-cape.png",
  },
  {
    id: "wasim-akram",
    name: "Wasim Akram",
    years: "২০২৪ - ২০২৫",
    signature:
      "https://img.b112j.com/bj/h5/assets/v3/images/sign/wasim-akram.svg",
    image:
      "https://img.b112j.com/bj/h5/assets/v3/images/sponsor/deccan-gladiators.png",
  },
  {
    id: "chan-samart",
    name: "Chan Samart",
    years: "২০২৪ - ২০২৫",
    signature:
      "https://img.b112j.com/bj/h5/assets/v3/images/sign/chan-samart.svg",
    image:
      "https://img.b112j.com/bj/h5/assets/v3/images/sponsor/st-kitts-and-nevis-patriots.png",
  },
  {
    id: "keya-akter-payel",
    name: "Keya Akter Payel",
    years: "২০২৫",
    signature:
      "https://img.b112j.com/bj/h5/assets/v3/images/sign/keya-akter-payel.svg",
    image:
      "https://img.b112j.com/bj/h5/assets/v3/images/sponsor/biratnagar-kings.png",
  },
];

const Sponsors: React.FC = () => {
  return (
    <div className="sponsors-section">
      <div className="ambassador-lists">
        <div className="ambassador-lists__title">স্পন্সরশিপ</div>
        <div className="ambassador-lists__wrap">
          {sponsorsList.map((sponsor) => (
            <div key={sponsor.id} className="ambassador-lists__item item">
              <a href={sponsor.url}>
                <div className="item__icon">
                  <img
                    alt={`icon-${sponsor.id}`}
                    src={sponsor.image}
                    loading="lazy"
                  />
                  <div className="item__content">
                    <div className="txt">{sponsor.name}</div>
                    <div className="sub-txt">
                      <span className="sub-txt__title">{sponsor.title}</span>
                      <span className="sub-txt__years">{sponsor.years}</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="ambassador-lists brand-ambassadors">
        <div className="ambassador-lists__title">ব্র্যান্ড অ্যাম্বাসেডরস</div>
        <div className="ambassador-lists__wrap">
          {ambassadorsList.map((ambassador) => (
            <div key={ambassador.id} className="ambassador-lists__item item">
              <a href={`/ambassador?name=${ambassador.id}`}>
                <div className="item__icon">
                  <img
                    alt={ambassador.name}
                    src={ambassador.image}
                    loading="lazy"
                    className="ambassador-img"
                  />
                  <div className="item__content">
                    <div className="txt">{ambassador.name}</div>
                    <div className="sub-txt">
                      <span className="signature-container">
                        <img
                          className="signature"
                          alt={`${ambassador.name} signature`}
                          src={ambassador.signature}
                          loading="lazy"
                        />
                      </span>
                      <span className="sub-txt__years">{ambassador.years}</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sponsors;
