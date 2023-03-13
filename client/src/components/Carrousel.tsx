import { Image } from "react-bootstrap"; 
import Carousel from "react-bootstrap/Carousel";
import Banner1 from "../assets/images/unhas.jpg";
import Banner2 from "../assets/images/cilios.jpg";
import Banner3 from "../assets/images/cabelo.jpg";

export function Carrousel() {
    return(
        <Carousel variant="dark">
        <Carousel.Item>
        <Image className="d-block w-100" src={Banner1} alt="First slide" height={500} />
        </Carousel.Item>
        <Carousel.Item>
        <Image className="d-block w-100" src={Banner2} alt="First slide" height={500} />
        </Carousel.Item>
        <Carousel.Item>
        <Image className="d-block w-100" src={Banner3} alt="First slide" height={500} />
        </Carousel.Item>
    </Carousel>
    );
}