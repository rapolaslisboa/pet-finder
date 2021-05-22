import React, { useState, useEffect } from "react";
import classes from "./Management.module.css";
import Card from "../../components/Card/Card";
import { useAuthContext } from "../../contexts/AuthContext";

const Management = () => {
  const { userCity } = useAuthContext();
  const [filtered, setFiltered] = useState([]);

//   useEffect(() => {
//     if (userCity === null) {
//       setFiltered(samples);
//     } else {
//       setFiltered(samples.filter((element) => element.City === userCity));
//     }
//   }, [userCity]);

  return (
    <div className={classes.Management}>
      <font>Gerencie os seus pets cadastrados!</font>
      {/* <div className={classes.PetList}>
        {filtered.map(
          (element) =>
            !element.Adopted && (
              <Card key={element["Pet ID"]} element={element} />
            )
        )}
      </div> */}
    </div>
  );
};

export default Management;
