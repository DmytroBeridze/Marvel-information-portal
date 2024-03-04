import "./charList.scss";
import abyss from "../../resources/img/abyss.jpg";
import MarvelService from "../services/MarvelService";
import React from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Loader from "../loader/Loader";
import PropTypes from "prop-types";

class CharList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      char: [],
      error: false,
      spinner: true,
      // offset: 1548,
      offset: 210,
      loading: false,
      charEned: false,
    };
  }

  marvelService = new MarvelService();

  componentDidMount() {
    this.onLoadCharacters();
  }

  onCharLoading = () => {
    this.setState({ loading: true });
  };

  onLoadCharacters = (offset) => {
    this.onCharLoading();
    this.marvelService
      .getAllCharacters(offset)
      .then((char) => this.onCharLoaded(char))
      .catch(this.onError);
  };

  onCharLoaded = (newChar) => {
    let ended = false;
    if (newChar.length < 9) {
      ended = true;
    }

    this.setState(({ char, offset }) => ({
      char: [...char, ...newChar],
      spinner: false,
      offset: offset + 9,
      loading: false,
      charEned: ended,
    }));
  };

  onError = () => {
    this.setState({ error: true, spinner: false });
  };

  arrRefs = [];
  getReffs = (elem) => {
    this.arrRefs.push(elem);
  };
  addStyle = (i) => {
    this.arrRefs.forEach((elem) =>
      elem.classList.remove("char__item_selected")
    );
    this.arrRefs[i].classList.add("char__item_selected");
  };

  renderCard = (arr) => {
    const card = arr.map((elem, i) => {
      let imgStyle =
        elem.thumbnail ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
          ? { objectFit: "unset" }
          : { objectFit: "cover" };
      return (
        <li
          className="char__item"
          key={elem.id}
          ref={this.getReffs}
          onClick={(e) => {
            this.props.getCharId(elem.id);
            this.addStyle(i);
          }}
          tabIndex={1}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              this.props.getCharId(elem.id);
              this.addStyle(i);
            }
          }}
        >
          <img src={elem.thumbnail} alt="abyss" style={imgStyle} />
          <div className="char__name">{elem.name}</div>
        </li>
      );
    });
    return <ul className="char__grid">{card}</ul>;
  };

  render() {
    // console.log(this.state.char);
    const { error, spinner, char, offset, loading, charEned } = this.state;
    const err = error ? <ErrorMessage /> : null;
    const load = spinner ? <Loader /> : null;
    const content = !(err || load) ? this.renderCard(char) : null;
    return (
      <div
        className="char__list"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {err}
        {load}
        {content}
        <button
          className="button button__main button__long"
          onClick={() => this.onLoadCharacters(offset)}
          disabled={loading}
          style={{ display: charEned ? "none" : "block" }}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

CharList.propTypes = {
  getCharId: PropTypes.func,
};

export default CharList;
