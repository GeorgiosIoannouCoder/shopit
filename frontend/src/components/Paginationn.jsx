import { LinkContainer } from "react-router-bootstrap";
import { Pagination } from "react-bootstrap";

const Paginationn = ({
  pages,
  page,
  isAdmin = false,
  isUser = false,
  isProduct = false,
  isOrder = false,
  keyword = "",
}) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              isAdmin && isProduct
                ? `/admin/productlist/page/${x + 1}`
                : isAdmin && isUser
                ? `/admin/userlist/page/${x + 1}`
                : isAdmin && isOrder
                ? `/admin/orderlist/page/${x + 1}`
                : keyword
                ? `/search/${keyword}/page/${x + 1}`
                : `/page/${x + 1}`
            }
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default Paginationn;
