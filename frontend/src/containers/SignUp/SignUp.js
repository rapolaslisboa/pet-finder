import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import React from "react";
// import InputMask from "react-input-mask";
import { useModalContext } from "../../contexts/ModalContext";
import classes from "./SignUp.module.css";

const SignUp = () => {
  const { handleModalContent } = useModalContext();
  return (
    <div className={classes.SignUp}>
      {/* <div className={classes.Logo}>
        <img src={LogoImg} alt="Vitrine Acadêmica" id="Logo" />
      </div> */}
      <h1>Realize seu cadastro</h1>
      <form className={classes.Form} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="fname"
              name="Nome"
              variant="outlined"
              required
              fullWidth
              id="nome"
              label="Nome"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="sobrenome"
              label="Sobrenome"
              name="Sobrenome"
              autoComplete="lname"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="E-mail"
              name="Email"
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="Senha"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
            />
          </Grid>
          {/* <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="ConfirmPassword"
              label="Confirme sua senha"
              type="password"
              id="confirmPassword"
              autoComplete="current-password"
            />
          </Grid> */}
          {/* <Grid item xs={12}>
            <InputMask
              mask="999.999.999-99"
              // value={this.state.phone}
              disabled={false}
              // maskChar=" "
              maskPlaceholder=""
            >
              <TextField
                variant="outlined"
                required
                fullWidth
                name="CPF"
                label="CPF"
                id="CPF"
              />
            </InputMask>
          </Grid> */}
          {/* <Grid item xs={12}>
            <InputMask
              mask="99 99999-9999"
              // value={this.state.phone}
              disabled={false}
              // maskChar=" "
              maskPlaceholder=""
            >
              <TextField
                variant="outlined"
                required
                fullWidth
                name="Celular"
                label="Celular"
                type="tel"
                id="phone"
                autoComplete="tel"
              />
            </InputMask>
          </Grid> */}
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
