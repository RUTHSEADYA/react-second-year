


import { useState } from "react";
import {  useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Menu, MenuItem, IconButton, Avatar, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { logout, updateUser } from "../slices/userSlice";

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const [position, setPosition] = useState(null);
  const [openDialog, setOpenDialog] = useState(false); // לדיאלוג של עדכון פרופיל
  const [updatedUser, setUpdatedUser] = useState(currentUser || {});

  const open = Boolean(position);

  const handleMenuOpen = (event) => {
    setPosition(event.currentTarget);
  };

  const handleMenuClose = () => {
    setPosition(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    dispatch(logout());
    navigate("/");
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
    handleMenuClose(); // סוגר את תפריט הפרופיל
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };


const handleUpdateProfile = () => {
    dispatch(updateUser({ id: currentUser.id, user: updatedUser }))
    
        .unwrap()
        .then(() => {
            console.log("Profile updated successfully");
            alert("פרופיל עודכן בהצלחה")
            localStorage.setItem("currentUser", JSON.stringify(updatedUser));

      // עדכון ה-state של המשתמש
      setUpdatedUser(updatedUser);

      handleDialogClose();
        })
        .catch((error) => {
            console.error("Failed to update profile", error);
        });
};


  return (
    <>
      {currentUser ? (
        <>
          <IconButton onClick={handleMenuOpen} sx={{
    marginLeft: 2,
     padding: "4px",
  }}>
  <Avatar
    sx={{
      bgcolor: "#DAA520",
      width: 40,  // גודל אחיד
      height: 40,
      objectFit: "cover", // התמונה לא נחתכת
      borderRadius: "50%", // עיגול מושלם
      marginRight:"170%",
 
      overflow: 'visible', // וודא שהוא לא נחתך
      // גודל אחיד
    }}
  >              {currentUser.username[0].toUpperCase()}
            </Avatar>
          </IconButton>
          <Menu
  anchorEl={position}
  open={open}
  onClose={handleMenuClose}
  PaperProps={{
    sx: { mt: 1, borderRadius: 2,
      overflow: 'visible',
      minWidth: 200,
      maxHeight: '400px',  // הגבלת גובה אם יש יותר מדי פריטים בתפריט
      overflowY: 'auto',
      display: 'flex', 
    alignItems: 'center', 
    justifyContent: { xs: 'center', sm: 'flex-end' }, 
    gap: '8px', 
    width: '8%',
     

     }, // ביטול רווח מוגזם בראש ה-Menu
  }}
 >

            <MenuItem disabled>
              <Typography>מחובר כ: {currentUser.username}</Typography>
            </MenuItem>
            <MenuItem onClick={handleDialogOpen}>עדכון פרופיל</MenuItem>
            <MenuItem onClick={handleLogout}>התנתק</MenuItem>
          </Menu>

          {/* דיאלוג לעדכון פרופיל */}
          <Dialog open={openDialog} onClose={handleDialogClose}>
            <DialogTitle>עדכון פרופיל</DialogTitle>
            <DialogContent>
              <TextField
                label="שם משתמש"
                fullWidth
                margin="normal"
                value={updatedUser.username || ""}
                onChange={(e) =>
                  setUpdatedUser({ ...updatedUser, username: e.target.value })
                }
              />
              <TextField
                label="אימייל"
                fullWidth
                margin="normal"
                value={updatedUser.email || ""}
                onChange={(e) =>
                  setUpdatedUser({ ...updatedUser, email: e.target.value })
                }
              />
              <TextField
                label="סיסמה"
                fullWidth
                margin="normal"
                type="password"
                value={updatedUser.password || ""}
                onChange={(e) =>
                  setUpdatedUser({ ...updatedUser, password: e.target.value })
                }
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose}>בטל</Button>
              <Button variant="contained" onClick={handleUpdateProfile}>
                עדכן
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <Typography
          sx={{ color: "#DAA520", cursor: "pointer" ,marginRight:"5%" }}
          onClick={() => navigate("/signInAndSignUp")}
        >
          אינך מחובר
        </Typography>
      )}
    </>
  );
};

export default UserProfile;

