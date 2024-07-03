import type { ProductResponse } from "@backend/controller/product";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Badge,
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import LinkHref from "./LinkHref";

interface ProductProps {
  product: ProductResponse["product"];
  editable?: boolean;
  count?: number;
  delete?: () => void;
}

export default function Product(props: ProductProps) {
  const { product } = props;

  return (
    <Badge badgeContent={props.count} color="primary">
      <Card sx={{ minWidth: 250, maxWidth: 345 }}>
        <CardActionArea
          href={`/product/${product._id}`}
          LinkComponent={LinkHref}
        >
          <CardMedia
            sx={{ height: 150 }}
            image={product.imageUrl}
            title={product.productName}
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {product.productName}
            </Typography>
            <Box>
              <Typography variant="h6" component={"span"}>
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                  maximumFractionDigits: 0,
                }).format(product.price)}
              </Typography>{" "}
              <Typography
                variant="body2"
                component={"span"}
                color="text.secondary"
              >
                {product.description}
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {/* <IconButton sx={{ color: "black" }}>
            <AddShoppingCartIcon />
          </IconButton>
          <IconButton sx={{ color: "black" }}>
            <RemoveShoppingCartOutlinedIcon />
          </IconButton> */}
          {props.editable && (
            <>
              <IconButton
                sx={{ color: "black" }}
                href={`/product/edit/${product._id}`}
                LinkComponent={LinkHref}
              >
                <EditIcon />
              </IconButton>
              <IconButton sx={{ color: "black" }} onClick={props.delete}>
                <DeleteIcon />
              </IconButton>
            </>
          )}
        </CardActions>
      </Card>
    </Badge>
  );
}
