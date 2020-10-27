import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function Dog() {
  let { id } = useParams();
  const [imageData, setImageData] = useState([]);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  useEffect(() => {
    const apiEndpoint = `https://api.thedogapi.com/v1/images/search`;
    const params = {
      params: {
        limit: 5,
        breed_id: id,
        order: "DESC",
        size: "full",
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
        setImageData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div className="DogContainer">
      <div className="CarouselContainer">
        <Carousel
          autoPlay={true}
          autoPlaySpeed={5000}
          containerClass="carousel-container"
          draggable={false}
          infinite={true}
          responsive={responsive}
          showDots={true}
          ssr={true}
          swipeable={false}
        >
          {imageData.map((data, i) => {
            if (data.height > data.width) {
              return (
                <div key={i} className="ImageContainer">
                  <img className="VerticalImage" alt="" src={data.url} />
                </div>
              );
            } else {
              return (
                <div key={i} className="ImageContainer">
                  <img className="HorizontalImage" alt="" src={data.url} />
                </div>
              );
            }
          })}
        </Carousel>
      </div>
      <div></div>
    </div>
  );
}
