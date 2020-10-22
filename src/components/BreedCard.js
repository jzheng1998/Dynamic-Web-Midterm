import React, { useEffect, useState } from "react";
import axios from "axios";

function Card({ data }) {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const apiEndpoint = `https://api.thedogapi.com/v1/images/search`;
    const params = {
      params: {
        limit: 1,
        breed_id: data.id,
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
        setImageSrc(response.data[0].url);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [data]);

  return (
    <div className="CardContainer">
      <img src={imageSrc} alt="" />
    </div>
  );
}

export default Card;
