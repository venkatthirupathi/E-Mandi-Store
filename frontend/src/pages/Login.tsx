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

function FormGroup({ children }: PropsWithChildren) {
  return <Stack spacing={1}>{children}</Stack>;
}

// TODO: validation
export default function Login() {
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
    <Stack alignItems={"center"} spacing={4} marginTop={6}>
      <Typography variant="h2" fontSize={32} sx={{ fontWeight: "bold" }}>
        Login
      </Typography>
      <Card sx={{ minWidth: 400 }} elevation={4}>
        <CardContent sx={{ padding: 3 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <FormGroup>
                <label htmlFor="email">Email</label>
                <TextField
                  size="small"
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  variant="outlined"
                  {...register("email")}
                  required
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="password">Password</label>
                <TextField
                  size="small"
                  type="password"
                  variant="outlined"
                  id="password"
                  placeholder="Enter your password"
                  required
                  {...register("password")}
                />
              </FormGroup>
              <Button type="submit" variant="contained">
                Login
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Stack>
  );
}
