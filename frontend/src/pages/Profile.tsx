import {
  Box,
  Button,
  FormGroup,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PageTitle() {
  return (
    <>
      <Typography
        className="title"
        variant="h5"
        noWrap
        sx={{
          display: { xs: "none", md: "flex" },
          fontFamily: "-moz-initial",
          fontWeight: 700,
          color: "#2E2D2D",
          textDecoration: "none",
          marginBottom: 3,
          marginLeft: 3,
          marginRight: 3,
          textAlign: "center",
          paddingLeft: 3,
          maxWidth: 1200,
          borderBottom: "1px solid #ccc",
        }}
      >
        Profile Details
      </Typography>
    </>
  );
}

function ProfileMenu() {
  const navigate = useNavigate();

  return (
    <>
      {/* <PageTitle/> */}
      <Box
        sx={{
          width: 100,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          borderRight: "2px solid #ccc",
        }}
      >
        <Button
          variant="text"
          onClick={() => {
            navigate("/profile");
          }}
          sx={{
            color: "black",
          }}
        >
          Profile
        </Button>

        <Button
          variant="text"
          onClick={() => {
            navigate("/cart");
          }}
          sx={{
            color: "black",
          }}
        >
          Cart
        </Button>
      </Box>
    </>
  );
}

function EditMenu() {
  // const handleSubmit = () => {
  //   console.log("submitting");
  // }

  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    axios
      .get("/api/user-details/" + userId)
      .then((response) => {
        setUserDetails(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userId]);

  return (
    <>
      <Box
        sx={{
          padding: 2,
          border: "2px solid #ccc",
          width: 1000,
          backgroundColor: "#FDFBF6",
          // height : 1000
        }}
      >
        <form>
          <Stack spacing={2}>
            <FormGroup>
              <label htmlFor="name">Name</label>
              <TextField
                size="small"
                id="name"
                type="name"
                value={userDetails.name}
                placeholder="Enter your email"
                variant="outlined"
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="email">Email</label>
              <TextField
                size="small"
                id="email"
                type="email"
                value={userDetails.email}
                placeholder="Enter your email"
                variant="outlined"
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="password">Password</label>
              <TextField
                size="small"
                type="password"
                variant="outlined"
                value={userDetails.password}
                id="password"
                placeholder="Enter your password"
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="username">Username</label>
              <TextField
                size="small"
                type="text"
                id="username"
                value={userDetails.username}
                placeholder="Enter your username"
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="mobileNumber">Mobile number</label>
              <TextField
                size="small"
                type="number"
                id="mobileNumber"
                value={userDetails.number}
                placeholder="Enter your mobile number"
              />
            </FormGroup>
            <Stack
              direction={"row"}
              // justifyContent={"space-between"}
              gap={5}
              alignItems={"center"}
            >
              <label htmlFor="role">Gender</label>
              <ToggleButtonGroup
                size="small"
                // {...field}
                // onChange={(_, value) => setValue(field.name, value)}
                exclusive
              >
                <ToggleButton value="user">Male</ToggleButton>
                <ToggleButton value="seller">Female</ToggleButton>
              </ToggleButtonGroup>
            </Stack>
            <Button
              type="submit"
              variant="contained"
              sx={{ width: 300, alignItems: "center", alignSelf: "center" }}
            >
              Save Changes
            </Button>
          </Stack>
        </form>
        {/* </CardContent>
      </Card> */}
      </Box>
    </>
  );
}

function Profile() {
  return (
    <>
      <Box
        sx={{
          alignItems: "center",
          marginLeft: 10,
          marginRight: 10,
        }}
      >
        <div
          style={{
            marginTop: 100,
            // marginLeft : 50,
            // marginRight : 50,
            padding: 3,
            alignItems: "center",
          }}
        >
          <PageTitle />
        </div>

        <Box
          sx={{
            display: "flex",

            // alignItems: "center",
            // padding : 3,
            // marginTop : 10,
          }}
        >
          <div
            className="profile-menu"
            style={{
              marginLeft: 50,
              marginRight: 50,
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
            }}
          >
            <ProfileMenu />
          </div>

          <EditMenu />
        </Box>
      </Box>
    </>
  );
}

export default Profile;
