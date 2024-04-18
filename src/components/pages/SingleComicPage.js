import { Link, useParams } from "react-router-dom";
import "./singleComic.scss";
import { useEffect, useState } from "react";
import MarvelService from "../services/MarvelService";
import Loader from "../loader/Loader";
import ErrorMessage from "../errorMessage/ErrorMessage";
import finiteStateMashine from "../../utils/finiteStateMashine";

const SingleComic = ({ Component, dataType }) => {
  const [data, setData] = useState(null);
  // const [comic, setComic] = useState(null);
  const { comicId, oneCharNameId } = useParams();
  const {
    loader,
    error,
    clearError,
    getComic,
    getCharacter,
    process,
    setProcess,
  } = MarvelService();

  useEffect(() => {
    onChangeComic();
  }, [comicId]);

  const onChangeComic = () => {
    switch (dataType) {
      case "comics":
        getComic(comicId)
          .then(onSetComic)
          .then(() => setProcess("ready"));
        break;
      case "chatacter":
        getCharacter(oneCharNameId)
          .then(onSetComic)
          .then(() => setProcess("ready"));
        break;
    }
  };

  const onSetComic = (data) => {
    setData(data);
  };

  // const loading = loader ? <Loader /> : null;
  // const errorLoading = error ? <ErrorMessage /> : null;
  // const content = !(loading || errorLoading || !comic) ? (
  //   <Component comic={comic} />
  // ) : null;

  return (
    <>
      {finiteStateMashine(process, data, Component)}
      {/* {loading}
      {errorLoading}
      {content} */}
    </>
  );
};

// const View = ({ comic }) => {
//   const { title, thumbnail, price, description, pageCount } = comic;
//   // console.log(comic);
//   return (
//     // <div>{comic.title}</div>
//     <div className="single-comic">
//       <img src={thumbnail} alt={title} className="single-comic__img" />
//       <div className="single-comic__info">
//         <h2 className="single-comic__name">{title}</h2>
//         <p className="single-comic__descr">
//           {description ? description : "No description"}
//         </p>
//         <p className="single-comic__descr">{pageCount}</p>
//         <p className="single-comic__descr">Language: en-us</p>
//         <div className="single-comic__price">{price}</div>
//       </div>
//       <Link to={"/comics"} className="single-comic__back">
//         Back to all
//       </Link>
//     </div>
//   );
// };
export default SingleComic;
