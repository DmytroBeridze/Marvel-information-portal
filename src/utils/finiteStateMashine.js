import Skeleton from "../components/skeleton/Skeleton.js";
import Loader from "../components/loader/Loader.js";
import ErrorMessage from "../components/errorMessage/ErrorMessage.js";
import View from "../";

const finiteStateMashine = (state, data, Component) => {
  switch (state) {
    case "waiting":
      return <Skeleton />;
    case "loading":
      return <Loader />;
    case "error":
      return <ErrorMessage />;
    case "ready":
      return <Component data={data} />;

    default:
      throw new Error("Wrong state");
  }
};

export default finiteStateMashine;
