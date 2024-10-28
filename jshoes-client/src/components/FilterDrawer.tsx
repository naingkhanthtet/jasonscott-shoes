import React, { useState, useCallback } from "react";
import {
  Collapse,
  List,
  ListItemText,
  Drawer,
  IconButton,
  ListItemButton,
} from "@mui/material";
import { ContentWidth, StyledButton } from "./CustomComponents/BasicComponents";
import { SelectedFilterBox } from "./CustomComponents/FilterComponents";
import { WrapContainer } from "./CustomComponents/BasicComponents";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import brands from "../assets/brands";
import colors from "../assets/colors";
import types from "../assets/types";
import FilterOptionItem from "./FilterOptionItem";

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
          style: { width: "400px", padding: "20px" },
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
        {["Brand", "Gender", "Color", "Type"].map((section) => (
          <div key={section}>
            <ListItemButton onClick={() => handleToggleSection(section)}>
              {openSections[section] ? (
                <ExpandLessOutlinedIcon />
              ) : (
                <ExpandMoreOutlinedIcon />
              )}
              <ListItemText primary={section} />
            </ListItemButton>
            <Collapse in={openSections[section]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {section === "Brand" &&
                  brands.map((brand) => (
                    <FilterOptionItem
                      key={brand}
                      label={brand}
                      isChecked={isOptionSelected(brand)}
                      onChange={() => handleOptionChange(brand)}
                    />
                  ))}
                {section === "Gender" &&
                  ["M", "F"].map((gender) => (
                    <FilterOptionItem
                      key={gender}
                      label={gender}
                      isChecked={isOptionSelected(gender)}
                      onChange={() => handleOptionChange(gender)}
                    />
                  ))}
                {section === "Color" &&
                  colors.map((color) => (
                    <FilterOptionItem
                      key={color}
                      label={color}
                      isChecked={isOptionSelected(color)}
                      onChange={() => handleOptionChange(color)}
                    />
                  ))}
                {section === "Type" &&
                  types.map((type) => (
                    <FilterOptionItem
                      key={type}
                      label={type}
                      isChecked={isOptionSelected(type)}
                      onChange={() => handleOptionChange(type)}
                    />
                  ))}
              </List>
            </Collapse>
          </div>
        ))}
      </Drawer>
    </ContentWidth>
  );
};

export default FilterDrawer;
