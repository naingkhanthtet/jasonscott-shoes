import Nav from "./Nav";
import Carousel from "./Carousel";
import FilterDropdown from "./FilterDropdown";
import Footer from "./Footer";
import Shoes from "./Shoes";

const Home: React.FC = () => {
  return (
    <>
      <Nav />
      <Carousel />
      <FilterDropdown />
      <Shoes />
      <Footer />
    </>
  );
};

export default Home;
