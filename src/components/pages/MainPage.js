import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import decoration from "../../resources/img/vision.png";
import { useState } from "react";
import FindOneCharacterForm from "../findOneCharacterForm/FindOneCharacterForm";
import { Helmet } from "react-helmet";

const MainPage = () => {
  const [charId, setCharId] = useState(null);

  const getCharId = (id) => {
    setCharId(id);
  };

  return (
    <>
      {/* Helmet */}
      <Helmet>
        <meta name="Main page" content="Marvel information portal main page" />
        <title>Marvel main</title>
      </Helmet>

      <RandomChar />
      <div className="char__content">
        <CharList getCharId={getCharId} />
        <ErrorBoundary>
          <div>
            <CharInfo charId={charId} />
            <FindOneCharacterForm />
          </div>
        </ErrorBoundary>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  );
};
export default MainPage;
