import React, { useState, useEffect } from "react";
import { Button, FormControl, InputLabel, OutlinedInput } from "@mui/material";
import db, { auth } from "./firebase";
import firebase from "firebase";
import CircularProgress from "@mui/material/CircularProgress";
import BottomNav from "./BottomNav";
import SideNav from "./SideNav";

import Nav from "./Nav";
import { useHistory } from "react-router-dom";

function RequestLoan() {
  const [amount, setAmount] = useState();
  // const [data, setData] = useState();
  const [error, setError] = useState("");
  const [started, setStarted] = useState(false);
  const [data, setData] = useState();
  const [nature, setNature] = useState();
  const [location, setLocation] = useState("")
  const [income, setIncome] = useState("")
  const [image, setImage] = useState(null);

  // Handles the selection of a file that is being chosen for upload
  // For now it only supports image files
  const handleFile = async (e) => {
    if (e.target.files[0]) {
      await setImage(e.target.files[0]);
    }
  };

  const onlyImage = () => {
    const uploadTask = store.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setCurrent(progress);
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
      () => {
        store
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("loans").doc().add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              profilePic: user.photoURL,
              username: user.displayName,
              image: url,
              shared: false,
              totalShares: 0
            });
            setImage(null);
            setInput("");
            setCurrent("");
          });
      }
    );
  }

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        db.collection("loans")
          .where("email", "==", auth?.currentUser?.email)
          .onSnapshot((snapshot) =>
            snapshot.docs.forEach(
              // eslint-disable-next-line
              (doc) => (setData(doc.data().amount), setNature(doc.data().state))
            )
          );
      }
    });
    // eslint-disable-next-line
  }, []);

  const history = useHistory();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        history.push("/");
      }
    });
    // eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   auth.onAuthStateChanged((authUser) => {
  //     if (authUser) {
  //       db.collection("loans")
  //         .where("email", "==", auth?.currentUser.email)
  //         .onSnapshot((snapshot) =>
  //           snapshot.docs.forEach((doc) => setData(doc.data().amount))
  //         );
  //     }
  //   });
  //   // eslint-disable-next-line
  // }, []);

  const sendInfo = async () => {
    // if (data === 0 || data === null) {
    await setStarted(!started);
    await db
      .collection("loans")
      .doc(auth?.currentUser?.uid)
      .set({
        name: auth?.currentUser?.displayName,
        email: auth?.currentUser?.email,
        amount: (Number(amount) + 0.15 * Number(amount)).toFixed(2),
        balance: 0,
        interest: (Number(amount) * 0.15).toFixed(2),
        time: firebase.firestore.FieldValue.serverTimestamp(),
        state: "no",
      })
      .then(async () => {
        await setAmount("");
        await setError("");
        await setStarted(started);
      })
      .catch((err) => {
        setError(err.message);
        setStarted(started);
      });
    // } else if (data > 0) {
    //   setError(
    //     "You cannot request another loan before paying off the previous one!!"
    //   );
    //   setAmount("");
    // }
  };

  return (
    <div>
      <Nav />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          width: "15%",
          margin: "0 auto"
        }}
      >
        {data && (
          <p
            style={{
              color: "red",
            }}
          >
            {`Sh. ${data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
          </p>
        )}
        {nature && (
          <p
            style={{
              color: nature === "yes" ? "green" : "red",
            }}
          >
            {nature === "yes" ? "Approved" : "Not Approved"}
          </p>
        )}
      </div>

      <div
        style={{
          padding: 10,
          position: "fixed",
          top: 250,
          left: -730,
          width: "100%",
          marginTop: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SideNav />
      </div>

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
            type="number"
            id="outlined-adornment-password"
            value={amount}
            onChange={(val) => setAmount(val.target.value)}
            label="Enter the loan amount that you want"
          />
        </FormControl>
        <FormControl sx={{ m: 3, width: "45ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Enter your location
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            value={location}
            onChange={(val) => setLocation(val.target.value)}
            label="Enter your location"
          />
        </FormControl>
        <FormControl sx={{ m: 3, width: "45ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Enter your income amount
          </InputLabel>
          <OutlinedInput
            type="number"
            id="outlined-adornment-password"
            value={income}
            onChange={(val) => setIncome(val.target.value)}
            label="Enter your income amount"
          />
        </FormControl>
        <div>
          <label htmlFor="file-input">
            <PhotoLibraryIcon
              style={{
                color: "green",
                cursor: "pointer",
              }}
            />
          </label>
          <input
            id="file-input"
            type="file"
            accept=".gif, .png, .jpeg, .jpg"
            onChange={handleFile}
            hidden
          />
          <h3>Upload photo of id</h3>
        </div>
        {started ? (
          <CircularProgress />
        ) : (
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
            Request
          </Button>
        )}
      </div>
      <div
        style={{
          padding: 10,
          position: "fixed",
          bottom: 0,
          zIndex: 1,
          width: "100%",
          marginTop: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BottomNav />
      </div>
    </div>
  );
}

export default RequestLoan;
