import { Button, CardActionArea, CardActions, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import image1 from "../assets/images/image1.jpg";
import image2 from "../assets/images/image2.jpg";
import image3 from "../assets/images/image3.jpg";

const images = [image1, image2, image3];

const Home: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/api/user/dashboard");
  };

  return (
    <>
      {/* Items are displayed according to the data from db */}

      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ pt: 3, pl: 3 }}
      >
        <Grid item>
          <Card sx={{ width: 345 }}>
            <CardActionArea
              onClick={() => {
                navigate("/product/:id");
              }}
            >
              <CardMedia
                component="img"
                height="140"
                //get the image data dynamically from db
                image="../assets/images/image1.jpg"
                alt="1st product"
              />
              <CardContent>
                {/* get the data dynamically from db */}
                <Typography gutterBottom variant="h5" component="div">
                  Product 1
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Product 1 description / cost
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item>
          <Card sx={{ width: 345 }}>
            <CardActionArea
              onClick={() => {
                navigate("/product/:id");
              }}
            >
              <CardMedia
                component="img"
                height="140"
                //get the image data dynamically from db
                image="../assets/images/image1.jpg"
                alt="1st product"
              />
              <CardContent>
                {/* get the data dynamically from db */}
                <Typography gutterBottom variant="h5" component="div">
                  Product 1
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Product 1 description / cost
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
