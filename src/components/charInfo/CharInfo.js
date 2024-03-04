import "./charInfo.scss";
import thor from "../../resources/img/thor.jpeg";
import React from "react";
import MarvelService from "../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Loader from "../loader/Loader";
import Skeleton from "../skeleton/Skeleton";
import PropTypes from "prop-types";

class CharInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      char: null,
      error: false,
      spinner: false,
    };
  }

  marvelService = new MarvelService();

  componentDidMount() {
    this.updateChar();
  }

  componentDidUpdate(prevProps) {
    if (this.props.charId !== prevProps.charId) {
      this.updateChar();
    }
  }
  updateChar = () => {
    if (!this.props.charId) {
      return;
    }
    this.loading();
    this.marvelService
      .getCharacter(this.props.charId)
      .then((char) => this.changeCharacter(char))
      .catch(this.loadError);
  };

  changeCharacter = (char) => {
    this.setState({ char, spinner: false });
  };

  loadError = () => {
    this.setState({ error: true, spinner: false });
  };
  loading = () => {
    this.setState({ spinner: true });
  };
  render() {
    const { error, spinner, char } = this.state;
    const skeleton = error || spinner || char ? null : <Skeleton />;
    const err = error ? <ErrorMessage /> : null;
    const loader = spinner ? <Loader /> : null;
    const content = !(spinner || error || !char) ? <View char={char} /> : null;
    // let content = null;
    // if (!err || !loader || char) {
    //   content = <View char={char} />;
    // } else content = null;

    return (
      <div className="char__info">
        {err}
        {loader}
        {skeleton}
        {content}
      </div>
    );
  }
}

const View = ({ char }) => {
  const { name, thumbnail, wiki, homepage, description, comicsList } = char;
  let imgStyle =
    thumbnail ===
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      ? { objectFit: "contain" }
      : { objectFit: "fill" };

  // let elem = <li className="char__comics-item">Nothing found </li>;
  // if (comicsList.length > 0) {
  //   elem = comicsList.slice(0, 10).map((elem, id) => {
  //     return (
  //       <li className="char__comics-item" key={id}>
  //         {elem.name}
  //       </li>
  //     );
  //   });
  // }
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
        {comicsList.length > 0 ? null : "There is no comics"}
        {
          comicsList.map((elem, id) => {
            if (id > 9) return;
            return (
              <li className="char__comics-item" key={id}>
                {elem.name}
              </li>
            );
          })

          // comicsList.slice(0, 10).map((elem, id) => (
          //   <li className="char__comics-item" key={id}>
          //     {elem.name}
          //   </li>
          // ))
        }
      </ul>
    </>
  );
};

CharInfo.propTypes = {
  charId: PropTypes.number,
};
export default CharInfo;

// class CharInfo extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     return (
//       <div className="char__info">
//         <div className="char__basics">
//           <img src={thor} alt="abyss" />
//           <div>
//             <div className="char__info-name">thor</div>
//             <div className="char__btns">
//               <a href="#" className="button button__main">
//                 <div className="inner">homepage</div>
//               </a>
//               <a href="#" className="button button__secondary">
//                 <div className="inner">Wiki</div>
//               </a>
//             </div>
//           </div>
//         </div>
//         <div className="char__descr">
//           In Norse mythology, Loki is a god or jötunn (or both). Loki is the son
//           of Fárbauti and Laufey, and the brother of Helblindi and Býleistr. By
//           the jötunn Angrboða, Loki is the father of Hel, the wolf Fenrir, and
//           the world serpent Jörmungandr. By Sigyn, Loki is the father of Nari
//           and/or Narfi and with the stallion Svaðilfari as the father, Loki gave
//           birth—in the form of a mare—to the eight-legged horse Sleipnir. In
//           addition, Loki is referred to as the father of Váli in the Prose Edda.
//         </div>
//         <div className="char__comics">Comics:</div>
//         <ul className="char__comics-list">
//           <li className="char__comics-item">
//             All-Winners Squad: Band of Heroes (2011) #3
//           </li>
//           <li className="char__comics-item">Alpha Flight (1983) #50</li>
//           <li className="char__comics-item">Amazing Spider-Man (1999) #503</li>
//           <li className="char__comics-item">Amazing Spider-Man (1999) #504</li>
//           <li className="char__comics-item">
//             AMAZING SPIDER-MAN VOL. 7: BOOK OF EZEKIEL TPB (Trade Paperback)
//           </li>
//           <li className="char__comics-item">
//             Amazing-Spider-Man: Worldwide Vol. 8 (Trade Paperback)
//           </li>
//           <li className="char__comics-item">
//             Asgardians Of The Galaxy Vol. 2: War Of The Realms (Trade Paperback)
//           </li>
//           <li className="char__comics-item">Vengeance (2011) #4</li>
//           <li className="char__comics-item">Avengers (1963) #1</li>
//           <li className="char__comics-item">Avengers (1996) #1</li>
//         </ul>
//       </div>
//     );
//   }
// }
