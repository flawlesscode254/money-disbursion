import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import db from "./firebase";
import { Avatar } from "@mui/material";
import { deepOrange } from '@mui/material/colors';

export default function AccessibleBadges() {
  const [data, setData] = useState([]);
  useEffect(() => {
    db.collection("users").onSnapshot((snapshot) => {
      setData(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    // eslint-disable-next-line
  }, []);
  return (
    <div style={{
        width: "20%",
        margin: "0 auto",
        justifyContent: "center",
        alignItems: "center"
    }}>
      {data.map((item) => (
        <div style={{
            justifyContent: "center",
            alignItems: "center",
            width: "10%"
        }} key={item.id}>
          <Avatar
            sx={{ bgcolor: deepOrange[500] }}
            alt="Remy Sharp"
          >
            {item.data.email.split("")[0]}
          </Avatar>
          <Badge color="secondary" badgeContent={item.data.email}></Badge>
        </div>
      ))}
    </div>
  );
}
