import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Card({ data, history }) {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const apiEndpoint = `https://api.thedogapi.com/v1/images/search`;
    const params = {
      params: {
        limit: 1,
        breed_id: data.id,
        order: "DESC",
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
        setImageSrc(response.data[0].url);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [data]);

  return (
    <div className="CardContainer">
      <img className="CardImage" src={imageSrc} alt="" />
      <div className="CardCover">
        <div className="CardName">
          <Link className="CardLink" to={`/${data.id}`}>
            {data.name}
          </Link>
        </div>
      </div>
    </div>
  );
}
