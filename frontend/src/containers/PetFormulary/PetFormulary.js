import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";
import axios from "../../API";
import React from "react";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../../contexts/AuthContext";
import { useModalContext } from "../../contexts/ModalContext";
import { usePetContext } from "../../contexts/PetContext";
import classes from "./PetFormulary.module.css";

const PetFormulary = () => {
  const { closeModal } = useModalContext();
  const { userEmail } = useAuthContext();
  const { setUpdateCards, updateCards } = usePetContext();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    data["E-mail"] = userEmail;
    axios
      .post("/register-pet", data)
      .then((response) => {
        if ("success" in response.data) {
          closeModal();
          reset();
          setUpdateCards(!updateCards);
          alert(response.data.success);
        } else {
          alert(response.data.error);
        }
      })
      .catch((error) => alert(error));
  };

  return (
    <div className={classes.PetFormulary}>
      <h1>Cadastre um pet</h1>
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
            <FormLabel component="legend">
              O pet é um cachorro ou um gato?
            </FormLabel>
            <RadioGroup
              aria-label="pet-type"
              name="pet-type1"
              {...register("Type")}
              className={classes.RadioGroup}
            >
              <FormControlLabel
                value="Cachorro"
                control={<Radio />}
                label="Cachorro"
              />
              <FormControlLabel value="Gato" control={<Radio />} label="Gato" />
            </RadioGroup>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="Breed"
              label="Raça"
              {...register("Breed")}
              id="breed"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              id="age"
              {...register("Age")}
              label="Idade"
              name="Age"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              InputProps={{ inputProps: { min: 0 } }}
              type="number"
              {...register("Weight")}
              id="weight"
              label="Peso (kg)"
              name="Weight"
            />
          </Grid>
          <Grid item xs={12}>
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
        </Grid>
        <span className={classes.Terms}>
          Ao cadastrar um pet, você concorda com a Política dos Pets e os Termos
          de Uso do Pet Finder.
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
      </form>
    </div>
  );
};

export default PetFormulary;
