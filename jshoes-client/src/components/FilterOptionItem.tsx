import { FC } from "react";
import { Checkbox, FormControlLabel, ListItem } from "@mui/material";

interface FilterOptionItemProps {
  label: string;
  isChecked: boolean;
  onChange: () => void;
}

const FilterOptionItem: FC<FilterOptionItemProps> = ({
  label,
  isChecked,
  onChange,
}) => {
  return (
    <ListItem dense>
      <FormControlLabel
        control={<Checkbox checked={isChecked} onChange={onChange} />}
        label={label}
      />
    </ListItem>
  );
};

export default FilterOptionItem;
