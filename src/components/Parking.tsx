import { Box, TextField, Typography, Button, Alert } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { slotContext } from "./Context";

const Parking = () => {
  const [number, setNumber] = useState<any>("");
  const [alert, setAlert] = useState(false)
  // console.log("nmber", number);
  const { setCreateSlot } = useContext(slotContext);
  // console.log("createSlot---->", createSlot);

  const navigate = useNavigate();
  const HandleSlotGenerator = () => {
    const temp: any = [];

    for (let i = 1; i <= number; i++) {
      temp.push({
        id: Math.floor(Math.random() * 100000),
        carno: "",
        time: null,
        allocated: true,
      });
    }
    setCreateSlot(temp);
    setAlert(true)
    navigate("/parkinglot");
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#85FFBD",
        backgroundImage: "linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 40,
          width: "50%",
        }}
      >
        
        {alert && (
          <Alert severity="warning">Slot are generated!</Alert>
        )}
      </Box>
      <Box
        sx={{
          width: "350px",
          //   bgcolor:"yellow",
          height: "250px",
          marginTop: "50px",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Typography
          variant="h6"
          component="h1"
          sx={{
            fontSize: "22px",
            fontWeight: "600",
            fontFamily: "monospace",
          }}
        >
          Car Parking Slot Generation
        </Typography>
        <TextField
          label="Enter Slots"
          placeholder="Enter No of Slot"
          variant="outlined"
          fullWidth
          onChange={(e) => setNumber(e.target.value)}
          data-testid="enterSlotNumber"
        />

        <Button
          size="large"
          color="success"
          variant="outlined"
          sx={{
            fontSize: "20px",
            fontWeight: "600",
            fontFamily: "monospace",
            bgcolor: "White",
          }}
          onClick={HandleSlotGenerator}
          disabled={!number}
          data-testid="GenerateBtn"
        >
          Generate
        </Button>
      </Box>
    </Box>
  );
};

export default Parking;
