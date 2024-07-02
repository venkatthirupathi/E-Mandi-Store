import { CreateUserSchema } from "@backend/model/UserModel";
import { UserRole } from "@backend/types";
import {
  Button,
  Card,
  CardContent,
  // FormGroup,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React, { PropsWithChildren } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { API } from "../services";
import { errorSnackbar, getErrorMessage, successSnackbar } from "../utils";

// function FormGroup({ children }: PropsWithChildren) {
//   return <Stack spacing={1}>{children}</Stack>;
// }

// // TODO: validation
// const Signup: React.FC = () => {
// const navigate = useNavigate();
// const { register, handleSubmit, control, setValue } =
//   useForm<CreateUserSchema>({
//     defaultValues: {
//       role: UserRole.user,
//     },
//   });

// const onSubmit: SubmitHandler<CreateUserSchema> = async (data) => {
//   let errorMessage;
//   try {
//     const response = await API.auth.signup(data);
//     if ("message" in response.data) {
//       successSnackbar("Signed up successfully");
//       navigate("/login");
//       return;
//     }
//   } catch (error) {
//     errorMessage = getErrorMessage(error);
//   }
//   errorSnackbar(errorMessage);
// };
//   return (
//     <Stack alignItems={"center"} spacing={4} marginTop={6}>
//       <Typography variant="h2" fontSize={32} sx={{ fontWeight: "bold" }}>
//         Sign Up
//       </Typography>
//       <Card sx={{ minWidth: 400 }} elevation={4}>
//         <CardContent sx={{ padding: 3 }}>
// <form onSubmit={handleSubmit(onSubmit)}>
//   <Stack spacing={2}>
//     <FormGroup>
//       <label htmlFor="email">Email</label>
//       <TextField
//         size="small"
//         id="email"
//         type="email"
//         placeholder="Enter your email"
//         variant="outlined"
//         {...register("email")}
//         required
//       />
//     </FormGroup>
//     <FormGroup>
//       <label htmlFor="password">Password</label>
//       <TextField
//         size="small"
//         type="password"
//         variant="outlined"
//         id="password"
//         placeholder="Enter your password"
//         required
//         {...register("password")}
//       />
//     </FormGroup>
//     <FormGroup>
//       <label htmlFor="username">Username</label>
//       <TextField
//         size="small"
//         type="text"
//         id="username"
//         placeholder="Enter your username"
//         required
//         {...register("username")}
//       />
//     </FormGroup>
//     <FormGroup>
//       <label htmlFor="mobileNumber">Mobile number</label>
//       <TextField
//         size="small"
//         type="text"
//         id="mobileNumber"
//         placeholder="Enter your mobile number"
//         required
//         {...register("mobileNumber")}
//       />
//     </FormGroup>
//     <Stack
//       direction={"row"}
//       justifyContent={"space-between"}
//       alignItems={"center"}
//     >
//       <label htmlFor="role">Role</label>
//       <Controller
//         name="role"
//         control={control}
//         render={({ field }) => {
//           return (
//             <ToggleButtonGroup
//               size="small"
//               {...field}
//               onChange={(_, value) => setValue(field.name, value)}
//               exclusive
//             >
//               <ToggleButton value="user">Buyer</ToggleButton>
//               <ToggleButton value="seller">Seller</ToggleButton>
//             </ToggleButtonGroup>
//           );
//         }}
//       />
//     </Stack>
//     <Button type="submit" variant="contained">
//       Sign up
//     </Button>
//   </Stack>
// </form>
//         </CardContent>
//       </Card>
//     </Stack>
//   );
// };

// export default Signup;

import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Signup() {
  const navigate = useNavigate();
  const { register, handleSubmit, control, setValue } =
    useForm<CreateUserSchema>({
      defaultValues: {
        role: UserRole.user,
      },
    });

  const onSubmit: SubmitHandler<CreateUserSchema> = async (data) => {
    let errorMessage;
    try {
      const response = await API.auth.signup(data);
      if ("message" in response.data) {
        successSnackbar("Signed up successfully");
        navigate("/login");
        return;
      }
    } catch (error) {
      errorMessage = getErrorMessage(error);
    }
    errorSnackbar(errorMessage);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              'url("https://i.pinimg.com/564x/9c/0e/3e/9c0e3e9046902a3e32544baa3fe87ac3.jpg")',

            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "left",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                type="email"
                id="email"
                label="Email Address"
                autoComplete="email"
                autoFocus
                {...register("email")}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                type="password"
                id="password"
                label="Password"
                autoComplete="password"
                autoFocus
                {...register("password")}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                type="text"
                id="username"
                label="Username"
                autoComplete="username"
                autoFocus
                {...register("username")}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                type="number"
                id="mobileNumber"
                label="Mobile Number"
                autoComplete="mobileNumber"
                autoFocus
                {...register("mobileNumber")}
              />
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                gap={4}
                sx={{ mt: 2 }}
                alignItems={"center"}
              >
                {/* <Typography
                variant="h6"
                fontFamily={"revert"}
                // fontSize={32}
                // sx={{ fontWeight: "bold" }}
              >
                Role
              </Typography> */}
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => {
                    return (
                      <ToggleButtonGroup
                        size="small"
                        {...field}
                        onChange={(_, value) => setValue(field.name, value)}
                        exclusive
                      >
                        <ToggleButton value="user" sx={{ width: 100 }}>
                          Buyer
                        </ToggleButton>
                        <ToggleButton value="seller" sx={{ width: 100 }}>
                          Seller
                        </ToggleButton>
                      </ToggleButtonGroup>
                    );
                  }}
                />
              </Stack>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
