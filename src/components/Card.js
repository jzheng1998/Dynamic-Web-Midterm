import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Box, CircularProgress } from "@material-ui/core";
import { DOG_API_KEY } from "../api/apiKey";

export default function Card({ data }) {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const args = {
      baseURL: "https://api.thedogapi.com/v1/",
      headers: {
        "x-app-key": DOG_API_KEY,
      },
      method: "get",
      params: {
        breed_id: data.id,
        limit: 1,
        order: "DESC",
      },
      url: "/images/search",
    };

    axios(args)
      .then((response) => {
        setImageSrc(response.data[0].url);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [data]);

  return (
    <div className="CardContainer">
      {imageSrc ? (
        <img className="CardImage" src={imageSrc} alt="" />
      ) : (
        <Box
          className="CardImage"
          alignItems="center"
          display="flex"
          justifyContent="center"
        >
          <CircularProgress size={80} />
        </Box>
      )}
      <div className="CardCover">
        <div className="CardName">
          <Link className="CardLink" to={`/${data.name}`}>
            {data.name}
          </Link>
        </div>
      </div>
    </div>
  );
}
