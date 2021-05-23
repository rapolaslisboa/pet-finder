import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import { useAuthContext } from "../../contexts/AuthContext";
import classes from "./Management.module.css";

const Management = () => {
  const { userEmail } = useAuthContext();
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/api/list-pets-user/${userEmail}`)
      .then((response) => {
        if ("error" in response.data) {
          setFiltered([]);
        } else {
          setFiltered(response.data);
        }
      })
      .catch((error) => alert(error));
  }, []);

  return (
    <div className={classes.Management}>
      <font>Gerencie os seus pets cadastrados!</font>
      <div className={classes.PetList}>
        {filtered.length > 0 ? (
          filtered.map(
            (pet, index) =>
              !pet.Adopted && (
                <Card
                  key={index}
                  filtered={filtered}
                  setFiltered={setFiltered}
                  management={true}
                  pet={pet}
                />
              )
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
