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
import Shoe from "../../types/Shoe";
import { StyledLink } from "../CustomComponents/BasicComponents";

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
      const searchFilteredResults = response.data.filter(
        (shoe: Shoe) =>
          shoe.name.toLowerCase().includes(query.toLowerCase()) ||
          (shoe.brand &&
            shoe.brand.toLowerCase().includes(query.toLowerCase())) ||
          (shoe.type &&
            shoe.type.toLowerCase().includes(query.toLowerCase())) ||
          (shoe.color && shoe.color.toLowerCase().includes(query.toLowerCase()))
      );
      setSearchResults(searchFilteredResults);
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
            <StyledLink to={`/shoes/${shoe.id}`} key={shoe.id}>
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
                <ListItemText
                  primary={shoe.name}
                  secondary={`$${shoe.price}`}
                />
              </SearchResult>
            </StyledLink>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default SearchShoes;
