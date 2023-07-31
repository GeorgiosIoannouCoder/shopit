import { Helmet } from "react-helmet-async";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "ShopIt | Spend Less | Smile More",
  description: "ShopIt | Spend Less | Smile More",
  keywords: "ShopIt | Spend Less | Smile More",
};

export default Meta;
