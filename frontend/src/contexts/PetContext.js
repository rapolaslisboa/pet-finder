import React, { createContext, useContext, useState } from "react";

const PetContext = createContext({});

const PetProvider = ({ children }) => {
  const [selectedPet, setSelectedPet] = useState({});
  const [isEditable, setIsEditable] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const [updateCards, setUpdateCards] = useState(false);

  return (
    <PetContext.Provider
      value={{
        selectedPet,
        setSelectedPet,
        isEditable,
        setIsEditable,
        filtered,
        setFiltered,
        updateCards,
        setUpdateCards,
      }}
    >
      {children}
    </PetContext.Provider>
  );
};

const usePetContext = () => {
  const context = useContext(PetContext);
  return context;
};

export { usePetContext, PetProvider };

