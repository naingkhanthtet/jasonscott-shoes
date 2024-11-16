import Carousel from "../Carousel/Carousel";
import FilteredShoeList from "../Filter/FilteredShoeList";

const Home: React.FC = () => {
  return (
    <>
      <Carousel />
      <FilteredShoeList />
    </>
  );
};

export default Home;
