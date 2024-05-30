import { Box } from "@mui/material";
import { Footer } from "../components/Footer";
import { Layout } from "../components/Layout";
import { Navbar } from "../components/Navbar";
import { Signin } from "../components/Signin";

export function SigninPage() {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <Layout>
        <Signin />
      </Layout>
      <Footer />
    </Box>
  );
}
