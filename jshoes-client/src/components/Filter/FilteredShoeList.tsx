import React, { useState, useCallback } from "react";
import FilterDrawer from "./FilterDrawer";
import Shoes from "../Shoe/Shoes";

const FilteredShoeList: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOptionChange = useCallback((option: string) => {
    setSelectedOptions((prevOptions) =>
      prevOptions.includes(option)
        ? prevOptions.filter((item) => item !== option)
        : [...prevOptions, option]
    );
  }, []);

  return (
    <>
      <FilterDrawer
        selectedOptions={selectedOptions}
        handleOptionChange={handleOptionChange}
      />
      <Shoes selectedOptions={selectedOptions} />
    </>
  );
};

export default FilteredShoeList;
