import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

import SelectionCard from "../components/SelectionCard";
import { PETFINDER_API_KEY, PETFINDER_SECRET } from "../api/apiKey";
import paw from "../paw.png";

export default function Selection() {
  let { breedName } = useParams();
  const [accessToken, setAccessToken] = useState(null);
  const [adoptionData, setAdoptionData] = useState(null);

  // Obtain access token from petfinder
  useEffect(() => {
    const args = {
      baseURL: "https://api.petfinder.com/v2/",
      data: {
        grant_type: "client_credentials",
        client_id: PETFINDER_API_KEY,
        client_secret: PETFINDER_SECRET,
      },
      method: "post",
      url: "/oauth2/token",
    };

    axios(args)
      .then((response) => {
        setAccessToken(response.data.access_token);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Retrieve data of available dogs for adoption
  useEffect(() => {
    if (breedName == null || breedName === "") return;
    if (accessToken == null) return;
    const args = {
      baseURL: "https://api.petfinder.com/v2/",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: "get",
      params: {
        breed: breedName,
        limit: 100,
        status: "adoptable",
      },
      url: "/animals",
    };

    axios(args)
      .then((response) => {
        console.log(response);
        setAdoptionData(response.data.animals);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [accessToken, breedName]);

  if (adoptionData == null || adoptionData.length === 0) {
    return (
      <div className="NoSelectionContainer">
        <img className="PawImage" alt="paw" src={paw} />
        <h1>No current adoption for the selected dog breed.</h1>
      </div>
    );
  } else {
    return (
      <div className="SelectionContainer">
        {adoptionData.map((animal, i) => {
          return <SelectionCard key={i} animal={animal} />;
        })}
      </div>
    );
  }
}
