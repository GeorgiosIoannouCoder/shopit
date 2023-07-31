import { useParams, Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginationn from "../components/Paginationn";
import Carousell from "../components/Carousell";
import Meta from "../components/Meta";

const HomeScreen = () => {
  const { keyword, pageNumber } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <>
      {!keyword ? (
        <Carousell />
      ) : (
        <Link to="/" className="btn btn-dark mb-4">
          Go Back
        </Link>
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta
            title={"ShopIt | Spend Less | Smile More"}
            description={"ShopIt | Spend Less | Smile More"}
            key={"ShopIt | Spend Less | Smile More"}
          />
          <h1>Latest Products</h1>
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginationn
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
