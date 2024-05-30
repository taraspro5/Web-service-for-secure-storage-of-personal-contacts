import { Box, Button, Typography } from "@mui/material";
import { Layout } from "../components/Layout";
import { Navbar } from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Footer } from "../components/Footer";

export function WelcomePage() {
  const navigate = useNavigate();

  const { isLoggedIn } = useSelector((state) => state.auth);

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <Layout>
        <Typography
          variant="subtitle1"
          sx={{ fontSize: 40, textAlign: "center", marginTop: 2 }}
        >
          Witamy w DataProtectSafe!
        </Typography>

        <Typography
          variant="h1"
          sx={{ fontSize: 25, textAlign: "center", marginTop: 2 }}
        >
          DataProtectSafe to niezawodna usługa internetowa, która umożliwia
          łatwe przechowywanie, zarządzanie i zabezpieczanie twoich osobistych
          kontaktów w formie cyfrowej. Oferujemy wysoki poziom bezpieczeństwa i
          poufności dla wszystkich twoich danych, abyś mógł czuć się pewnie,
          wiedząc, że twoje informacje są bezpieczne.
        </Typography>
        {!isLoggedIn && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "20px 0",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{ marginRight: 2 }}
              onClick={() => handleNavigate("/signup")}
            >
              Rejestracja
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleNavigate("/signin")}
            >
              Logowanie
            </Button>
          </div>
        )}
      </Layout>
      <Footer />
    </Box>
  );
}
