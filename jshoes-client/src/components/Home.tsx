import Nav from "./Nav";
import Carousel from "./Carousel";
import FilterDropdown from "./FilterDropdown";
import Footer from "./Footer";

const Home: React.FC = () => {
  return (
    <>
      <Nav />
      <Carousel />
      <FilterDropdown />
      <Footer />
    </>
  );
};

export default Home;
