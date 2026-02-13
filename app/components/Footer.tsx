import { Box, Container, Typography } from "@mui/material";
const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        backgroundColor: "primary.main",
        color: "white",
        position: "fixed",
        bottom: 0,
        width: "100%",
        zIndex: 1000,
      }}
    >
      <Container maxWidth="lg">
        <Typography align="center">&copy; Next Blog</Typography>
      </Container>
    </Box>
  );
};
export default Footer;
