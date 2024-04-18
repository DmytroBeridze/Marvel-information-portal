import "./comicsList.scss";
import { useEffect, useState } from "react";
import MarvelService from "../services/MarvelService";
import Loader from "../loader/Loader";
import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";

// finite-state machine
const finiteStateMashine = (state, loading, Component) => {
  switch (state) {
    case "waiting":
      return <Loader />;
    case "loading":
      return loading ? <Component /> : <Loader />;
    case "error":
      return <ErrorMessage />;
    case "ready":
      return <Component />;

    default:
      throw new Error("Wrong state");
  }
};

const ComicsList = () => {
  const [char, setChar] = useState([]);
  const [offset, setOffset] = useState(210);
  // const [offset, setOffset] = useState(59423);
  const [newLoading, setNewLoading] = useState(false);
  const [comicsEnded, setcomicsEnded] = useState(false);
  const { loader, error, clearError, getComics, process, setProcess } =
    MarvelService();

  useEffect(() => {
    onLoadCharacters(offset, true);
  }, []);

  const onLoadCharacters = (offset, inst) => {
    inst ? setNewLoading(false) : setNewLoading(true);

    clearError();
    getComics(offset)
      .then((comics) => setCharState(comics))
      .then(() => setProcess("ready"));
  };

  const setCharState = (comics) => {
    // let ended = false;
    // if (comics.length < 8) {
    //   ended = true;
    // }

    setChar((char) => [...char, ...comics]);
    setOffset((offset) => offset + 8);
    setNewLoading(false);
    comics.length < 8 ? setcomicsEnded(true) : setcomicsEnded(false);
  };

  const comicsElement = () => {
    const element = char.map((comics, i) => {
      const { id, price, thumbnail, title, url } = comics;

      return (
        <li className="comics__item" key={id + i}>
          <Link to={`/comics/${id}`}>
            <img src={thumbnail} alt={title} className="comics__item-img" />
            <div className="comics__item-name">${title}</div>
            <div className="comics__item-price">${price}</div>
          </Link>
        </li>
      );
    });
    return <ul className="comics__grid">{element}</ul>;
  };

  // const errorLoading = error ? <ErrorMessage /> : null;
  // const spinner = loader && !newLoading ? <Loader /> : null;
  // const content = comicsElement();

  return (
    <div className="comics__list">
      {finiteStateMashine(process, newLoading, comicsElement)}

      {/* {errorLoading}
      {spinner}
      {content} */}

      <button
        style={{ display: comicsEnded ? "none" : "block" }}
        disabled={newLoading ? true : false}
        className="button button__main button__long"
        onClick={() => onLoadCharacters(offset)}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;

// const ComicsList = () => {

//     return (
//         <div className="comics__list">
//             <ul className="comics__grid">
//                 <li className="comics__item">
//                     <a href="#">
//                         <img src={uw} alt="ultimate war" className="comics__item-img"/>
//                         <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
//                         <div className="comics__item-price">9.99$</div>
//                     </a>
//                 </li>
//                 <li className="comics__item">
//                     <a href="#">
//                         <img src={xMen} alt="x-men" className="comics__item-img"/>
//                         <div className="comics__item-name">X-Men: Days of Future Past</div>
//                         <div className="comics__item-price">NOT AVAILABLE</div>
//                     </a>
//                 </li>
//                 <li className="comics__item">
//                     <a href="#">
//                         <img src={uw} alt="ultimate war" className="comics__item-img"/>
//                         <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
//                         <div className="comics__item-price">9.99$</div>
//                     </a>
//                 </li>
//                 <li className="comics__item">
//                     <a href="#">
//                         <img src={xMen} alt="x-men" className="comics__item-img"/>
//                         <div className="comics__item-name">X-Men: Days of Future Past</div>
//                         <div className="comics__item-price">NOT AVAILABLE</div>
//                     </a>
//                 </li>
//                 <li className="comics__item">
//                     <a href="#">
//                         <img src={uw} alt="ultimate war" className="comics__item-img"/>
//                         <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
//                         <div className="comics__item-price">9.99$</div>
//                     </a>
//                 </li>
//                 <li className="comics__item">
//                     <a href="#">
//                         <img src={xMen} alt="x-men" className="comics__item-img"/>
//                         <div className="comics__item-name">X-Men: Days of Future Past</div>
//                         <div className="comics__item-price">NOT AVAILABLE</div>
//                     </a>
//                 </li>
//                 <li className="comics__item">
//                     <a href="#">
//                         <img src={uw} alt="ultimate war" className="comics__item-img"/>
//                         <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
//                         <div className="comics__item-price">9.99$</div>
//                     </a>
//                 </li>
//                 <li className="comics__item">
//                     <a href="#">
//                         <img src={xMen} alt="x-men" className="comics__item-img"/>
//                         <div className="comics__item-name">X-Men: Days of Future Past</div>
//                         <div className="comics__item-price">NOT AVAILABLE</div>
//                     </a>
//                 </li>
//             </ul>
//             <button className="button button__main button__long">
//                 <div className="inner">load more</div>
//             </button>
//         </div>
//     )
// }

// export default ComicsList;
