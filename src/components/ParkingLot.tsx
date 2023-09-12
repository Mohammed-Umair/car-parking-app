import {
  Button,
  Box,
  Typography,
  TextField,
  Card,
  CardContent,
  Paper,
  Alert,
  Grid,
} from "@mui/material";
import React, { FC, useContext, useState } from "react";
import { slotContext } from "./Context";
import { useNavigate } from "react-router";

interface Card {
  clicked: React.MouseEventHandler<HTMLDivElement>;
}

const ParkingLot: FC = () => {
  const [carNo, setCarNo] = useState<any>("");
  const [availCar, setAvailCar] = useState(false);
  const [parkingFull, setParkingFull] = useState(false);
  const [car, setCar] = useState(false);

  const { createSlot, setCreateSlot } = useContext(slotContext);
  const { setCurrCarSlot }: any = useContext(slotContext);

  const handleCarPark = () => {
    const arrSlots = createSlot.filter((item: any) => item.allocated === true);
    // console.log("arrSlots", arrSlots);
    const carNoFilled = createSlot.filter((item: any) => item.carno === carNo);
    // console.log("carNoFilled", carNoFilled);
    if (carNoFilled.length > 0) {
      setAvailCar(true);
    } else {
      setAvailCar(false);
      if (arrSlots.length === 0) {
        setParkingFull(true);
      } else if (carNo === "") {
        setCar(true);
      } else {
        setCar(false);

        const startTime = new Date();
        console.log("startTime", startTime);
        // const currentTime =
        //   startTime.getHours() +
        //   ":" +
        //   startTime.getMinutes() +
        //   ":" +
        //   startTime.getSeconds();

        // console.log("curr", currentTime);

        const randomSlot =
          arrSlots[Math.floor(Math.random() * arrSlots.length)];
        console.log("randomSlot", randomSlot);
        const updateSlots = {
          ...randomSlot,
          allocated: false,
          carno: carNo,
          time: startTime,
          // time: currentTime,
        };
        console.log("updateSlots", updateSlots);
        const newSlot: any = [];

        createSlot.forEach((item: any) => {
          if (item.id === randomSlot.id && item.allocated) {
            newSlot.push(updateSlots);
          } else {
            newSlot.push(item);
          }
        });
        setCreateSlot([...newSlot]);
      }
    }
    setCarNo("");
  };
  const navigate = useNavigate();
  const HandlePaymentPage: React.MouseEventHandler<HTMLDivElement> = (slot) => {
    // let slots = createSlot.find((elem) => {
    //   return elem.id === slot;
    // });

    // console.log("slots-------->", slots);
    // setCurrCarSlot(slots);
    navigate("/paymentPage", {
      state: slot,
    });
    // navigate("/paymentPage", {
    //   state: slots,
    // });
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#85FFBD",
        backgroundImage: "linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 40,
          width: "50%",
        }}
      >
        {parkingFull && (
          <Alert severity="info">all slots are booked...!!</Alert>
        )}
        {car && (
          <Alert severity="error">Please enter the Car Number...!!</Alert>
        )}
        {availCar && (
          <Alert severity="warning">Vehicle is already allocated!</Alert>
        )}
      </Box>
      <Grid container>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Box
            sx={{
              width: "350px",
              height: "250px",
              marginTop: "50px",
              marginLeft: "20px",
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
              Parking Lots
            </Typography>
            <TextField
              label="Enter Car No"
              placeholder="Enter The Car Registration Number"
              variant="outlined"
              fullWidth
              onChange={(e) => setCarNo(e.target.value)}
              onFocus={() => setCarNo("")}
            />

            <Button
              // size="large"
              fullWidth
              color="success"
              variant="outlined"
              sx={{
                fontSize: "20px",
                fontWeight: "600",
                fontFamily: "monospace",
                bgcolor: "White",
              }}
              onClick={handleCarPark}
              disabled={!carNo}
            >
              Park
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Box
            component={Paper}
            sx={{
              // width: "600px",
              maxHeight: "500px",
              overflow: "scroll",
              padding: "20px",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",

              boxShadow: 10,
            }}
          >
            <Grid item xs={12} sm={12} md={6} lg={6}>
              {createSlot?.map((item: any) => {
                return (
                  <>
                    {!item.allocated ? (
                      <Card
                        key={item.id}
                        style={{
                          background:
                            item.carno === ""
                              ? "#fff "
                              : "linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%)",
                        }}
                        sx={{
                          minWidth: 275,
                          mt: 2,
                          boxShadow: 2,
                          borderRadius: "20px",
                        }}
                        onClick={() => HandlePaymentPage(item)}
                      >
                        <CardContent>
                          <Typography
                            sx={{
                              fontSize: 16,
                              fontWeight: 600,
                              fontFamily: "monospace",
                            }}
                            color="orangered"
                            gutterBottom
                          >
                            Id: <> {item.id}</>
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: 16,
                              fontWeight: 600,
                              fontFamily: "monospace",
                            }}
                            gutterBottom
                          >
                            Car No: <> {item.carno}🚘</>
                          </Typography>
                        </CardContent>
                      </Card>
                    ) : (
                      <Card
                        key={item.id}
                        style={{
                          background:
                            item.carno === ""
                              ? "#fff "
                              : "linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%)",
                        }}
                        sx={{
                          minWidth: 275,
                          mt: 2,
                          boxShadow: 2,
                          borderRadius: "20px",
                        }}
                      >
                        <CardContent>
                          <Typography
                            sx={{
                              fontSize: 16,
                              fontWeight: 600,
                              fontFamily: "monospace",
                            }}
                            color="orangered"
                            gutterBottom
                          >
                            Id: <> {item.id}</>
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: 16,
                              fontWeight: 600,
                              fontFamily: "monospace",
                            }}
                            gutterBottom
                          >
                            Car No: <> {item.carno}🚘</>
                          </Typography>
                        </CardContent>
                      </Card>
                    )}
                  </>
                );
              })}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ParkingLot;
