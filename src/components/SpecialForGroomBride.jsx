import React from "react";
import { Container, Box, Typography, Button, Grid } from "@mui/material";
import { motion } from "framer-motion";

const WeddingServices = () => {
  const canvaUrl = "https://www.canva.com/templates/wedding-invitations/";
  const weddingChecklistUrl = "https://www.theknot.com/wedding-checklist";
  const budgetPlannerUrl = "https://www.theknot.com/wedding-budget-tool";
  const seatingChartToolUrl = "https://www.zola.com/wedding-planning/seating-chart";
  const honeymoonPlannerUrl = "https://secretflights.co.il/";

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 4,
        mb: 4,
        bgcolor: "#fff",
        color: "#333",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        padding: 3,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          align="center"
          sx={{ color: "#333", fontWeight: "bold" }}
        >
          <span style={{ color: "goldenrod" }}>שירותים מיוחדים</span> לחתן ולכלה
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <Box
          sx={{
            mb: 5,
            borderBottom: "2px solid goldenrod",
            paddingBottom: 3,
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{ color: "#333", fontWeight: "500" }}
          >
            יצירת רשימת מוזמנים
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "goldenrod",
              color: "#fff",
              "&:hover": {
                backgroundColor: "black",
                color: "goldenrod",
              },
            }}
            href="https://sheets.google.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            צור את רשימת המוזמנים שלך
          </Button>
        </Box>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <Box
          sx={{
            mb: 5,
            borderBottom: "2px solid gold",
            paddingBottom: 3,
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{ color: "#333", fontWeight: "500" }}
          >
            עיצוב הזמנה לחתונה
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "goldenrod",
              color: "#fff",
              "&:hover": {
                backgroundColor: "black",
                color: "gold",
              },
            }}
            href={canvaUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            עיצוב ההזמנה שלי
          </Button>
        </Box>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.9 }}
      >
        <Box>
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{ color: "#333", fontWeight: "500" }}
          >
            כלים נוספים לתכנון חתונה
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "gold",
                  color: "#333",
                  "&:hover": {
                    backgroundColor: "gold",
                    color: "#fff",
                  },
                }}
                href={weddingChecklistUrl}
                target="_blank"
                rel="noopener noreferrer"
                fullWidth
              >
                רשימת משימות
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "gold",
                  color: "#333",
                  "&:hover": {
                    backgroundColor: "gold",
                    color: "#fff",
                  },
                }}
                href={budgetPlannerUrl}
                target="_blank"
                rel="noopener noreferrer"
                fullWidth
              >
                תכנון תקציב
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "gold",
                  color: "#333",
                  "&:hover": {
                    backgroundColor: "gold",
                    color: "#fff",
                  },
                }}
                href={seatingChartToolUrl}
                target="_blank"
                rel="noopener noreferrer"
                fullWidth
              >
                תכנון מקומות ישיבה
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "gold",
                  color: "#333",
                  "&:hover": {
                    backgroundColor: "gold",
                    color: "#fff",
                  },
                }}
                href={honeymoonPlannerUrl}
                target="_blank"
                rel="noopener noreferrer"
                fullWidth
              >
                תכנון ירח דבש
              </Button>
            </Grid>
          </Grid>
        </Box>
      </motion.div>
    </Container>
  );
};

export default WeddingServices;
