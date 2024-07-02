import { LoginUserSchema } from "@backend/model/UserModel";
import { UserRole } from "@backend/types";
import {
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { PropsWithChildren } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks";
import { API } from "../services";
import { errorSnackbar, getErrorMessage, successSnackbar } from "../utils";

// function FormGroup({ children }: PropsWithChildren) {
//   return <Stack spacing={1}>{children}</Stack>;
// }

// // TODO: validation
// export default function Login() {
// const { account, setAccount } = useAuth();

// console.log({ account });
// const navigate = useNavigate();
// const { register, handleSubmit } = useForm<LoginUserSchema>();

// const onSubmit: SubmitHandler<LoginUserSchema> = async (data) => {
//   let errorMessage;
//   try {
//     // send request
//     const response = await API.auth.login(data);
//     // store account details
//     console.log({ data: response.data });
//     setAccount(response.data);
//     // show snackbar
//     successSnackbar("Logged in successfully");
//     if (response.data.user.role === UserRole.seller) {
//       navigate("/seller/dashboard");
//     } else {
//       navigate("/");
//     }
//     return;
//   } catch (error) {
//     errorMessage = getErrorMessage(error);
//   }
//   errorSnackbar(errorMessage);
// };
//   return (
//     <Stack alignItems={"center"} spacing={4} marginTop={6}>
//       <Typography variant="h2" fontSize={32} sx={{ fontWeight: "bold" }}>
//         Login
//       </Typography>
//       <Card sx={{ minWidth: 400 }} elevation={4}>
//         <CardContent sx={{ padding: 3 }}>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <Stack spacing={2}>
//               <FormGroup>
//                 <label htmlFor="email">Email</label>
//                 <TextField
//                   size="small"
//                   id="email"
//                   type="email"
//                   placeholder="Enter your email"
//                   variant="outlined"
//                   {...register("email")}
//                   required
//                 />
//               </FormGroup>
//               <FormGroup>
//                 <label htmlFor="password">Password</label>
//                 <TextField
//                   size="small"
//                   type="password"
//                   variant="outlined"
//                   id="password"
//                   placeholder="Enter your password"
//                   required
//                   {...register("password")}
//                 />
//               </FormGroup>
//               <Button type="submit" variant="contained">
//                 Login
//               </Button>
//             </Stack>
//           </form>
//         </CardContent>
//       </Card>
//     </Stack>
//   );
// }

import * as React from "react";
import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Typography from "@mui/material/Typography";
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

export default function SignInSide() {
  const { account, setAccount } = useAuth();

  console.log({ account });
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<LoginUserSchema>();

  const onSubmit: SubmitHandler<LoginUserSchema> = async (data) => {
    let errorMessage;
    try {
      // send request
      const response = await API.auth.login(data);
      // store account details
      console.log({ data: response.data });
      setAccount(response.data);
      // show snackbar
      successSnackbar("Logged in successfully");
      if (response.data.user.role === UserRole.seller) {
        navigate("/seller/dashboard");
      } else {
        navigate("/");
      }
      return;
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
              Login
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
                id="email"
                label="Email Address"
                // name="email"
                autoComplete="email"
                autoFocus
                {...register("email")}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                // name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register("password")}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="http://localhost:5173/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
