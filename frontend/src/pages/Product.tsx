import { ProductResponse } from "@backend/controller/product";
import { UserRole } from "@backend/types";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../hooks";
import { API } from "../services";
import { errorSnackbar, getErrorMessage, successSnackbar } from "../utils";

interface ProductProps {
  edit?: boolean;
  new?: boolean;
}

export default function ProductPage(props: ProductProps) {
  const navigate = useNavigate();
  const { account, isLoggedIn } = useAuth();
  const params = useParams();
  const [product, setProduct] = useState<ProductResponse["product"] | null>(
    null,
  );
  type FormValuesT = Omit<ProductResponse["product"], "_id"> & { _id?: string };
  const { register, reset, handleSubmit } = useForm<FormValuesT>({
    defaultValues: useMemo(() => {
      return product!;
    }, [product]),
  });
  const [quantity, setQuantity] = useState(1);
  const newProduct = props.new;
  const editProduct = props.edit;

  useEffect(() => {
    const asyncFn = async () => {
      if (!params.productId) return;
      try {
        const ret = await API.getOneProduct(params.productId);
        setProduct(ret.data.product);
        reset(ret.data.product);
      } catch (err) {
        errorSnackbar(getErrorMessage(err));
      }
    };

    asyncFn();
  }, [params.productId, reset]);

  if (!product && !newProduct) {
    return <div>Loading...</div>;
  }

  const onSubmit = async (data: FormValuesT) => {
    let errorMessage;
    if (newProduct) {
      try {
        // send request
        await API.createProduct(data, account!.token);
        // show snackbar
        successSnackbar("Product created successfully");
        navigate("/seller/dashboard");
        return;
      } catch (error) {
        errorMessage = getErrorMessage(error);
      }
      errorSnackbar(errorMessage);
    } else if (editProduct && data._id) {
      try {
        // send request
        await API.updateOneProduct(data._id, data, account!.token);
        // show snackbar
        successSnackbar("Product edited successfully");
        return;
      } catch (error) {
        errorMessage = getErrorMessage(error);
      }
      errorSnackbar(errorMessage);
    }
  };

  // const product = {
  //   _id: "4u-12389ucrpasdufr984",
  //   ownerId: "3948uraoise3r948ur98",
  //   description:
  //     "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
  //   imageUrl: "https://loremflickr.com/640/480?lock=2920861730340864",
  //   price: 125.0,
  //   productName: "Fall Limited Edition Sneakers",
  //   quantity: 66,
  // };

  const increaseQuantity = () => {
    if (quantity < product.quantity) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Container
      sx={{ py: 8 }}
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
    >
      {newProduct || product ? (
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            {editProduct ? (
              <TextField
                fullWidth
                type="url"
                label="Image URL"
                required
                {...register("imageUrl")}
              />
            ) : (
              <img
                src={product.imageUrl}
                alt={product.productName}
                style={{ width: "100%", borderRadius: "10px" }}
              />
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              <Typography variant="overline" display="block" gutterBottom>
                Product Details
              </Typography>
              {editProduct ? (
                <TextField
                  label="Product name"
                  required
                  {...register("productName")}
                />
              ) : (
                <Typography variant="h4" gutterBottom>
                  {product.productName}
                </Typography>
              )}
              {editProduct ? (
                <TextField
                  multiline
                  rows={5}
                  label="Product Description"
                  required
                  {...register("description")}
                />
              ) : (
                <Typography variant="body1" color="textSecondary" paragraph>
                  {product.description}
                </Typography>
              )}

              {editProduct ? (
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Amount
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    startAdornment={
                      <InputAdornment position="start">₹</InputAdornment>
                    }
                    label="Amount"
                    required
                    {...register("price")}
                  />
                </FormControl>
              ) : (
                <Typography variant="h5" gutterBottom>
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                    maximumFractionDigits: 0,
                  }).format(product.price)}
                </Typography>
              )}
              {/* MARK: Quantity */}
              <Box display="flex" alignItems="center" mt={2}>
                {
                  editProduct ? (
                    <TextField
                      label="Quantity"
                      type="number"
                      required
                      {...register("quantity")}
                    />
                  ) : (
                    <Typography>Quantity: {product.quantity}</Typography>
                  )
                  // <Paper
                  //   variant="outlined"
                  //   sx={{ display: "flex", alignItems: "center" }}
                  // >
                  //   <IconButton onClick={decreaseQuantity}>
                  //     <RemoveIcon />
                  //   </IconButton>
                  //   <InputBase
                  //     value={quantity}
                  //     readOnly
                  //     inputProps={{
                  //       style: {
                  //         textAlign: "center",
                  //       },
                  //     }}
                  //     sx={{ width: 50 }}
                  //   />
                  //   <IconButton onClick={increaseQuantity}>
                  //     <AddIcon />
                  //   </IconButton>
                  // </Paper>
                }

                {editProduct ? (
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ ml: 2 }}
                    startIcon={<AddIcon />}
                    type="submit"
                  >
                    Save details
                  </Button>
                ) : isLoggedIn && account?.user.role === UserRole.user ? (
                  <Stack direction={"row"}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      sx={{ ml: 2 }}
                      startIcon={<AddIcon />}
                      onClick={async () => {
                        let errorMessage = "";
                        try {
                          await API.addOneProductToCart(
                            { productId: product!._id },
                            account!.token,
                          );
                          successSnackbar("Product added to cart");
                          return;
                        } catch (error) {
                          errorMessage = getErrorMessage(error);
                        }
                        errorSnackbar(errorMessage);
                      }}
                    >
                      Add To Cart
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      sx={{ ml: 2 }}
                      startIcon={<RemoveIcon />}
                      onClick={async () => {
                        let errorMessage = "";
                        try {
                          // send request
                          await API.removeOneProductFromCart(
                            product!._id,
                            account!.token,
                          );
                          successSnackbar("Product removed from cart");
                          return;
                        } catch (error) {
                          errorMessage = getErrorMessage(error);
                        }
                        errorSnackbar(errorMessage);
                      }}
                    >
                      Remove from cart
                    </Button>
                  </Stack>
                ) : null}
              </Box>
            </Stack>
          </Grid>
        </Grid>
      ) : (
        <div>Loading</div>
      )}
    </Container>
  );
}
