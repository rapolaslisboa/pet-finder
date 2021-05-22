import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { useModalContext } from "../../contexts/ModalContext";
import classes from "./SignIn.module.css";

const SignIn = () => {
  const { handleModalContent } = useModalContext();
  return (
    <div className={classes.SignIn}>
      {/* <div className={classes.Logo}>
        <img src={LogoImg} alt="Vitrine Acadêmica" id="Logo" />
      </div> */}
      <h1>Faça seu login</h1>
      <form className={classes.Form} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="E-mail"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Senha"
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
