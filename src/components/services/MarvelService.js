import useHttp from "../../hooks/http.hook";

const MarvelService = () => {
  const _host = "https://gateway.marvel.com:443/v1/public/";
  const _apiKey = "de76fd2c658ceccbb74af7917c6a7df1";

  const { request, loader, error, clearError } = useHttp();

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
    console.log(offset);
    const response = await request(
      `${_host}/comics?limit=8&offset=${offset}&apikey=${_apiKey}`
    );

    return response.data.results.map((res) => _transformComics(res));
  };
  const _transformComics = (res) => {
    const { id, title, thumbnail, prices, urls } = res;
    return {
      title: title,
      thumbnail: thumbnail.path + "." + thumbnail.extension,
      id: id,
      price: prices[0].price,
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
  };
};
export default MarvelService;
