import "./charList.scss";
import abyss from "../../resources/img/abyss.jpg";
import MarvelService from "../services/MarvelService";
import React from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Loader from "../loader/Loader";
import PropTypes from "prop-types";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const CharList = ({ getCharId }) => {
  const [char, setChar] = useState([]);
  const [offset, setOffset] = useState(210);
  const [loading, setLoading] = useState(false);
  const [charEned, setCharEned] = useState(false);
  const { loader, error, clearError, getAllCharacters } = MarvelService();

  const nodeRef = useRef(null);

  useEffect(() => {
    onLoadCharacters(offset, true);
  }, []);

  const onLoadCharacters = (offset, inst) => {
    inst ? setLoading(false) : setLoading(true);
    getAllCharacters(offset).then((char) => {
      onCharLoaded(char);
      console.log(char);
    });
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

  render() {
    console.log(this.state.char);
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

