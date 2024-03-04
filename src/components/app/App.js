import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from "../../resources/img/vision.png";
import React from "react";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      charId: null,
    };
  }

  getCharId = (id) => {
    this.setState({ charId: id });
  };

  render() {
    const { charId } = this.state;
    return (
      <div className="app">
        <AppHeader />
        <main>
          <RandomChar />
          <div className="char__content">
            <CharList getCharId={this.getCharId} />
            <ErrorBoundary>
              <CharInfo charId={charId} />
            </ErrorBoundary>
          </div>
          <img className="bg-decoration" src={decoration} alt="vision" />
        </main>
      </div>
    );
  }
}

// class App extends React.Component {
//   constructor(props) {
//     super(props);

//   }
//   render() {
//     return (
//       <div className="app">
//         <AppHeader />
//         <main>
//           <RandomChar />
//           <div className="char__content">
//             <CharList />
//             <CharInfo />
//           </div>
//           <img className="bg-decoration" src={decoration} alt="vision" />
//         </main>
//       </div>
//     );
//   }
// }

export default App;
