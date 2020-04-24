import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";
import { Link } from "react-router-dom";

const formSchema = yup.object().shape({
  name: yup
    .string()
    .required("please input a name")
    .min(2, "name must be more than 2 characters"),
  size: yup.string().required("must include pizza size"),
  pepperoni: yup.boolean(),
  sausage: yup.boolean(),
  onion: yup.boolean(),
  mushroom: yup.boolean(),
  instruction: yup.string().required("special instruction"),
});

export default function Form() {
  const [button, setButton] = useState(true);
  const [formState, setFormState] = useState({
    name: "",
    size: "",
    pepperoni: "",
    sausage: "",
    onion: "",
    mushroom: "",
    instruction: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    size: "",
    pepperoni: "",
    sausage: "",
    onion: "",
    mushroom: "",
    instruction: "",
  });

  const [post, setPost] = useState([]);

  //   useEffect(() => {
  //     formSchema.isValid(formState).then(valid => {
  //       setButton(!valid);
  //     });
  //   }, [formState]);

  const formSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://reqres.in/api/orders", formState)
      .then((res) => {
        setPost(res.data);

        setFormState({
          name: "",
          size: "",
          pepperoni: "",
          sausage: "",
          onion: "",
          mushroom: "",
          instruction: "",
        });
      })
      .catch((err) =>
        console.log(
          "something went wrong when submitting your form",
          err.response
        )
      );
  };

  const validateChange = (e) => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setErrors({
          ...errors,
          [e.target.name]: "",
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0],
        });
      });
  };

  const inputChange = (e) => {
    e.persist();
    const newFormData = {
      ...formState,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    };
    validateChange(e);
    setFormState(newFormData);
  };

  return (
    <form onSubmit={formSubmit}>
      <Link to={"/"}>
        <div>Home</div>
      </Link>
      <label htmlFor="name">
        Name:
        <input
          id="name"
          type="text"
          name="name"
          value={formState.name}
          onChange={inputChange}
        />
        {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
      </label>{" "}
      <br />
      <label htmlFor="size">
        What size pizza would you like?
        <select id="size" name="size" onChange={inputChange}>
          <option value="small">small</option>
          <option value="medium">medium</option>
          <option value="large">large</option>
        </select>
      </label>{" "}
      <br />
      <label htmlFor="pepperoni">
        Pepperoni!
        <input
          id="pepperoni"
          type="checkbox"
          name="pepperoni"
          checked={formState.pepperoni}
          onChange={inputChange}
        />
      </label>
      <label htmlFor="sausage">
        Sausage!
        <input
          id="sausage"
          type="checkbox"
          name="sausage"
          checked={formState.sausage}
          onChange={inputChange}
        />
      </label>
      <label htmlFor="onion">
        Onion!
        <input
          id="onion"
          type="checkbox"
          name="onion"
          checked={formState.onion}
          onChange={inputChange}
        />
      </label>
      <label htmlFor="mushroom">
        Mushroom!
        <input
          id="mushroom"
          type="checkbox"
          name="mushroom"
          checked={formState.mushroom}
          onChange={inputChange}
        />
      </label>
      <label htmlFor="instructions">
        Special instructions!
        <textarea
          id="instruction"
          name="instruction"
          value={formState.instruction}
          onChange={inputChange}
        />
      </label>{" "}
      <br />
      <pre>{JSON.stringify(post, null, 2)}</pre>
      {/* <button disabled={button}>Submit</button> */}
      <button type="submit">Order</button>
    </form>
  );
}
