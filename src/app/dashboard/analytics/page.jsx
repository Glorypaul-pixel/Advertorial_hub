"use client";
import { icons } from "@/lib/Icons";
import "../../../styles/Analytics.css";
import DashboardHeader from "@/app/components/DashboardHeader";


export default function AnalyticsPage() {
  return (
    <div>
      <DashboardHeader />
      <h1 className="heading-text">Analytics</h1>

      {/* container  */}
      <main className="analytics-main">
        {/* analytics card  */}
        <section className="analytics-card">
          <h4 className="analytics-card-heading ">
            Whatsapp <span>{icons.dropdown}</span>
          </h4>
          <div className="view-section">
            <h4 className="viewheading-text">Views</h4>
            <p className="view-detail ">
              {icons.infoline}{" "}
              <span>
                You can learn more about who viewed your Ads when you have at
                least 100 followers
              </span>
            </p>
          </div>
        </section>
        {/* analytics card  */}

        <section className="analytics-card">
          <div className="view-section">
            <h4 className="viewheading-text">Interactions</h4>
            <p className="view-detail ">
              {icons.infoline}{" "}
              <span>
                You can learn more about who viewed your Ads when you have at
                least 100 followers
              </span>
            </p>
          </div>
        </section>
      </main>
      <footer className="dashFooter">
        <p>&copy; 2025 Advertorial Hub. All Rights Reserved.</p>
        <a href="/Policy">Privacy Policy</a> | <a href="/AboutUs">About Us</a>
      </footer>
    </div>
  );
}
