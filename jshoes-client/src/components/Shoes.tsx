import React, { useEffect, useState } from "react";
import axiosInstance from "../interceptors/axiosInstance";

// Define the type for a Shoe object
interface Shoe {
  id: number;
  name: string;
  type: number;
  image: string;
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
    <div className="shoe-list">
      <div className="shoe-container">
        {shoes.map((shoe) => (
          <div key={shoe.id} className="shoe-card">
            <img
              // src={`${MEDIA_BASE_URL}${shoe.image}`}
              src={shoe.image}
              alt={shoe.name}
              className="shoe-image"
            />
            <h2>{shoe.name}</h2>
            <p>Price: ${shoe.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shoes;
