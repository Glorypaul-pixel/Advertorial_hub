import "@/styles/notFound.css";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="NFcontainer">
      <main className="NFmain">
        <div className="NFcontent">
          <span className="NFcode">404</span>
          <h1 className="NFtitle">
            Network <span>(dis)</span>connected
          </h1>
          <p className="NFdescription">
            Don’t worry, you haven’t broken anything. This page has simply
            disappeared into thin air. Head back to our homepage, and start
            again.
          </p>
          <Link href="/">
            <button className="NFbackBtn">Take me back</button>
          </Link>
        </div>
        <img
          src="/images/content404.png"
          alt="Lost illustration"
          className="NFimg NFillustration"
        />
      </main>
    </div>
  );
}
