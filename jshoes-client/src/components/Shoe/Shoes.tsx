import React, { useEffect, useState } from "react";
import axiosInstance from "../../interceptors/axiosInstance";
import ShoeCard from "./ShoeCard";
import {
  ContentWidth,
  WrapContainer,
} from "../CustomComponents/BasicComponents";
import { PaginationDropdown } from "../CustomComponents/ShoeComponents";
import { MenuItem, Typography } from "@mui/material";
import Shoe from "../../types/Shoe";

interface ShoesProps {
  selectedFilters: {
    brand: string[];
    color: string[];
    type: string[];
    gender: string[];
  };
}

const Shoes: React.FC<ShoesProps> = ({ selectedFilters }) => {
  const [shoes, setShoes] = useState<Shoe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10; // Number of items to display per page

  useEffect(() => {
    axiosInstance
      .get("/shop/shoes/")
      .then((response) => {
        setShoes(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching shoes", err);
        setError("Error fetching shoes");
        setLoading(false);
      });
  }, []);

  const filteredShoes = shoes.filter((shoe) => {
    const matchesBrand =
      selectedFilters.brand.length === 0 ||
      (shoe.brand && selectedFilters.brand.includes(shoe.brand));
    const matchesColor =
      selectedFilters.color.length === 0 ||
      (shoe.color && selectedFilters.color.includes(shoe.color));
    const matchesType =
      selectedFilters.type.length === 0 ||
      (shoe.type && selectedFilters.type.includes(shoe.type));
    const matchesGender =
      selectedFilters.gender.length === 0 ||
      (shoe.gender && selectedFilters.gender.includes(shoe.gender));

    return matchesBrand && matchesColor && matchesType && matchesGender;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedFilters]);

  const totalPages = Math.ceil(filteredShoes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentShoes = filteredShoes.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      {currentShoes.length === 0 ? (
        <ContentWidth>
          <Typography variant="h5">There are no shoes</Typography>
        </ContentWidth>
      ) : (
        <>
          <ContentWidth>
            <WrapContainer
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(2, 1fr)",
                  sm: "repeat(3, 1fr)",
                  lg: "repeat(5, 1fr)",
                },
                gap: "20px",
                justifyItems: "center",
              }}
            >
              {currentShoes.map((shoe) => (
                <ShoeCard
                  key={shoe.id}
                  id={shoe.id}
                  name={shoe.name}
                  price={shoe.price}
                  image={shoe.image}
                />
              ))}
            </WrapContainer>
          </ContentWidth>
          <ContentWidth
            sx={{
              justifyContent: "center",
              display: "flex",
              gap: "10px",
            }}
          >
            <span>
              Page
              <PaginationDropdown
                value={currentPage}
                onChange={(e) => setCurrentPage(Number(e.target.value))}
              >
                {Array.from({ length: totalPages }, (_, index) => (
                  <MenuItem key={index + 1} value={index + 1}>
                    {index + 1}
                  </MenuItem>
                ))}
              </PaginationDropdown>
              of {totalPages}
            </span>
          </ContentWidth>
        </>
      )}
    </>
  );
};

export default Shoes;
