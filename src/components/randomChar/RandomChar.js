import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";
import React, { useEffect, useState } from "react";
import MarvelService from "../services/MarvelService";
import Loader from "../loader/Loader";
import ErrorMessage from "../errorMessage/ErrorMessage";

const RandomChar = () => {
  const [char, setChar] = useState({});
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);
  // const [imageStyle, setImageStyle] = useState("cover");

  useEffect(() => {
    updateCharacter();
  }, []);

  const onError = (err) => {
    setLoader(false);
    setError(true);
  };

  const marvelService = new MarvelService();

  const onCharLoaded = (char) => {
    setChar(char);
    setLoader(false);
  };
  // для отображения спиннера при нажатии на кнопку TRY IT
  const onCharLoading = () => {
    setLoader(true);
  };

  const updateCharacter = () => {
    onCharLoading();
    const randomId = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    marvelService
      .getCharacter(randomId)
      .then((res) => {
        onCharLoaded(res);
      })
      .catch(() => onError());
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loader ? <Loader /> : null;
  const content = !(error || loader) ? <View char={char} /> : null;

  return (
    <div className="randomchar">
      {errorMessage}
      {spinner}
      {content}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button className="button button__main">
          <div className="inner" onClick={updateCharacter}>
            try it
          </div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki } = char;

  const imgStyle = () => {
    if (thumbnail.includes("image_not_available")) {
      return "contain";
    } else return "cover";
  };

  return (
    <div className="randomchar__block">
      <img
        src={thumbnail}
        alt="Random character"
        className="randomchar__img"
        style={{ objectFit: imgStyle() }}
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
