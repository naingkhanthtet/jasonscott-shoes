import React, { useState } from "react";
import {
  Checkbox,
  Collapse,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { StyledButton } from "./CustomComponents/BasicComponents";
import {
  FilterContainer,
  SelectedFilterBox,
} from "./CustomComponents/FilterDropdownComponents";
import { WrapContainer } from "./CustomComponents/BasicComponents";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const FilterDropdown: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openBrand, setOpenBrand] = useState<boolean>(false);
  const [openGender, setOpenGender] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleToggleBrand = () => setOpenBrand(!openBrand);
  const handleToggleGender = () => setOpenGender(!openGender);

  const handleOptionChange = (option: string) => {
    setSelectedOptions((prevOptions) =>
      prevOptions.includes(option)
        ? prevOptions.filter((item) => item !== option)
        : [...prevOptions, option]
    );
  };

  const isOptionSelected = (option: string) => selectedOptions.includes(option);

  return (
    <FilterContainer>
      {/* Button to open dropdown menu */}
      <StyledButton onClick={handleMenuOpen} disableRipple>
        Filter
        <FilterListOutlinedIcon />
      </StyledButton>

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          style: {
            width: "400px",
          },
        }}
      >
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

        {/* Brand Group */}
        <MenuItem onClick={handleToggleBrand} disableRipple>
          {openBrand ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />}
          <ListItemText primary="Brand" />
        </MenuItem>
        <Collapse in={openBrand} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {["Adidas", "Nike", "Timberland"].map((brand) => (
              <ListItem key={brand} dense>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isOptionSelected(brand)}
                      onChange={() => handleOptionChange(brand)}
                    />
                  }
                  label={brand}
                />
              </ListItem>
            ))}
          </List>
        </Collapse>

        {/* Gender Group */}
        <MenuItem onClick={handleToggleGender} disableRipple>
          {openGender ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />}
          <ListItemText primary="Gender" />
        </MenuItem>
        <Collapse in={openGender} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {["Male", "Female"].map((gender) => (
              <ListItem key={gender} dense>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isOptionSelected(gender)}
                      onChange={() => handleOptionChange(gender)}
                    />
                  }
                  label={gender}
                />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </Menu>
    </FilterContainer>
  );
};

export default FilterDropdown;
