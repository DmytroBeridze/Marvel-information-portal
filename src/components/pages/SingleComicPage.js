import { Link, useParams } from "react-router-dom";
import "./singleComic.scss";
import { useEffect, useState } from "react";
import MarvelService from "../services/MarvelService";
import Loader from "../loader/Loader";
import ErrorMessage from "../errorMessage/ErrorMessage";
const SingleComic = () => {
  const [comic, setComic] = useState(null);
  const { comicId } = useParams();
  const { loader, error, clearError, getComic } = MarvelService();

  useEffect(() => {
    // console.log("Render");
    onChangeComic();
  }, [comicId]);

  const onChangeComic = () => {
    getComic(comicId).then(onSetComic);
  };

  const onSetComic = (comic) => {
    setComic(comic);
  };

  const loading = loader ? <Loader /> : null;
  const errorLoading = error ? <ErrorMessage /> : null;
  const content = !(loading || errorLoading || !comic) ? (
    <View comic={comic} />
  ) : null;

  return (
    <>
      {loading}
      {errorLoading}
      {content}
    </>
  );
};

const View = ({ comic }) => {
  const { title, thumbnail, price, description, pageCount } = comic;
  // console.log(comic);
  return (
    // <div>{comic.title}</div>
    <div className="single-comic">
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
export default SingleComic;
