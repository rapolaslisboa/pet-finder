import axios from "../../API";
import React, { useEffect } from "react";
import Card from "../../components/Card/Card";
import { useAuthContext } from "../../contexts/AuthContext";
import { usePetContext } from "../../contexts/PetContext";
import classes from "./Management.module.css";

const Management = () => {
  const { userEmail } = useAuthContext();
  const { filtered, setFiltered, updateCards } = usePetContext();

  useEffect(() => {
    axios
      .get(`/list-pets-user/${userEmail}`)
      .then((response) => {
        if ("error" in response.data) {
          setFiltered([]);
        } else {
          setFiltered(response.data);
        }
      })
      .catch((error) => alert(error));
  }, [updateCards]);

  return (
    <div className={classes.Management}>
      <font>Gerencie os seus pets cadastrados!</font>
      <div className={classes.PetList}>
        {filtered.length > 0 ? (
          filtered.map(
            (pet, index) =>
              !pet.Adopted && <Card key={index} management={true} pet={pet} />
          )
        ) : (
          <p>
            Você ainda não cadastrou nenhum pet... Cadastre um ao clicar no
            botão <strong>Anunciar</strong>.
          </p>
        )}
      </div>
    </div>
  );
};

export default Management;
