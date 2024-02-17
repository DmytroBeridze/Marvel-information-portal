import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";
import React from "react";
import MarvelService from "../services/MarvelService";
import Loader from "../loader/Loader";
import ErrorMessage from "../errorMessage/ErrorMessage";

class RandomChar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      char: {},
      loader: true,
      error: false,
      // name: null,
      // description: null,
      // thumbnail: null,
      // homepage: null,
      // wiki: null,
    };
    this.updateCharacter();
  }
  onError = (err) => {
    this.setState({ loader: false, error: true });
  };

  marvelService = new MarvelService();
  onCharLoaded = (char) => {
    this.setState({ char, loader: false });
  };

  updateCharacter = () => {
    const randomId = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    this.marvelService
      .getCharacter(randomId)
      .then((res) => {
        this.onCharLoaded(res);
      })
      .catch(() => this.onError());
  };

  render() {
    const { char, loader, error } = this.state;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loader ? <Loader /> : null;
    const content = !(error || loader) ? <View char={char} /> : null;
    return (
      <div className="randomchar">
        {/* {loader ? <Loader /> : <View char={char} />} */}
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
            <div className="inner">try it</div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    );
  }
}

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki } = char;
  return (
    <div className="randomchar__block">
      <img src={thumbnail} alt="Random character" className="randomchar__img" />
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
