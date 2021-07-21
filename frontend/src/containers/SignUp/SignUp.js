import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import axios from "../../API";
import React from "react";
import { useForm } from "react-hook-form";
import { useModalContext } from "../../contexts/ModalContext";
import classes from "./SignUp.module.css";

const SignUp = () => {
  const { handleModalContent, closeModal } = useModalContext();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    axios
      .post("/signup", data)
      .then((response) => {
        if ("success" in response.data) {
          closeModal();
          reset();
          alert(response.data.success);
        } else {
          alert(response.data.error);
        }
      })
      .catch((error) => alert(error));
  };

  return (
    <div className={classes.SignUp}>
      <h1>Realize seu cadastro</h1>
      <form className={classes.Form} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoComplete="fname"
              name="Name"
              variant="outlined"
              required
              fullWidth
              {...register("Name")}
              id="name"
              label="Nome"
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              {...register("E-mail")}
              label="E-mail"
              name="E-mail"
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="Password"
              label="Senha"
              type="password"
              {...register("Password")}
              id="password"
              autoComplete="current-password"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="street"
              {...register("Street")}
              label="Rua"
              name="Street"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              InputProps={{ inputProps: { min: 0 } }}
              type="number"
              {...register("Number")}
              id="number"
              label="Número"
              name="Number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="city"
              {...register("City")}
              label="Cidade"
              name="City"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              {...register("State")}
              id="state"
              label="Estado"
              name="State"
            />
          </Grid>
        </Grid>
        <span className={classes.Terms}>
          Ao criar uma conta, você concorda com a Política de Privacidade e os
          Termos de Uso do Pet Finder.
        </span>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.Button}
        >
          Cadastrar
        </Button>
        <div className={classes.Links}>
          <a href="#" onClick={() => handleModalContent("SignIn")}>
            Já sou cadastrado
          </a>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
