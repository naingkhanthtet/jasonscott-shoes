import React, { useState, useCallback } from "react";
import { Drawer, IconButton } from "@mui/material";
import { ContentWidth, StyledButton } from "./CustomComponents/BasicComponents";
import { SelectedFilterBox } from "./CustomComponents/FilterComponents";
import { WrapContainer } from "./CustomComponents/BasicComponents";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import brands from "../assets/brands";
import colors from "../assets/colors";
import types from "../assets/types";
import genders from "../assets/gender";
import FilterSelections from "./FilterSelections";

interface FilterDrawerProps {
  selectedOptions: string[];
  handleOptionChange: (option: string) => void;
}

const FilterDrawer: React.FC<FilterDrawerProps> = ({
  selectedOptions,
  handleOptionChange,
}) => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    Brand: false,
    Gender: false,
    Color: false,
    Type: false,
  });

  const handleDrawerOpen = () => setOpenDrawer(true);
  const handleDrawerClose = () => setOpenDrawer(false);

  const handleToggleSection = useCallback((section: string) => {
    setOpenSections((prevSections) => ({
      ...prevSections,
      [section]: !prevSections[section],
    }));
  }, []);

  const isOptionSelected = useCallback(
    (option: string) => selectedOptions.includes(option),
    [selectedOptions]
  );

  const sections = [
    { name: "Brand", options: brands },
    { name: "Gender", options: genders },
    { name: "Color", options: colors },
    { name: "Type", options: types },
  ];

  return (
    <ContentWidth sx={{ padding: "20px" }}>
      {/* Button to open the filter drawer */}
      <StyledButton onClick={handleDrawerOpen} disableRipple>
        Filter
        <FilterListOutlinedIcon />
      </StyledButton>

      {/* Drawer for filter menu */}
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={handleDrawerClose}
        PaperProps={{
          style: { width: "350px", padding: "20px" },
        }}
      >
        <IconButton
          onClick={handleDrawerClose}
          style={{ alignSelf: "flex-end" }}
        >
          <CloseOutlinedIcon />
        </IconButton>

        {/* Selected selection */}
        <WrapContainer>
          Selected:
          {selectedOptions.length > 0 &&
            selectedOptions.map((option) => (
              <SelectedFilterBox
                onClick={() => handleOptionChange(option)}
                key={option}
              >
                <CloseOutlinedIcon /> {option}
              </SelectedFilterBox>
            ))}
        </WrapContainer>

        {/* Selections */}
        {sections.map(({ name, options }) => (
          <FilterSelections
            key={name}
            section={name}
            options={options}
            isOpen={openSections[name]}
            onToggle={() => handleToggleSection(name)}
            isOptionSelected={isOptionSelected}
            onOptionChange={handleOptionChange}
          />
        ))}
      </Drawer>
    </ContentWidth>
  );
};

export default FilterDrawer;
