import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";

const NoMatch = () => {
  const navigate = useNavigate();

  return (
    <>
      <ErrorMessage />
      <p style={{ textAlign: "center", color: "#9F0013", fontSize: "24px" }}>
        Page does not exist
      </p>
      <Link
        to={navigate(-1)}
        style={{ display: "block", margin: "20px auto", textAlign: "center" }}
      >
        Go back
      </Link>
    </>
  );
};
export default NoMatch;
