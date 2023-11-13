import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
// import LightIcon from "@mui/icons-material/WbIncandescent";

export default function MainCard({ img, deviceName, note, onClick }) {
  return (
    <Card sx={{ maxWidth: 345, width: "25%" }}>
      <CardActionArea onClick={() => console.log("clicked")}>
        <CardMedia
          component="img"
          height="140"
          image={img || "/static/images/defaultimage.jpg"}
          alt="Device Image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {deviceName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {note}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
