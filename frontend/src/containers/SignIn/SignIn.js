import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { useModalContext } from "../../contexts/ModalContext";
import { useAuthContext } from "../../contexts/AuthContext";
import classes from "./SignIn.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";

const SignIn = () => {
  const { handleModalContent, closeModal } = useModalContext();
  const { setIsAuthenticated, setUserCity } = useAuthContext();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    axios
      .post("http://127.0.0.1:5000/api/signin", data)
      .then((response) => {
        console.log(response.data);
        if ("error" in response.data) {
          alert(response.data.error);
        } else {
          closeModal();
          alert("Login realizado com sucesso!");
          setUserCity(response.data.city);
          setIsAuthenticated(true);
        }
      })
      .catch((error) => alert(error));
  };

  return (
    <div className={classes.SignIn}>
      <h1>Faça seu login</h1>
      <form className={classes.Form} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="E-mail"
          {...register("E-mail")}
          name="E-mail"
          autoComplete="email"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="Password"
          label="Senha"
          {...register("Password")}
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Lembrar"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.Button}
        >
          Continuar
        </Button>
        <div className={classes.Links}>
          <a href="#" onClick={() => handleModalContent("SignUp")}>
            Ainda não possuo cadastro
          </a>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
