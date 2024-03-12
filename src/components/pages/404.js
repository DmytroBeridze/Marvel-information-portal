import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";

const NoMatch = () => {
  return (
    <>
      <ErrorMessage />
      <p style={{ textAlign: "center", color: "#9F0013", fontSize: "24px" }}>
        Page does not exist
      </p>
      <Link
        to="/"
        style={{ display: "block", margin: "20px auto", textAlign: "center" }}
      >
        Return to main page
      </Link>
    </>
  );
};
export default NoMatch;
