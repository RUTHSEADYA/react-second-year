

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Checkbox,
  FormControlLabel,
  TextareaAutosize,
  MenuItem,
  Select,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../slices/supplierRequestSlice";

export default function SupplierRequest() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [requestText, setRequestText] = useState("");
  const [chooseTypeOfSupplier, setChooseTypeOfSupplier] = useState("");
  const [mail, setMail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [currentGif, setCurrentGif] = useState(0);
  const formattedDate = new Date().toISOString().split("T")[0];
  const gifs = [
    "/src/photo/Black and White Animated Thank You Video (4).gif",
    "/src/photo/Black and White Animated Thank You Video (3).gif",
  ];

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.supplierRequest);

  useEffect(() => {
    let timer;

    const updateGif = () => {
      setCurrentGif((prevGif) => (prevGif + 1) % gifs.length);
    };

    const startTimer = () => {
      const nextInterval = currentGif === 0 ? 3000 : 12000;
      timer = setTimeout(() => {
        updateGif();
        startTimer();
      }, nextInterval);
    };

    startTimer();

    return () => clearTimeout(timer);
  }, [currentGif, gifs]);


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   


  const handleEmailChange = (e) => {
    const email = e.target.value;
    setMail(email);
    

  };

  const handleSubmit = (e) => {
      e.preventDefault();
    if (!isTermsAccepted) {
      alert("עליך לאשר את התקנון לפני שליחת הבקשה");
      return;
    }
    if (!emailRegex.test(mail)) {
      alert('אימייל לא תקין');
      return; 
    }
    if (
      requestText.trim() === "" ||
      chooseTypeOfSupplier.trim() === "" ||
      mail.trim() === ""
    ) {
      alert("אנא מלא את כל השדות לפני שליחה");
      return;
    }

    

    dispatch(
      addRequest({
        request: requestText,
        date: formattedDate,
        typeOfSupplier: chooseTypeOfSupplier,
        email: mail,
      })
    )
      .then(() => {
        setRequestText("");
        setChooseTypeOfSupplier("");
        setMail("");
        alert("הבקשה נוספה בהצלחה!");
        setIsDialogOpen(false);
      })
      .catch((err) => console.error("Error adding request:", err));
  };

  return (
    <Box
      sx={{
        padding: 4,
        textAlign: "center",
        backgroundColor: "black",
        color: "white",
        borderRadius: 2,
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "relative",
          height: "400px",
          marginBottom: 3,
        }}
      >
        <img
          src={gifs[currentGif]}
          alt="Animated gif"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
        <Button
          onClick={() => setIsDialogOpen(true)}
          variant="contained"
          sx={{
            position: "absolute",
            bottom: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "gold",
            color: "black",
            "&:hover": { backgroundColor: "darkgoldenrod" },
          }}
        >
          לשליחת בקשה לפירסום
        </Button>
      </Box>

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle
          sx={{ backgroundColor: "pink", color: "gray", textAlign: "center" }}
        >
          טופס פרסום באתר
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: "white", color: "black" }}>
          <Typography variant="body1" sx={{ marginBottom: 2, textAlign: "justify" }}>
            השימוש באתר מותנה בהסכמה לכללי התקנון. בעת מילוי בקשה לפרסום, עליך להתחייב לספק מידע אמין
            ומדויק, לעמוד בדרישות האתר, ולהתנהל בהתאם לערכי היושרה והכבוד כלפי הלקוחות.
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={isTermsAccepted}
                onChange={(e) => setIsTermsAccepted(e.target.checked)}
                sx={{ color: "gold" }}
              />
            }
            label={<Typography sx={{ color: "primary.main" }}>אני מאשר/ת את התקנון</Typography>}
          />
          <form onSubmit={handleSubmit}>
            <TextareaAutosize
              value={requestText}
              onChange={(e) => setRequestText(e.target.value)}
              placeholder="כתוב את הבקשה שלך כאן"
              style={{
                width: "97%",
                padding: 10,
                borderRadius: 5,
                marginBottom: 20,
                backgroundColor: "white",
                color: "black",
              }}
            />
            <Typography sx={{ marginBottom: 1 }}>בחר סוג ספק:</Typography>
            <Select
              value={chooseTypeOfSupplier}
              onChange={(e) => setChooseTypeOfSupplier(e.target.value)}
              fullWidth
              displayEmpty
              sx={{ marginBottom: 3, backgroundColor: "white", color: "black" }}
            >
              <MenuItem value="">אחר</MenuItem>
              <MenuItem value="זמר">זמרים</MenuItem>
              <MenuItem value="צילום">צלמים</MenuItem>
              <MenuItem value="בעל קייטרינג">בעלי קייטרינג</MenuItem>
              <MenuItem value="מפיק">מפיקים</MenuItem>
              <MenuItem value="בעל אולם ">בעל אולם</MenuItem>
              <MenuItem value="מעצבי פרחים">מעצבי פרחים</MenuItem>
            </Select>
            <Typography sx={{ marginBottom: 1 }}>אימייל ליצירת קשר</Typography>
            <TextareaAutosize
              value={mail}
              onChange={handleEmailChange}
              placeholder="הכנס אימייל"
              style={{
                width: "97%",
                padding: 10,
                borderRadius: 5,
                marginBottom: 20,
                backgroundColor: "white",
                color: "black",
                border: emailError ? "2px solid red" : "1px solid gray",
              }}
            />
            {emailError && (
              <Typography sx={{ color: "red", fontSize: "0.9rem" }}>
                {emailError}
              </Typography>
            )}
            <Button
              type="submit"
              disabled={!isTermsAccepted}
              variant="contained"
              sx={{
                backgroundColor: "gold",
                color: "black",
                "&:hover": { backgroundColor: "darkgoldenrod" },
              }}
            >
              {loading ? "טוען..." : "שלח בקשה"}
            </Button>
          </form>
          {error && (
            <Typography sx={{ color: "red", marginTop: 2 }}>
              שגיאה בשליחת הבקשה: {error}
            </Typography>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
