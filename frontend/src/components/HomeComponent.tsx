import React, { useEffect, useState } from "react";
// import axios from 'axios';
// import CustomerDashComponent from './CustomerDashComponent';
import { useNavigate } from "react-router-dom";
import image1 from "../assets/images/image1.jpg";
import image2 from "../assets/images/image2.jpg";
import image3 from "../assets/images/image3.jpg";
// import image4 from '../assets/images/download.jpeg';
import "../component.css/HomeStyle.css";
import { Box, Button, CardActions, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const images = [image1, image2, image3];

const Home: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // const [homeContent, setHomeContent] = useState('');
  const buttonText = "Shop Online";

  const navigate = useNavigate();

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  //   }, 5000); // Change image every 5 seconds
  //   return () => clearInterval(interval);
  // }, []);

  // useEffect(() => {
  //   const fetchHomeContent = async () => {
  //     try {
  //       const response = await axios.get('/home');
  //       console.log(response.data);
  //       setHomeContent(response.data.homeContent);
  //     } catch (error) {
  //       console.error('Error fetching home content:', error);
  //     }
  //   };

  //   fetchHomeContent();
  // }, []);

  const handleClick = () => {
    navigate("/api/user/dashboard");
  };

  return (
    <>
      {/* <div>
      <h1> Helloooo </h1>
     </div> */}

      {/* Items are displayed according to the data from db */}

      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ pt: 3, pl: 3 }}
      >
        <Grid item>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
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
                  Product 1 description
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Share
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
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
                  Product 1 description
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Share
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;

// function Welcome() {
//   return <h1>Hello CVR</h1>;
// }

// export default Welcome;
