import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
const SingleComicPageElement = ({ comic }) => {
  const { title, thumbnail, price, description, pageCount } = comic;

  return (
    <div className="single-comic">
      <Helmet>
        <meta name="Main page" content="Marvel information portal main page" />
        <title>{title}</title>
      </Helmet>
      <img src={thumbnail} alt={title} className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__descr">
          {description ? description : "No description"}
        </p>
        <p className="single-comic__descr">{pageCount}</p>
        <p className="single-comic__descr">Language: en-us</p>
        <div className="single-comic__price">{price}</div>
      </div>
      <Link to={"/comics"} className="single-comic__back">
        Back to all
      </Link>
    </div>
  );
};

export default SingleComicPageElement;
