import { Outlet } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

const HomePage = () => {
  return (
    <div className="w-full">
      <div className="w-full">
        <Header />
      </div>
      <div className="max-w-[1024px] mx-auto px-2 py-10">
        <Outlet />
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
