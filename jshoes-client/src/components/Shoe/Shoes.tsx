import React, { useEffect, useState } from "react";
import axiosInstance from "../../interceptors/axiosInstance";
import ShoeCard from "./ShoeCard";
import {
  ContentWidth,
  WrapContainer,
} from "../CustomComponents/BasicComponents";
import { PaginationDropdown } from "../CustomComponents/ShoeComponents";
import { MenuItem } from "@mui/material";

interface Shoe {
  id: number;
  name: string;
  brand: string;
  gender: string;
  color: string;
  type: string;
  price: number;
  image: string;
}

interface ShoesProps {
  selectedOptions: string[];
}

const Shoes: React.FC<ShoesProps> = ({ selectedOptions }) => {
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

  // Filter shoes based on selected options
  const filteredShoes =
    selectedOptions.length === 0
      ? shoes
      : shoes.filter((shoe) =>
          selectedOptions.some(
            (option) =>
              shoe.brand === option ||
              shoe.color === option ||
              shoe.type === option ||
              shoe.gender === option
          )
        );

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
  );
};

export default Shoes;
