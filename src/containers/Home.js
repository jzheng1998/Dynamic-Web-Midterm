import React, { useState, useEffect } from "react";
import axios from "axios";

import BreedCard from "../components/Card";

export default function Home() {
  const [breedData, setBreedData] = useState([]);

  useEffect(() => {
    const apiEndpoint = `https://api.thedogapi.com/v1/breeds`;
    const params = {
      params: {
        limit: 10,
      },
    };
    const headers = {
      headers: {
        "x-app-key": process.env.DOG_API_KEY,
      },
    };
    axios
      .get(apiEndpoint, params, headers)
      .then((response) => {
        console.log(response.data);
        setBreedData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="HomeContainer">
      {breedData.map((data, i) => {
        return <BreedCard key={i} data={data} />;
      })}
    </div>
  );
}
