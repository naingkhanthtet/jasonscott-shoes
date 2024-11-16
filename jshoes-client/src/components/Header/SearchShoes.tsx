import React, { useState } from "react";
import axiosInstance from "../../interceptors/axiosInstance";
import { SearchOutlined } from "@mui/icons-material";
import {
  Drawer,
  IconButton,
  List,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import {
  SearchField,
  SearchResult,
} from "../CustomComponents/SearchComponents";

interface Shoe {
  id: number;
  name: string;
  brand: string;
  color: string;
  type: string;
  price: number;
  image: string;
}

const SearchShoes: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Shoe[]>([]);
  const [openSearchDrawer, setOpenSearchDrawer] = useState<boolean>(false);

  const handleSearchIconClick = () => setOpenSearchDrawer(true);

  const handleSearchClose = () => {
    setOpenSearchDrawer(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleSearchChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      const response = await axiosInstance.get("/shop/shoes/");
      const filteredResults = response.data.filter(
        (shoe: Shoe) =>
          shoe.name.toLowerCase().includes(query.toLowerCase()) ||
          shoe.brand.toLowerCase().includes(query.toLowerCase()) ||
          shoe.type.toLowerCase().includes(query.toLowerCase()) ||
          shoe.color.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <>
      <SearchOutlined
        onClick={handleSearchIconClick}
        sx={{
          cursor: "pointer",
        }}
      />

      <Drawer
        anchor="right"
        open={openSearchDrawer}
        onClose={handleSearchClose}
        PaperProps={{
          style: { width: "300px", padding: "20px" },
        }}
      >
        {/* Close Search drawer */}
        <IconButton
          onClick={handleSearchClose}
          style={{
            alignSelf: "flex-end",
          }}
        >
          <CloseOutlinedIcon />
        </IconButton>

        <SearchField
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search shoes"
        />

        <List>
          {searchResults.map((shoe) => (
            <SearchResult
              key={shoe.id}
              sx={{
                cursor: "pointer",
              }}
            >
              <ListItemAvatar>
                <img
                  src={shoe.image}
                  alt={shoe.name}
                  style={{ width: 50, height: 50 }}
                />
              </ListItemAvatar>
              <ListItemText primary={shoe.name} secondary={`$${shoe.price}`} />
            </SearchResult>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default SearchShoes;
