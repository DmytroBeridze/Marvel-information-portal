import useHttp from "../../hooks/http.hook";

const MarvelService = () => {
  const _host = "https://gateway.marvel.com:443/v1/public/";
  const _apiKey = "de76fd2c658ceccbb74af7917c6a7df1";

  const { request, loader, error, clearError } = useHttp();

  // getResource = async (url) => {
  //   const response = await fetch(url);
  //   if (!response.ok) {
  //     throw new Error(`Not fetch ${url}, ststus ${response.status}`);
  //   }
  //   return await response.json();
  // };

  const getAllCharacters = async (offset = 210) => {
    const res = await request(
      `${_host}characters?limit=9&offset=${offset}&apikey=${_apiKey}`
    );

    return res.data.results.map((elem) => _transformCharacter(elem));
  };

  const getCharacter = async (id) => {
    const resource = await request(
      `${_host}characters/${id}?apikey=${_apiKey}`
    );
    console.log(resource);
    return _transformCharacter(resource.data.results[0]);
  };

  const _transformCharacter = (res) => {
    return {
      name: res.name,
      description: res.description
        ? res.description.slice(0, 200) + "..."
        : "No Description",
      thumbnail: res.thumbnail.path + "." + res.thumbnail.extension,
      homepage: res.urls[0].url,
      wiki: res.urls[1].url,
      id: res.id,
      comicsList: res.comics.items,
    };
  };
  return { loader, error, clearError, getAllCharacters, getCharacter };
};
export default MarvelService;
// export default class MarvelService {
//   _host = "https://gateway.marvel.com:443/v1/public/";
//   _apiKey = "de76fd2c658ceccbb74af7917c6a7df1";

//   getResource = async (url) => {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`Not fetch ${url}, ststus ${response.status}`);
//     }
//     return await response.json();
//   };

//   getAllCharacters = async (offset = 210) => {
//     const res = await this.getResource(
//       `${this._host}characters?limit=9&offset=${offset}&apikey=${this._apiKey}`
//     );

//     return res.data.results.map((elem) => this._transformCharacter(elem));
//   };

//   getCharacter = async (id) => {

//     const resource = await this.getResource(
//       `${this._host}characters/${id}?apikey=${this._apiKey}`
//     );
//     return this._transformCharacter(resource.data.results[0]);
//   };

//   _transformCharacter = (res) => {
//     return {
//       name: res.name,
//       description: res.description
//         ? res.description.slice(0, 200) + "..."
//         : "No Description",
//       thumbnail: res.thumbnail.path + "." + res.thumbnail.extension,
//       homepage: res.urls[0].url,
//       wiki: res.urls[1].url,
//       id: res.id,
//       comicsList: res.comics.items,
//     };
//   };
// }
