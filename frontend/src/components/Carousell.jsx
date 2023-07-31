import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import { useGetTopProductsQuery } from "../slices/productSlice";
import Message from "./Message";
import Loader from "./Loader";

const Carousell = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error?.data?.message || error.error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-primary mb-4">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <div className="carousel-image-container">
              <Image
                src={product.image}
                alt={product.name}
                fluid
                className="carousel-image"
              />
              <Carousel.Caption className="carousel-caption">
                <h2 className="text-white text-right">
                  {product.name} (${product.price})
                </h2>
              </Carousel.Caption>
            </div>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Carousell;
