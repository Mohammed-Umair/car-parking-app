import React, { createContext, useState } from "react";

interface slotProps {
  createSlot: {
    id: any;
    allocated: boolean;
    carno: string;
    time: any;
  }[];
  setCreateSlot: (createSlot: any) => void;
}

export const slotContext = createContext({} as slotProps);

interface ChildProps {
  children: JSX.Element;
}

const Context: React.FC<ChildProps> = ({ children }) => {
  const [createSlot, setCreateSlot] = useState<slotProps["createSlot"]>([]);

  console.log("createSlot", createSlot);

  const [currCarSlot, setCurrCarSlot] = useState<any>([]);

  const value = {
    setCreateSlot,
    createSlot,
    setCurrCarSlot,
    currCarSlot,
  };
  return <slotContext.Provider value={value}>{children}</slotContext.Provider>;
};

export default Context;
