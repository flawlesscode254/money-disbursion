import React, { useState, useEffect } from "react";
import { Button, FormControl, InputLabel, OutlinedInput } from "@mui/material";
import db, { auth } from "./firebase";
import firebase from "firebase";

import Nav from "./Nav";

function RequestLoan() {
  const [amount, setAmount] = useState();
  const [data, setData] = useState();
  const [error, setError] = useState("")

  useEffect(() => {
    db.collection("loans")
      .where("email", "==", auth.currentUser.email)
      .onSnapshot((snapshot) =>
        snapshot.docs.forEach((doc) => setData(doc.data().amount))
      );
  }, []);

  const sendInfo = () => {
    if (data === 0)
    db.collection("loans")
      .doc(auth.currentUser.uid)
      .set({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
        photo: auth.currentUser.photoURL,
        amount: Number(amount) + 0.15 * Number(amount),
        time: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(async () => {
        await setAmount("");
      });
  };

  return (
    <div>
      <Nav />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: 70,
        }}
      >
        {error && (
          <p
            style={{
              color: "red",
            }}
          >
            {error}
          </p>
        )}

        <p>Fill in the following information to get loan</p>
        <FormControl sx={{ m: 3, width: "45ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Enter the loan amount that you want
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            value={amount}
            onChange={(val) => setAmount(val.target.value)}
            label="Enter the loan amount that you want"
          />
        </FormControl>
        <Button
          style={{
            marginTop: 20,
            paddingLeft: 70,
            paddingRight: 70,
          }}
          color="primary"
          type="submit"
          variant="outlined"
          onClick={sendInfo}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default RequestLoan;
