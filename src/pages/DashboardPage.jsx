import { Box } from "@mui/material";
import { Contact } from "../components/Contact";
import { Layout } from "../components/Layout";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export function DashboardPage() {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <Layout>
        <Contact />
      </Layout>
      <Footer />
    </Box>
  );
}
