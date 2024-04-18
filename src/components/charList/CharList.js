import "./charList.scss";
import MarvelService from "../services/MarvelService";
import React, { useEffect, useRef, useState } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Loader from "../loader/Loader";
import PropTypes from "prop-types";
import { CSSTransition, TransitionGroup } from "react-transition-group";

// import finiteStateMashine from "../../utils/finiteStateMashine";

//  Ініціалізуємо finiteStateMashine тут, а не в finiteStateMashine.js, тому що
//  в цьому модулі дещо інша логіка (спіннер з'являється тільки при першому
//  завантаженні, за це відповідає - const [loading, setLoading] = useState(false);)
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

const CharList = ({ getCharId }) => {
  const [char, setChar] = useState([]);
  const [offset, setOffset] = useState(210);
  const [loading, setLoading] = useState(false);
  const [charEned, setCharEned] = useState(false);

  const { loader, error, clearError, getAllCharacters, process, setProcess } =
    MarvelService();

  const nodeRef = useRef(null);

  useEffect(() => {
    onLoadCharacters(offset, true);
  }, []);

  const onLoadCharacters = (offset, inst) => {
    inst ? setLoading(false) : setLoading(true);
    getAllCharacters(offset)
      .then((char) => {
        onCharLoaded(char);
      })
      .then(() => setProcess("ready"));
  };

  const onCharLoaded = (newChar) => {
    let ended = false;
    if (newChar.length < 9) {
      ended = true;
    }
    setChar((char) => [...char, ...newChar]);
    setOffset((offset) => offset + 9);
    setLoading(false);
    setCharEned(ended);
  };

  const arrRef = useRef([]);

  const addStyle = (i) => {
    arrRef.current.forEach((elem) => {
      elem.classList.remove("char__item_selected");
    });
    arrRef.current[i].classList.add("char__item_selected");
  };

  const renderCard = (arr) => {
    const card = arr.map((elem, i) => {
      let imgStyle =
        elem.thumbnail ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
          ? { objectFit: "unset" }
          : { objectFit: "cover" };
      return (
        // transition group
        <CSSTransition key={elem.id} timeout={500} classNames="char__item">
          <li
            className="char__item"
            key={elem.id}
            ref={(elem) => (arrRef.current[i] = elem)}
            onClick={(e) => {
              getCharId(elem.id);
              addStyle(i);
            }}
            tabIndex={1}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                getCharId(elem.id);
                addStyle(i);
              }
            }}
          >
            <img src={elem.thumbnail} alt="abyss" style={imgStyle} />
            <div className="char__name">{elem.name}</div>
          </li>
        </CSSTransition>
      );
    });
    return (
      <ul className="char__grid">
        <TransitionGroup component={null}>{card}</TransitionGroup>
      </ul>
    );
  };

  // const err = error ? <ErrorMessage /> : null;
  // const load = loader && !loading ? <Loader /> : null;
  // const content = !(err || load) ? renderCard(char) : null;

  return (
    <div
      className="char__list"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {finiteStateMashine(process, loading, () => renderCard(char))}
      {/* {err}
      {load}
      {content} */}
      <button
        className="button button__main button__long"
        onClick={() => onLoadCharacters(offset)}
        disabled={loading}
        style={{ display: charEned ? "none" : "block" }}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

CharList.propTypes = {
  getCharId: PropTypes.func,
};

export default CharList;

// import "./charList.scss";
// import MarvelService from "../services/MarvelService";
// import React, { useEffect, useRef, useState } from "react";
// import ErrorMessage from "../errorMessage/ErrorMessage";
// import Loader from "../loader/Loader";
// import PropTypes from "prop-types";

// const CharList = ({ getCharId }) => {
//   const [char, setChar] = useState([]);
//   const [offset, setOffset] = useState(210);
//   const [loading, setLoading] = useState(false);
//   const [charEned, setCharEned] = useState(false);
//   const { loader, error, clearError, getAllCharacters } = MarvelService();

//   useEffect(() => {
//     onLoadCharacters(offset, true);
//   }, []);

//   const onLoadCharacters = (offset, inst) => {
//     inst ? setLoading(false) : setLoading(true);
//     getAllCharacters(offset).then((char) => onCharLoaded(char));
//   };

//   const onCharLoaded = (newChar) => {
//     let ended = false;
//     if (newChar.length < 9) {
//       ended = true;
//     }
//     setChar((char) => [...char, ...newChar]);
//     setOffset((offset) => offset + 9);
//     setLoading(false);
//     setCharEned(ended);
//   };

//   const arrRef = useRef([]);

//   const addStyle = (i) => {
//     arrRef.current.forEach((elem) => {
//       elem.classList.remove("char__item_selected");
//     });
//     arrRef.current[i].classList.add("char__item_selected");
//   };

//   const renderCard = (arr) => {
//     const card = arr.map((elem, i) => {
//       let imgStyle =
//         elem.thumbnail ===
//         "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
//           ? { objectFit: "unset" }
//           : { objectFit: "cover" };
//       return (
//         <li
//           className="char__item"
//           key={elem.id}
//           ref={(elem) => (arrRef.current[i] = elem)}
//           onClick={(e) => {
//             getCharId(elem.id);
//             addStyle(i);
//           }}
//           tabIndex={1}
//           onKeyDown={(e) => {
//             if (e.key === "Enter" || e.key === " ") {
//               getCharId(elem.id);
//               addStyle(i);
//             }
//           }}
//         >
//           <img src={elem.thumbnail} alt="abyss" style={imgStyle} />
//           <div className="char__name">{elem.name}</div>
//         </li>
//       );
//     });
//     return <ul className="char__grid">{card}</ul>;
//   };

//   const err = error ? <ErrorMessage /> : null;
//   const load = loader && !loading ? <Loader /> : null;
//   const content = !(err || load) ? renderCard(char) : null;

//   return (
//     <div
//       className="char__list"
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//       }}
//     >
//       {err}
//       {load}
//       {content}
//       <button
//         className="button button__main button__long"
//         onClick={() => onLoadCharacters(offset)}
//         disabled={loading}
//         style={{ display: charEned ? "none" : "block" }}
//       >
//         <div className="inner">load more</div>
//       </button>
//     </div>
//   );
// };

// CharList.propTypes = {
//   getCharId: PropTypes.func,
// };

// export default CharList;
