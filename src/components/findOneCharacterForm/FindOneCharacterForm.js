import { useState } from "react";
import "./findOneCharacterForm.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import MarvelService from "../../components/services/MarvelService";
import { Link } from "react-router-dom";
import { object, string } from "yup";

const FindOneCharacterForm = () => {
  const [charName, setCharName] = useState("");
  const { loader, error, clearError, findOneCharacterByName } = MarvelService();

  const loading = loader ? (
    <div style={{ marginTop: "10px" }}>loding...</div>
  ) : null;
  const result =
    !charName && loader ? null : charName.length > 0 ? (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <div
          style={{
            color: "green",
            marginTop: "24px",
          }}
        >
          {`There is! Visit ${charName[0].name} page?`}
        </div>
        <Link to={`/${charName[0].id}`} className="button button__secondary">
          <div className="inner">visit </div>
        </Link>
      </div>
    ) : (
      <div style={{ color: "red", marginTop: "24px" }}>
        {`The character was not found. Check the name and try again`}
      </div>
    );

  const searchCharacter = (values) => {
    clearError();
    findOneCharacterByName(values.name).then((data) => {
      setCharName(data);
    });
  };
  return (
    <div className="one-character-form">
      <h2 className="one-character-form__title">
        Or find a character by name:
      </h2>
      <Formik
        initialValues={{
          name: "",
        }}
        validationSchema={object({
          name: string()
            .required("This place is required")
            .min(2, "Too Short!"),
        })}
        onSubmit={(values, { resetForm }) => {
          searchCharacter(values);
          resetForm();
        }}
      >
        <Form action="">
          <Field
            type="text"
            className="one-character-form__input"
            placeholder="Enter name"
            name="name"
          />
          <button type="submit" className="button button__main">
            <div className="inner">find </div>{" "}
          </button>

          <ErrorMessage
            name="name"
            component="div"
            style={{ color: "red", marginTop: "24px" }}
          />
        </Form>
      </Formik>
      {loading}
      {result}
    </div>
  );
};

// !----------------My solution!

// const FindOneCharacterForm = () => {
//   const [charName, setCharName] = useState("");
//   const [buttonChecked, setButtonChecked] = useState(false);
//   const { loader, error, clearError, findOneCharacterByName } = MarvelService();
//   const searchCharacter = (values) => {
//     findOneCharacterByName(values.name).then((data) => {
//       if (data.length < 0) {
//         setCharName(false);
//         setButtonChecked(true);
//       } else {
//         setCharName(data[0]);
//         setButtonChecked(true);
//       }
//     });
//   };
//   return (
//     <div className="one-character-form">
//       <h2 className="one-character-form__title">
//         Or find a character by name:
//       </h2>
//       <Formik
//         initialValues={{
//           name: "",
//         }}
//         validate={(values) => {
//           const errors = {};
//           if (!values.name) {
//             errors.name = "This place is required";
//           } else if (values.name.length < 3) {
//             errors.name = "Must be longer  3 characters";
//           }
//           return errors;
//         }}
//         onSubmit={(values, { resetForm }) => {
//           searchCharacter(values);
//           resetForm();
//         }}
//       >
//         {({ errors }) => {
//           return (
//             <Form action="">
//               <Field
//                 type="text"
//                 className="one-character-form__input"
//                 placeholder="Enter name"
//                 name="name"
//               />
//               <button type="submit" className="button button__main">
//                 <div className="inner">find </div>{" "}
//               </button>
//               {/* Errors input */}
//               {errors.name ? (
//                 <div style={{ color: "red", marginTop: "24px" }}>
//                   {errors.name}
//                 </div>
//               ) : null}
//               {/* Fetch message */}

//               {charName && !errors.name ? (
//                 <div>
//                   <div style={{ color: "green", marginTop: "24px" }}>
//                     {`There is! Visit ${charName.name} page?`}
//                   </div>
//                   {console.log(charName.id)}
//                   <Link
//                     to={`/${charName.id}`}
//                     className="button button__secondary"
//                   >
//                     <div className="inner">find </div>
//                   </Link>
//                 </div>
//               ) : null}
//               {!charName && !errors.name && buttonChecked ? (
//                 <div style={{ color: "red", marginTop: "24px" }}>
//                   {`The character was not found. Check the name and try again`}
//                 </div>
//               ) : null}
//             </Form>
//           );
//         }}
//       </Formik>
//     </div>
//   );
// };
export default FindOneCharacterForm;
