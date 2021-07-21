import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import axios from "../../API";
import React from "react";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../../contexts/AuthContext";
import { useModalContext } from "../../contexts/ModalContext";
import classes from "./SignIn.module.css";

const SignIn = () => {
  const { handleModalContent, closeModal } = useModalContext();
  const { setIsAuthenticated, setUserCity, setUserEmail } = useAuthContext();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    axios
      .post("/signin", data)
      .then((response) => {
        if ("error" in response.data) {
          alert(response.data.error);
        } else {
          closeModal();
          alert("Login realizado com sucesso!");
          reset();
          setUserCity(response.data.city);
          setUserEmail(response.data.email);
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
