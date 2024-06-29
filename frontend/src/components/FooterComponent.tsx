// import React from "react";
import "../component.css/FooterStyle.css";
// const FooterComponent: React.FC = () => {
//   return (
//     <>
//       <footer className="footer sticky-bottom bg-dark text-white mt-auto py-3">
//         <div className="container text-center">
//           <span className="text-muted">
//             © 2024 E-mandi.Co . All rights reserved.
//           </span>
//         </div>
//       </footer>
//     </>
//   );
// };

// export default FooterComponent;

import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Box } from "@mui/material";

const FooterComponent: React.FC = () => {
  return (
    <Box
      component="footer"
      className="footer"
      alignItems="center"
      sx={{
        // backgroundColor: (theme) =>
        //   theme.palette.mode === "light"
        //     ? theme.palette.grey[200]
        //     : theme.palette.grey[800],
        p: 2,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" color="#2E2D2D">
              We are E-Mandi.Co , dedicated to providing the best service to our
              customers.
            </Typography>
          </Grid>
          {/* <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              123 Main Street, Anytown, USA
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: emandi@org.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: +1 234 567 8901
            </Typography>
          </Grid> */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="#2E2D2D" gutterBottom>
              Follow Us
            </Typography>
            <Link href="https://www.facebook.com/" color="#2E2D2D">
              <Facebook />
            </Link>
            <Link
              href="https://www.instagram.com/"
              color="#2E2D2D"
              sx={{ pl: 1, pr: 1 }}
            >
              <Instagram />
            </Link>
            <Link href="https://www.twitter.com/" color="#2E2D2D">
              <Twitter />
            </Link>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            {"Copyright © "}
            <Link color="#2E2D2D" href="https://your-website.com/">
              E-Mandi.Co
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default FooterComponent;
