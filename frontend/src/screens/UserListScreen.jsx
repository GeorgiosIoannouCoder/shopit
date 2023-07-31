import React from "react";
import { useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import { useGetUsersQuery, useDeleteUserMutation } from "../slices/userSlice";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginationn from "../components/Paginationn";
import Meta from "../components/Meta";

const UserListScreen = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, error, refetch } = useGetUsersQuery({
    pageNumber,
  });

  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Delete User?")) {
      try {
        await deleteUser(id);
        toast.success("User Deleted!");
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
      <h1>Users</h1>
      {loadingDelete && <Loader />}
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
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    {!user.isAdmin && (
                      <>
                        <LinkContainer
                          to={`/admin/user/${user._id}/edit`}
                          style={{ marginRight: "10px" }}
                        >
                          <Button variant="light" className="btn-sm">
                            <FaEdit />
                          </Button>
                        </LinkContainer>
                        <Button
                          variant="danger"
                          className="btn-sm"
                          onClick={() => deleteHandler(user._id)}
                        >
                          <FaTrash style={{ color: "white" }} />
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginationn
            pages={data.pages}
            page={data.page}
            isAdmin={true}
            isUser={true}
          />
        </>
      )}
    </>
  );
};

export default UserListScreen;
