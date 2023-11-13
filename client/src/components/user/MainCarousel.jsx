import React from 'react'
import img1 from "./images/sample taj mahal.jpg";
import "./MainCarousel.css"
import Carousel from "react-material-ui-carousel";

const MainCarousel = () => {
  return (
    <div className="carousel">
        <Carousel>
          <div className="carousel-elements">
            <img src={img1} alt="Taj Mahal" />
          </div>
          <div className="carousel-elements">2</div>
          <div className="carousel-elements">3</div>
        </Carousel>
      </div>
  )
}

export default MainCarousel