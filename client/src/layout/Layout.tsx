import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

const Layout = () => {
  return (
    <div className="app-layout">
      <main className="content">
        <Outlet />
      </main>
      <Header />
    </div>
  );
};

export default Layout;
