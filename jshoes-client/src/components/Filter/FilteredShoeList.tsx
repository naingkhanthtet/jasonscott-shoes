import React, { useState, useCallback } from "react";
import FilterDrawer from "./FilterDrawer";
import Shoes from "../Shoe/Shoes";

const FilteredShoeList: React.FC = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    brand: [] as string[],
    color: [] as string[],
    type: [] as string[],
    gender: [] as string[],
  });

  const handleFilterChange = useCallback(
    (category: keyof typeof selectedFilters, option: string) => {
      setSelectedFilters((prevFilters) => ({
        ...prevFilters,
        [category]: prevFilters[category].includes(option)
          ? prevFilters[category].filter((item) => item !== option)
          : [...prevFilters[category], option],
      }));
    },
    []
  );

  return (
    <>
      <FilterDrawer
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
      />
      <Shoes selectedFilters={selectedFilters} />
    </>
  );
};

export default FilteredShoeList;
