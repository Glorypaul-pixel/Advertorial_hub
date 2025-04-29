import Sidebar from "../sidebar/page";
// import " ../styles/Dashboardlayout.css"; // Import the new vanilla CSS file

export default function Layout({ children }) {
  return (
    <div className="layout-container">
      <Sidebar />
      <main className="main-content ">{children}</main>
    </div>
  );
}
