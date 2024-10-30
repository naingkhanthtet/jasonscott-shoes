import Carousel from "./Carousel";
import FilteredShoeList from "./FilterFunction/FilteredShoeList";

const Home: React.FC = () => {
  return (
    <>
      <Carousel />
      <FilteredShoeList />
    </>
  );
};

export default Home;
