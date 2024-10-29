import React from "react";
import {
  List,
  ListItemText,
  ListItemButton,
  Collapse,
  Checkbox,
  FormControlLabel,
  ListItem,
} from "@mui/material";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";

interface FilterSelectionProps {
  section: string;
  options: string[];
  isOpen: boolean;
  onToggle: () => void;
  isOptionSelected: (option: string) => boolean;
  onOptionChange: (option: string) => void;
}

const FilterSelections: React.FC<FilterSelectionProps> = ({
  section,
  options,
  isOpen,
  onToggle,
  isOptionSelected,
  onOptionChange,
}) => (
  <div>
    <ListItemButton onClick={onToggle}>
      {isOpen ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />}
      <ListItemText primary={section} />
    </ListItemButton>
    <Collapse in={isOpen} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        {options.map((option) => (
          <ListItem key={option} dense>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isOptionSelected(option)}
                  onChange={() => onOptionChange(option)}
                />
              }
              label={option}
            />
          </ListItem>
        ))}
      </List>
    </Collapse>
  </div>
);

export default FilterSelections;
