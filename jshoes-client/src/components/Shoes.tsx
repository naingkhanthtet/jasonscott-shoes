import React, { useEffect, useState } from "react";
import axiosInstance from "../interceptors/axiosInstance";
import ShoeCard from "./ShoeCard";
import { WrapContainer } from "./CustomComponents/BasicComponents";

// Define the type for a Shoe object
interface Shoe {
  id: number;
  name: string;
  type: string;
  imageUrl: string;
  price: number;
}

const Shoes: React.FC = () => {
  const [shoes, setShoes] = useState<Shoe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <WrapContainer>
      {shoes.map((shoe) => (
        <ShoeCard
          key={shoe.id}
          name={shoe.name}
          type={shoe.type}
          price={shoe.price}
          imageUrl={shoe.imageUrl}
        />
      ))}
    </WrapContainer>
  );
};

export default Shoes;
