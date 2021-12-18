import React, {useEffect} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

import Nav from "./Nav";
import { useHistory } from "react-router-dom";
import { auth } from "./firebase";

const About = () => {
    const history = useHistory()
    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            if (!authUser) {
                history.push("/")
            }
          });
      }, [])
  return (
    <div>
      <Nav />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 30
        }}
      >
        <Card sx={{ maxWidth: "50%" }}>
          <CardActionArea>
            <CardMedia
              component="img"
              image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fzahner.imgix.net%2Fe0bbea84-46e1-4e79-ac76-89bb79cf55c0%2Fmit-stata-center-photo-by-tex-jernigan-copyright-zahner-1039.jpg%3Fw%3D1920&f=1&nofb=1"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Biashara Sacco
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Biashara Sacco is a company that provides services such as loan borrowing and savings.
                This are the main exclusive benefits to our customers. We are also help develop companies
                for members that are wishing to start one.
                We aim to reduce the work load inv
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </div>
  );
};

export default About;