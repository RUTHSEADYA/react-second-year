


import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser, registerUser } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { styled } from "@mui/system";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: "24px",
    backgroundColor: "#fff",
    color: "#000",
    padding: theme.spacing(6),
    width: "90vw",
    maxWidth: "600px",
    margin: "auto",
    boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.4)",
    border: "4px solid #DAA520",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#000",
  color: "#DAA520",
  fontWeight: "bold",
  textTransform: "none",
  marginTop: theme.spacing(3),
  width: "100%",
  padding: theme.spacing(1.5),
  fontSize: "1rem",
  "&:hover": {
    backgroundColor: "#DAA520",
    color: "#000",
    border: "2px solid #000",
  },
}));

const ErrorMessage = styled(Typography)(({ theme }) => ({
  color: "red",
  fontSize: "1rem",
  marginTop: theme.spacing(1),
  textAlign: "center",
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "2rem",
  fontWeight: "bold",
  color: "#000",
  textShadow: "1px 1px 4px rgba(218, 165, 32, 0.6)",
  marginBottom: theme.spacing(3),
}));

const SignInAndSignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [isSignUp, setIsSignUp] = useState(false); // מצב לניהול התחברות/הרשמה
  const [isSupplier, setIsSupplier] = useState(false); // מצב לבדיקת הרשמת ספק
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);
  const [open, setOpen] = useState(true);



  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleSignUp = async () => {
    if (!validateEmail(email)) {
      setEmailError("כתובת אימייל אינה תקינה");
      return; // עצור את תהליך ההרשמה
    }
  
    setEmailError(""); // איפוס הודעת השגיאה אם הכל תקין
  
    try {
      const payload = {
        username,
        password,
        email,
        userType: isSupplier ? "SUPPLIER" : "CUSTOMER", // וידוא סוג משתמש
      };
      console.log("Payload sent:", payload); // הדפסה לאימות
      const result = await dispatch(registerUser(payload));
      if (result.payload) {
        setOpen(false);
        navigate("/home");
      }
    } catch (err) {
      console.error("SignUp failed:", err);
    }
  };
  

  const handleLogin = async () => {
    try {
      const result = await dispatch(LoginUser({ username, password }));
      if (result.payload) {
        localStorage.setItem("currentUser", JSON.stringify(result.payload));

        setOpen(false);
        navigate("/home");
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };


  

  return (
    <StyledDialog open={open} disableEscapeKeyDown>
      <DialogContent>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Title>{isSignUp ? "הרשמה" : "התחברות"}</Title>
          <TextField
            required
            variant="outlined"
            placeholder="שם משתמש"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon sx={{ color: "#DAA520" }} />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            required
            variant="outlined"
            type="password"
            placeholder="סיסמה"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: "#DAA520" }} />
                </InputAdornment>
              ),
            }}
          />
          {isSignUp && (
            <>
                 <TextField
  required
  variant="outlined"
  placeholder="אימייל"
  value={email}
  onChange={(e) => {
    setEmail(e.target.value);
    setEmailError(""); // איפוס שגיאה כאשר המשתמש מקליד
  }}
  type="email"
  fullWidth
  margin="normal"
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <AccountCircleIcon sx={{ color: "#DAA520" }} />
      </InputAdornment>
    ),
  }}
  error={!!emailError} // שדה אדום במקרה של שגיאה
  helperText={emailError} // הודעת שגיאה
/>

              
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isSupplier}
                    onChange={(e) => setIsSupplier(e.target.checked)}
                  />
                }
                label="הרשמה כספק"
              />
            </>
          )}
          <StyledButton onClick={isSignUp ? handleSignUp : handleLogin}>
            {loading ? "טוען..." : isSignUp ? "הרשם" : "התחבר"}
          </StyledButton>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Typography
            onClick={() => setIsSignUp(!isSignUp)}
            sx={{
              marginTop: 2,
              cursor: "pointer",
              color: "#DAA520",
              textDecoration: "underline",
            }}
          >
            {isSignUp ? "כבר רשום? התחבר" : "לא נרשמת עדיין? הרשם עכשיו"}
          </Typography>
        </Box>
      </DialogContent>
    </StyledDialog>
  );
};

export default SignInAndSignUp;


