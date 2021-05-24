import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import { usePetContext } from "../../contexts/PetContext";
import classes from "./Edition.module.css";

const Edition = () => {
  const { selectedPet, setSelectedPet, isEditable, setIsEditable } =
    usePetContext();
  const { register, handleSubmit } = useForm();
  const [redirect, setRedirect] = useState(false);

  if (redirect) {
    return <Redirect to="/gerenciamento" />;
  }

  const onSubmit = (data) => {
    data["_id"] = selectedPet["_id"]["$oid"];
    data["Name"] = document.getElementById("name").value;
    data["Breed"] = document.getElementById("breed").value;
    data["Age"] = document.getElementById("age").value;
    data["Weight"] = document.getElementById("weight").value;
    data["City"] = document.getElementById("city").value;
    axios
      .put("http://127.0.0.1:5000/api/update-pet", data)
      .then((response) => {
        if ("success" in response.data) {
          setSelectedPet({});
          setIsEditable(false);
          setRedirect(true);
          alert(response.data.success);
        } else {
          alert(response.data.error);
        }
      })
      .catch((error) => alert(error));
  };

  return (
    <div className={classes.Edition}>
      <h1>Atualize o seu pet</h1>
      <form className={classes.Form} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoComplete="fname"
              name="Name"
              variant="outlined"
              defaultValue={isEditable ? selectedPet["Name"] : ""}
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
              defaultValue={isEditable ? selectedPet["Breed"] : ""}
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
              defaultValue={isEditable ? selectedPet["Age"] : ""}
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
              defaultValue={isEditable ? selectedPet["Weight"] : ""}
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
              defaultValue={isEditable ? selectedPet["City"] : ""}
              fullWidth
              id="city"
              {...register("City")}
              label="Cidade"
              name="City"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.Button}
        >
          Atualizar
        </Button>
      </form>
    </div>
  );
};

export default Edition;
