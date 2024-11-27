import React, { useState, useCallback } from "react";
import { Drawer, IconButton } from "@mui/material";
import {
  ContentWidth,
  StyledButton,
} from "../CustomComponents/BasicComponents";
import { SelectedFilterBox } from "../CustomComponents/FilterComponents";
import { WrapContainer } from "../CustomComponents/BasicComponents";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import brands from "../../assets/brands";
import colors from "../../assets/colors";
import types from "../../assets/types";
import genders from "../../assets/gender";
import FilterSelections from "./FilterSelections";

interface FilterDrawerProps {
  selectedFilters: {
    brand: string[];
    color: string[];
    type: string[];
    gender: string[];
  };
  onFilterChange: (
    category: keyof FilterDrawerProps["selectedFilters"],
    option: string
  ) => void;
}

const FilterDrawer: React.FC<FilterDrawerProps> = ({
  selectedFilters,
  onFilterChange,
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
    (category: keyof FilterDrawerProps["selectedFilters"], option: string) =>
      selectedFilters[category].includes(option),
    [selectedFilters]
  );

  const sections = [
    { name: "Brand", options: brands, category: "brand" },
    { name: "Gender", options: genders, category: "gender" },
    { name: "Color", options: colors, category: "color" },
    { name: "Type", options: types, category: "type" },
  ];

  return (
    <ContentWidth sx={{ padding: "20px" }}>
      <StyledButton onClick={handleDrawerOpen} disableRipple>
        Filter
        <FilterListOutlinedIcon />
      </StyledButton>

      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={handleDrawerClose}
        PaperProps={{
          style: { width: "300px", padding: "20px" },
        }}
      >
        <IconButton
          onClick={handleDrawerClose}
          style={{ alignSelf: "flex-end" }}
        >
          <CloseOutlinedIcon />
        </IconButton>

        <WrapContainer>
          Selected:
          {Object.entries(selectedFilters).map(([category, options]) =>
            options.map((option) => (
              <SelectedFilterBox
                onClick={() =>
                  onFilterChange(
                    category as keyof typeof selectedFilters,
                    option
                  )
                }
                key={option}
              >
                <CloseOutlinedIcon /> {option}
              </SelectedFilterBox>
            ))
          )}
        </WrapContainer>

        {sections.map(({ name, options, category }) => (
          <FilterSelections
            key={name}
            section={name}
            options={options}
            isOpen={openSections[name]}
            onToggle={() => handleToggleSection(name)}
            isOptionSelected={(option) =>
              isOptionSelected(category as keyof typeof selectedFilters, option)
            }
            onOptionChange={(option) =>
              onFilterChange(category as keyof typeof selectedFilters, option)
            }
          />
        ))}
      </Drawer>
    </ContentWidth>
  );
};

export default FilterDrawer;
