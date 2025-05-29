import React from "react";
import "./SupportHelpTab.scss";

const collections = [
  { title: "Baji টিপস", articles: 16 },
  { title: "Baji VIP Club Frequently Asked Questions", articles: 28 },
  { title: "Payment ( পেমেন্ট )", articles: 22 },
  { title: "Account ( একাউন্ট )", articles: 23 },
  { title: "Promotions ( প্রোমশন )", articles: 8 },
];

const SupportHelpTab: React.FC = () => (
  <div className="support-help-tab">
    <h2>Help</h2>
    <input className="support-help-search" placeholder="Search for help" />
    <div className="collections-list">
      <h3>10 collections</h3>
      <ul>
        {collections.map((col, i) => (
          <li key={i} className="collection-item">
            <div className="title">{col.title}</div>
            <div className="articles">{col.articles} articles</div>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default SupportHelpTab;
