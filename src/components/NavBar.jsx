import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Box, Button, Avatar, IconButton } from '@mui/material';
import UserProfile from './UserProfile'; // קומפוננטה להצגת פרופיל המשתמש

const Navbar = () => {
  const user = useSelector((state) => state.user.currentUser); // שליפת המשתמש הנוכחי מ-Redux

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: 'black', // צבע רקע שחור
        color: 'gold', // צבע טקסט זהב
        width: '100vw',
        margin: 0, // ביטול שוליים חיצוניים
       // padding: "4px", // ריווח פנימי קטן
        //minHeight: '72px',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
           // שימוש ב-Flexbox לסידור האלמנטים
          flexDirection: { xs: 'column', sm: 'row' }, // תצוגה אנכית במסכים קטנים ואופקית בגדולים
          justifyContent: 'space-between', // פיזור אלמנטים בין קצוות
          alignItems: 'center', // יישור אנכי של האלמנטים
          width: '100%', // שימוש בכל הרוחב
          padding: '0 16px', // ריווח פנימי אופקי בתוך ה-Toolbar
          minHeight: '64px',
          overflowX: 'hidden', 
          // מניעת גלילה אופקית


        }}
      >
        {/* לוגו */}
        <Box
          component="img"
          src="/src/photo/קולולו (4).gif" // נתיב לתמונה של הלוגו
          alt="לוגו"
          sx={{
            maxWidth: '100%', 
            height: { xs: '50px', sm: '60px' }, // גובה מותאם למסכים קטנים וגדולים
            marginBottom: { xs: '10px', sm: '0' }, // ריווח תחתון במסכים קטנים בלבד
          }}
        />

        {/* כפתורים ופרופיל משתמש */}
        <Box
          sx={{
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: { xs: 'center', sm: 'flex-end' }, 
            gap: '20px', 
            width: '100%', // זה חשוב כדי שהפרופיל יתפוס את כל הרוחב
          }}
        
        
        >
          {/* תנאי להצגת כפתור בקשות למנהל */}
          {user?.username === 'מנהל' && user?.password === '12' && (
            <Button component={Link} to="/reqeustToManager" sx={buttonStyle}>
              בקשות למנהל
            </Button>
          )}

          {/* כפתורים נוספים */}
          <Button component={Link} to="/weddingService" sx={buttonStyle}>
            שירותים מיוחדים לחתן ולכלה
          </Button>
          {(user?.userType === 'SUPPLIER' || (user?.username === 'מנהל' && user?.password === '12')) && (
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

          {/* כפתור התחברות למשתמשים שאינם מחוברים */}
          {!user && (
            <Button
              component={Link}
              to="/signInAndSignUp"
              sx={{
                ...buttonStyle, // שימוש בסגנון הכפתורים הרגיל
                backgroundColor: 'black', // רקע שחור לכפתור
                padding: '8px 16px', // ריווח פנימי
                border: '2px solid gold', // מסגרת זהב
                borderRadius: '8px', // עיגול פינות
                fontWeight: 'bold', // טקסט מודגש
                fontSize: '16px', // גודל טקסט
                '&:hover': {
                  backgroundColor: 'gold', // רקע זהב במעבר עכבר
                  color: 'black', // טקסט שחור במעבר עכבר
                  borderColor: 'black', // מסגרת שחורה במעבר עכבר
                },
              }}
            >
              התחברות
            </Button>
          )}

          {/* פרופיל משתמש */}
          <UserProfile />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

// סגנון הכפתורים הכללי
const buttonStyle = {
  color: 'gold', // צבע טקסט זהב
  '&:hover': {
    color: 'white', // טקסט לבן במעבר עכבר
  },
};

export default Navbar;
