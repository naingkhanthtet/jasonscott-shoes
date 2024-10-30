import Nav from "./Nav";
import Carousel from "./Carousel";
import Footer from "./Footer";
import FilteredShoeList from "./FilterFunction/FilteredShoeList";

const Home: React.FC = () => {
  return (
    <>
      <Nav />
      <Carousel />
      <FilteredShoeList />
      <Footer />
    </>
  );
};

export default Home;