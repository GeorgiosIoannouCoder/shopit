import { useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from "../slices/productSlice";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginationn from "../components/Paginationn";
import Meta from "../components/Meta";

const ProductListScreen = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
  });

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Delete Product?")) {
      try {
        await deleteProduct(id);
        toast.success("Product Deleted!");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const createProductHandler = async () => {
    if (window.confirm("Create new product?")) {
      try {
        await createProduct();
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  return (
    <>
      <Meta
        title={"ShopIt | Spend Less | Smile More"}
        description={"ShopIt | Spend Less | Smile More"}
        key={"ShopIt | Spend Less | Smile More"}
      />
      <Row className="align-items-center">
        <Col>
          <h1 tyle={{ color: "#e7eff6" }}>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="my-3" onClick={createProductHandler}>
            <FaPlus /> Create Product
          </Button>
        </Col>
      </Row>
      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr style={{ color: "#e7eff6" }}>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((product) => (
                <tr key={product._id}>
                  <td style={{ color: "#d0a462" }}>{product._id}</td>
                  <td style={{ color: "#d0a462" }}>{product.name}</td>
                  <td style={{ color: "#d0a462" }}>${product.price}</td>
                  <td style={{ color: "#d0a462" }}>{product.category}</td>
                  <td style={{ color: "#d0a462" }}>{product.brand}</td>
                  <td style={{ color: "#d0a462" }}>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm mx-2">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <FaTrash style={{ color: "white" }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginationn
            pages={data.pages}
            page={data.page}
            isAdmin={true}
            isProduct={true}
          />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
