import React, { useState } from "react";
import axios from "axios";

function Animal({ name }) {
  const [imageData, setImageData] = useState([]);

  const searchQuery =
    "https://www.flickr.com/services/rest/?" +
    "method=flickr.photos.search&" +
    `api_key=${process.env.FLICKR_API_KEY}&` +
    "format=json&nojsoncallback=1&content_type=all&media=all&sort=relevance&per_page=10&" +
    `text=${name}`;

  axios
    .get(searchQuery)
    .then((response) => {
      console.log(response);
      setImageData(response.data.photos.photo);
    })
    .catch((err) => {
      console.log(err);
    });

  return (
    <div>
      {imageData.map((image, i) => {
        const imgSrc = `https://live.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`;
        return <img key={i} alt="new" src={imgSrc} />;
      })}
    </div>
  );
}

export default Animal;
