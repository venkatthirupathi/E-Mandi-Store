import type { ProductResponse } from "@backend/controller/product";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import RemoveShoppingCartOutlinedIcon from "@mui/icons-material/RemoveShoppingCartOutlined";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Drawer as MuiDrawer,
  Typography,
  styled,
} from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useSearchParams } from "react-router-dom";
import LinkHref from "../components/LinkHref";
import { zIndex } from "../constants";
import { data } from "../data";

const drawerWidth = 240;

const Main = styled("main")(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  ...(true && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const Drawer = styled(MuiDrawer)({
  position: "relative", //imp
  width: drawerWidth, //drawer width
  "& .MuiDrawer-paper": {
    width: drawerWidth, //drawer width
    position: "absolute", //imp
    transition: "none !important",
  },
});

interface ProductProps {
  product: ProductResponse["product"];
}

function Product(props: ProductProps) {
  const { product } = props;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea href={`/product/${product._id}`} LinkComponent={LinkHref}>
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
        <IconButton sx={{ color: "black" }}>
          <AddShoppingCartIcon />
        </IconButton>
        <IconButton sx={{ color: "black" }}>
          <RemoveShoppingCartOutlinedIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default function PersistentDrawerLeft() {
  const [searchParams] = useSearchParams();
  const query: string = searchParams.get("q") ?? "";

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{ zIndex: zIndex.SearchPageDrawer }}
      >
        <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main>
        <Grid container spacing={2}>
          {data.map((val) => (
            <Grid>
              <Product product={val} />
            </Grid>
          ))}
        </Grid>
      </Main>
    </Box>
  );
}
