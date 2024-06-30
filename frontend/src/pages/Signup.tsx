import { CreateUserSchema } from "@backend/model/UserModel";
import { UserRole } from "@backend/types";
import {
  Button,
  Card,
  CardContent,
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

function FormGroup({ children }: PropsWithChildren) {
  return <Stack spacing={1}>{children}</Stack>;
}

// TODO: validation
const Signup: React.FC = () => {
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
    <Stack alignItems={"center"} spacing={4} marginTop={6}>
      <Typography variant="h2" fontSize={32} sx={{ fontWeight: "bold" }}>
        Sign Up
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
              <FormGroup>
                <label htmlFor="username">Username</label>
                <TextField
                  size="small"
                  type="text"
                  id="username"
                  placeholder="Enter your username"
                  required
                  {...register("username")}
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="mobileNumber">Mobile number</label>
                <TextField
                  size="small"
                  type="text"
                  id="mobileNumber"
                  placeholder="Enter your mobile number"
                  required
                  {...register("mobileNumber")}
                />
              </FormGroup>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <label htmlFor="role">Role</label>
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
                        <ToggleButton value="user">Buyer</ToggleButton>
                        <ToggleButton value="seller">Seller</ToggleButton>
                      </ToggleButtonGroup>
                    );
                  }}
                />
              </Stack>
              <Button type="submit" variant="contained">
                Sign up
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default Signup;
