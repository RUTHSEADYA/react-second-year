import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Box, Button, IconButton } from '@mui/material';
import UserProfile from './UserProfile'; 

const Navbar = () => {
  const user = useSelector((state) => state.user.currentUser); 

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: 'black',
        color: 'gold',
        width: '100vw',
        margin: 0, 
     
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',  
          flexDirection: { xs: 'column', sm: 'row' }, 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          width: '100%', 
          padding: '0 16px', 
          minHeight: '64px',
          overflowX: 'hidden', 
         


        }}
      >
        <Box
          component="img"
          src="/src/photo/קולולו (4).gif" 
          alt="לוגו"
          sx={{
            maxWidth: '100%', 
            height: { xs: '50px', sm: '60px' }, 
            marginBottom: { xs: '10px', sm: '0' },
          }}
        />

        <Box
          sx={{
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: { xs: 'center', sm: 'flex-end' }, 
            gap: '20px', 
            width: '100%', 
          }}
        
        
        >
          {user?.username === 'מנהל' && user?.password === '$2a$08$KGp/4eTLFE9fv/8g37OZ4e2UNSffuSX0y/KgG64B8RFZcWu5NMcfS' && (
            <Button component={Link} to="/reqeustToManager" sx={buttonStyle}>
              בקשות למנהל
            </Button>
          )}

          <Button component={Link} to="/weddingService" sx={buttonStyle}>
            שירותים מיוחדים לחתן ולכלה
          </Button>
          {(user?.userType === 'SUPPLIER' || (user?.username === 'מנהל' && user?.password === '$2a$08$KGp/4eTLFE9fv/8g37OZ4e2UNSffuSX0y/KgG64B8RFZcWu5NMcfS')) && (
            <Button component={Link} to="/supplierRequest" sx={buttonStyle}>
              פרסום באתר
            </Button>
          )}
          <Button component={Link} to="/home" sx={buttonStyle}>
            דף הבית
          </Button>
          <Button component={Link} to="/flowers" sx={buttonStyle}>
            מעצבי פרחים
          </Button>
          <Button component={Link} to="/catering" sx={buttonStyle}>
            קייטרינג
          </Button>
          <Button component={Link} to="/producer" sx={buttonStyle}>
            מפיקים
          </Button>
          <Button component={Link} to="/photographer" sx={buttonStyle}>
            צלמים
          </Button>
          <Button component={Link} to="/halls" sx={buttonStyle}>
            אולמות
          </Button>
          <Button component={Link} to="/singers" sx={buttonStyle}>
            זמרים
          </Button>
          <Button component={Link} to="/about" sx={buttonStyle}>
            אודותינו
          </Button>

          {!user && (
            <Button
              component={Link}
              to="/signInAndSignUp"
              sx={{
                ...buttonStyle, 
                backgroundColor: 'black', 
                padding: '8px 16px', 
                border: '2px solid gold', 
                borderRadius: '8px', 
                fontWeight: 'bold', 
                fontSize: '16px', 
                '&:hover': {
                  backgroundColor: 'gold', 
                  color: 'black', 
                  borderColor: 'black', 
                },
              }}
            >
              התחברות
            </Button>
          )}

          <UserProfile />
        </Box>
      </Toolbar>
    </AppBar>
  );
};


const buttonStyle = {
  color: 'gold', 
  '&:hover': {
    color: 'white', 
  },
};

export default Navbar;
