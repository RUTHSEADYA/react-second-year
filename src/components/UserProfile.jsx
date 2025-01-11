


import { useState } from "react";
import {  useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Menu, MenuItem, IconButton, Avatar, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { logout, updateUser, signOutUser } from "../slices/userSlice";

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const [position, setPosition] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(currentUser || {});

  const open = Boolean(position);

  const handleMenuOpen = (event) => {
    setPosition(event.currentTarget);
  };

  const handleMenuClose = () => {
    setPosition(null);
  };


  const handleLogout = async () => {
    try {
      localStorage.removeItem("currentUser");
      await dispatch(signOutUser()); 
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };
  


  const handleDialogOpen = () => {
    setOpenDialog(true);
    handleMenuClose(); 
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
      width: 40,  
      height: 40,
      objectFit: "cover", 
      borderRadius: "50%", 
      marginRight:"170%",
 
      overflow: 'visible', 
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
      maxHeight: '400px',  
      overflowY: 'auto',
      display: 'flex', 
    alignItems: 'center', 
    justifyContent: { xs: 'center', sm: 'flex-end' }, 
    gap: '8px', 
    width: '8%',
     

     }, 
  }}
 >

            <MenuItem disabled>
              <Typography>מחובר כ: {currentUser.username}</Typography>
            </MenuItem>
            <MenuItem onClick={handleDialogOpen}>עדכון פרופיל</MenuItem>
            <MenuItem onClick={handleLogout}>התנתק</MenuItem>
          </Menu>

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

