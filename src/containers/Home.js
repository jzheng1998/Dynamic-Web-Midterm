import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import data from "../apikeys/flickr_api";

function Home() {
  const [query, setQuery] = useState("");
  const [imageData, setImageData] = useState([]);

  const updateQuery = (event) => {
    event.preventDefault();
    console.log(query);

    const searchQuery =
      "https://www.flickr.com/services/rest/?" +
      "method=flickr.photos.search&" +
      `api_key=${data.api_key}&` +
      "format=json&nojsoncallback=1&content_type=all&media=all&sort=relevance&per_page=10&" +
      `text=${query}`;

    axios
      .get(searchQuery)
      .then((response) => {
        console.log(response);
        setImageData(response.data.photos.photo);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form noValidate autoComplete="off" onSubmit={updateQuery}>
        <TextField
          className="outlined-basic"
          label="Input search..."
          variant="outlined"
          value={query}
          onInput={(e) => setQuery(e.target.value)}
        />
        <Button type="submit">Submit</Button>
      </form>
      {imageData.map((image, i) => {
        const imgSrc = `https://live.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`;
        return <img key={i} alt="new" src={imgSrc} />;
      })}
    </div>
  );
}

export default Home;
