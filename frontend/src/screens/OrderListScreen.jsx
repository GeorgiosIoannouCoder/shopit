import { useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import { useGetOrdersQuery } from "../slices/orderSlice";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginationn from "../components/Paginationn";
import Meta from "../components/Meta";

const OrderListScreen = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, error } = useGetOrdersQuery({
    pageNumber,
  });

  console.log(data);

  return (
    <>
      <Meta
        title={"ShopIt | Spend Less | Smile More"}
        description={"ShopIt | Spend Less | Smile More"}
        key={"ShopIt | Spend Less | Smile More"}
      />
      <h1 style={{ color: "#e7eff6" }}>Orders</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr style={{ color: "#e7eff6" }}>
                <th>ORDER ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.orders.map((order) => (
                <tr key={order._id}>
                  <td style={{ color: "#d0a462" }}>{order._id}</td>
                  <td style={{ color: "#d0a462" }}>
                    {order.user && order.user.name}
                  </td>
                  <td style={{ color: "#d0a462" }}>
                    {order.createdAt.substring(0, 10)}
                  </td>
                  <td style={{ color: "#d0a462" }}>${order.totalPrice}</td>
                  <td style={{ color: "#d0a462" }}>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td style={{ color: "#d0a462" }}>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant="light" className="btn-sm">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginationn
            pages={data.pages}
            page={data.page}
            isAdmin={true}
            isOrder={true}
          />
        </>
      )}
    </>
  );
};

export default OrderListScreen;
