import "./charInfo.scss";
import React, { useEffect, useState } from "react";
import MarvelService from "../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Loader from "../loader/Loader";
import Skeleton from "../skeleton/Skeleton";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CharInfo = ({ charId }) => {
  const [char, setChar] = useState(null);
  const { loader, error, clearError, getCharacter } = MarvelService();

  useEffect(() => {
    updateChar();
  }, []);

  useEffect(() => {
    updateChar();
  }, [charId]);

  const updateChar = () => {
    if (!charId) {
      return;
    }

    getCharacter(charId).then((char) => changeCharacter(char));
  };

  const changeCharacter = (char) => {
    setChar(char);
  };

  const skeleton = error || loader || char ? null : <Skeleton />;
  const err = error ? <ErrorMessage /> : null;
  const spinner = loader ? <Loader /> : null;
  const content = !(loader || error || !char) ? <View char={char} /> : null;

  return (
    <div className="char__info">
      {err}
      {spinner}
      {skeleton}
      {content}
    </div>
  );
};

const View = ({ char }) => {
  const { name, thumbnail, wiki, homepage, description, comicsList } = char;

  let imgStyle =
    thumbnail ===
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      ? { objectFit: "contain" }
      : { objectFit: "fill" };

  // comics list element
  const listElem = () => {
    return comicsList.map((elem, id) => {
      const comicLink =
        elem.resourceURI.split("/")[elem.resourceURI.split("/").length - 1];
      if (id > 9) return;
      return (
        <Link to={`comics/${comicLink}`} className="char__comics-item" key={id}>
          {elem.name}
        </Link>
      );
    });
  };
  // no comics
  const noComics = () => {
    return comicsList.length > 0 ? null : "There is no comics";
  };

  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={"name"} style={imgStyle} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {listElem()}
        {noComics()}
        {/* {comicsList.length > 0 ? null : "There is no comics"} */}
        {/* {comicsList.map((elem, id) => {
          const comicLink =
            elem.resourceURI.split("/")[elem.resourceURI.split("/").length - 1];
          if (id > 9) return;
          return (
            <Link
              to={`comics/${comicLink}`}
              className="char__comics-item"
              key={id}
            >
              {elem.name}
            </Link>
          );
        })} */}
      </ul>
    </>
  );
};

CharInfo.propTypes = {
  charId: PropTypes.number,
};
export default CharInfo;
