import React, { useState, useEffect } from "react";
import classes from "./Home.module.css";
import samples from "../../helpers/PetsData";
import Card from "../../components/Card/Card";
import { useAuthContext } from "../../contexts/AuthContext";
// import CatImg from "../../assets/images/cat.jpg";
// import DogImg from "../../assets/images/dog.jpg";

const Home = () => {
  const { userCity } = useAuthContext();
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    if (userCity === null) {
      setFiltered(samples);
    } else {
      setFiltered(samples.filter((element) => element.City === userCity));
    }
  }, [userCity]);

  return (
    <div className={classes.Home}>
      <font>Anuncie e encontre pets para adoção!</font>
      <div className={classes.PetList}>
        {filtered.map(
          (element) =>
            !element.Adopted && (
              <Card key={element["Pet ID"]} element={element} />
            )
        )}
      </div>
    </div>
  );
};

export default Home;
