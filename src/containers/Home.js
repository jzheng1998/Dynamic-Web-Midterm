import React, { useState, useEffect } from "react";
import axios from "axios";

import Card from "../components/Card";
import { DOG_API_KEY } from "../api/apiKey";

export default function Home() {
  const [breedData, setBreedData] = useState([]);

  useEffect(() => {
    const args = {
      baseURL: "https://api.thedogapi.com/v1/",
      headers: {
        "x-app-key": DOG_API_KEY,
      },
      method: "get",
      url: "/breeds",
    };

    axios(args)
      .then((response) => {
        setBreedData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="HomeContainer">
      {breedData.map((data, i) => {
        return <Card key={i} data={data} />;
      })}
    </div>
  );
}
