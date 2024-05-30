import { Box } from "@mui/material";
import { Layout } from "../components/Layout";
import { Navbar } from "../components/Navbar";
import { Signup } from "../components/Signup";
import { Footer } from "../components/Footer";

export function SignupPage() {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <Layout>
        <Signup />
      </Layout>
      <Footer />
    </Box>
  );
}
