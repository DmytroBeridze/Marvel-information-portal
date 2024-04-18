import { useParams } from "react-router-dom";
import MarvelService from "../services/MarvelService";
import { useEffect, useRef, useState } from "react";
import "./findOneCharacterPage.scss";
// ---------------перейменування змінної для зручності з comic в data
const FindOneCharacterPage = ({ data }) => {
  // const nodeRef = useRef(null);

  return (
    <div className="single-comic ">
      <img src={data.thumbnail} alt={data.name} className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{data.name}</h2>
        <p className="single-comic__descr">
          {data.description ? data.description : "No description"}
        </p>
      </div>
    </div>
  );
};
export default FindOneCharacterPage;

// const FindOneCharacterPage = () => {
//   const [char, setChar] = useState({});
//   const { oneCharNameId } = useParams();
//   const { getCharacter } = MarvelService();

//   useEffect(() => {
//     getOneCharacterData();
//   }, []);

//   const getOneCharacterData = () => {
//     getCharacter(oneCharNameId).then((data) => setChar(data));
//   };

//   return (
//     <div className="single-comic">
//       <img src={char.thumbnail} alt={char.name} className="single-comic__img" />
//       <div className="single-comic__info">
//         <h2 className="single-comic__name">{char.name}</h2>
//         <p className="single-comic__descr">
//           {char.description ? char.description : "No description"}
//         </p>
//       </div>
//     </div>
//   );
// };
// export default FindOneCharacterPage;
