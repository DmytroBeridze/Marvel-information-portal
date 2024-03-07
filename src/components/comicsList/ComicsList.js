import "./comicsList.scss";
import uw from "../../resources/img/UW.png";
import xMen from "../../resources/img/x-men.png";
import { useEffect, useState } from "react";
import MarvelService from "../services/MarvelService";
import Loader from "../loader/Loader";
import ErrorMessage from "../errorMessage/ErrorMessage";

const ComicsList = () => {
  const [char, setChar] = useState([]);
  const [offset, setOffset] = useState(210);
  const [newLoading, setNewLoading] = useState(false);
  const { loader, error, clearError, getComics } = MarvelService();

  useEffect(() => {
    onLoadCharacters(offset, true);
  }, []);

  const onLoadCharacters = (offset, inst) => {
    inst ? setNewLoading(false) : setNewLoading(true);

    clearError();
    getComics(offset).then((comics) => setCharState(comics));
  };

  const setCharState = (comics) => {
    setChar((char) => [...char, ...comics]);
    setOffset((offset) => offset + 9);
    setNewLoading(false);
  };

  const comicsElement = () => {
    const element = char.map((comics, i) => {
      const { id, price, thumbnail, title, url } = comics;
      return (
        <li className="comics__item" key={id + i}>
          <a href={url}>
            <img src={thumbnail} alt={title} className="comics__item-img" />
            <div className="comics__item-name">${title}</div>
            <div className="comics__item-price">${price}</div>
          </a>
        </li>
      );
    });
    return <ul className="comics__grid">{element}</ul>;
  };

  const errorLoading = error ? <ErrorMessage /> : null;
  const spinner = loader && !newLoading ? <Loader /> : null;
  const content = comicsElement();
  return (
    <div className="comics__list">
      {/* <ul className="comics__grid"> */}
      {errorLoading}
      {spinner}
      {content}
      {/* </ul> */}
      <button
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
