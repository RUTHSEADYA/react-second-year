

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteReqeust, getReqeusts } from "../slices/requestToManagerSlice";
import { Container, Grid, Card, CardContent, Typography, Button, CircularProgress, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export default function RequestToManager() {
  const dispatch = useDispatch();
  const { requests, loading: requestLoading, error: requestError } = useSelector((state) => state.requestToManager);

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  useEffect(() => {
    dispatch(getReqeusts());
  }, [dispatch]);

  const handleOpenDialog = (id) => {
    setSelectedRequestId(id);
    setOpenConfirmDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenConfirmDialog(false);
    setSelectedRequestId(null);
  };

  const handleDeleteRequest = async () => {
    try {
      if (selectedRequestId) {
        await dispatch(deleteReqeust(selectedRequestId));
        alert("נמחק בהצלחה!");
      }
    } catch (error) {
      console.error("אירעה שגיאה במחיקת הבקשה", error);
      alert("אירעה שגיאה במחיקת הבקשה");
    }
    finally {
      handleCloseDialog();
    }
  };

  if (requestLoading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (requestError) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Alert severity="error">שגיאה: {requestError}</Alert>
      </Container>
    );
  }

  return (
    <>
      <Typography variant="h6" align="center" gutterBottom sx={{ color: "black" }}>
        לוח בקשות למנהל
      </Typography>
      <Container
        sx={{
          marginTop: 2,
          backgroundImage: "url('src/photo/Leonardo_Phoenix_A_rustic_black_cork_board_background_with_a_s_1.jpg')",
          backgroundColor: "#deb887",
          padding: 4,
          borderRadius: 4,
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          height: "80vh",
          width: "60vw",
          overflowY: "auto",

        }}
      >
        {requests && requests.length > 0 ? (
          <Grid container spacing={3}>
            {requests.map((request) => (
              <Grid item xs={12} sm={6} md={4} key={request.id}>
                <Card
                  sx={{
                    backgroundColor: "#fff8e1",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                    transform: "rotate(-1deg)",
                    border: "2px solid #ffe0b2",
                    position: "relative",
                    "&:hover": {
                      transform: "rotate(0deg) scale(1.02)",
                      transition: "all 0.3s ease",
                    },
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ fontFamily: "Cursive", color: "black", textAlign: "right", direction: "rtl"}}
                    >
                      תאריך: {request.date}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: "bold", color: "black"  ,textAlign: "right", direction: "rtl"}}>
                      סוג הספק המבקש: {request.typeOfSupplier}
                    </Typography>
                    <Typography variant="body2" sx={{ marginY: 1, color: "black", textAlign: "right", direction: "rtl" }}>
                      <strong>בקשה:</strong> {request.request}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "black" , textAlign: "right", direction: "rtl"}}>
                      <strong>אימייל:</strong> {request.email}
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={() => handleOpenDialog(request.id)}
                      sx={{
                        marginTop: 2,
                        width: "100%",
                        backgroundColor: "goldenrod",
                        color: "black",
                        "&:hover": {
                          backgroundColor: "#444",
                        },
                      }}
                    >
                      בקשה טופלה
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1" align="center" sx={{ marginTop: 4, color: "#4e342e" }}>
            לא נמצאו בקשות
          </Typography>
        )}
      </Container>

      {/* Confirmation Dialog */}
      <Dialog open={openConfirmDialog} onClose={handleCloseDialog}>
        <DialogTitle>אישור מחיקת בקשה</DialogTitle>
        <DialogContent>
          <DialogContentText>האם אתה בטוח שסיימת לטפל בבקשה זו?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            ביטול
          </Button>
          <Button onClick={handleDeleteRequest} color="primary">
            אישור
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
