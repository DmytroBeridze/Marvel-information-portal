import useHttp from "../../hooks/http.hook";

const MarvelService = () => {
  const _host = "https://gateway.marvel.com:443/v1/public/";
  const _apiKey = "de76fd2c658ceccbb74af7917c6a7df1";

  const { request, loader, error, clearError, process, setProcess } = useHttp();

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
    return _transformCharacter(resource.data.results[0]);
  };

  const getComics = async (offset = 210) => {
    const response = await request(
      `${_host}comics?limit=8&offset=${offset}&apikey=${_apiKey}`
    );
    return response.data.results.map((res) => _transformComics(res));
  };

  const getComic = async (comicId) => {
    const response = await request(
      `${_host}comics/${comicId}?apikey=${_apiKey}`
    );
    return _transformComics(response.data.results[0]);
  };

  // search one character by name
  const findOneCharacterByName = async (name) => {
    const response = await request(
      `${_host}characters?name=${name}&apikey=${_apiKey}`
    );
    return response.data.results;
  };

  const _transformComics = (res) => {
    const {
      id,
      title,
      thumbnail,
      prices,
      urls,
      description,
      pageCount,
      language,
    } = res;
    return {
      title,
      description,
      thumbnail: thumbnail.path + "." + thumbnail.extension,
      id,
      pageCount,
      price: prices[0].price || " No available",
      url: urls[0].url,
    };
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

  return {
    loader,
    error,
    clearError,
    getAllCharacters,
    getCharacter,
    getComics,
    getComic,
    findOneCharacterByName,
    process,
    setProcess,
  };
};
export default MarvelService;
