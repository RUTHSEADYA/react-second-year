


import React from 'react';
import { Button, Box, Typography, Container } from '@mui/material';

export default function About() {
  const scrollToContact = () => {
    document.getElementById('contact-section').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(180deg, #FFFFFF, #f5f5f5, #e0e0e0)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Button
        onClick={scrollToContact}
        variant="contained"
        sx={{
          position: 'absolute',
          top: '260px',
          right: '300px',
          backgroundColor: '#d4af37',
          color: '#fff',
          '&:hover': { backgroundColor: '#b7950b' },
        }}
      >
        צור קשר
      </Button>


      <Box
        sx={{
          mb: 5,
          py: 2,
          borderBottom: '2px solid #d4af37',
        }}
      >
        <img
          src="src/photo/קולולו (5).png" 
          alt="לוגו האתר"
          style={{
            maxWidth: '150px',
            borderRadius: '50%',
            border: '2px solid #000',
          }}
        />
      </Box>

      <Container
        sx={{
          backgroundColor: '#fff',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          borderRadius: '12px',
          p: 4,
          maxWidth: '800px',
          border: '2px solid #d4af37', 
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: '#000',
            fontWeight: 'bold',
            mb: 3,
            borderBottom: '2px solid #d4af37',
            pb: 1,
          }}
        >
          אודותינו
        </Typography>
        <Typography
          variant="body1"
          component="div"
          sx={{
            fontFamily: "'Varela Round', 'Rubik', 'Heebo', sans-serif",
            color: '#555',
            lineHeight: 1.8,
            fontSize: '18px',
            mb: 4,
            direction: 'rtl',
            textAlign: 'justify',
          }}
        >
            כולם יודעים כמה משאבים, זמן, כסף וכוח הארגונים לחתונה דורשים. לא פשוט היום בכלל לסגור בקלות עם ספקים ולצאת מרוצים מכל הבחינות.  🎉
  <br />
  🎯 **המטרה שלנו** בבניית אתר זה הייתה לנסות להפחית מעליכם כמה שיותר מכל הדברים הללו. האתר שלנו מציע במקום אחד מגוון של זמרים, אולמות, קייטרינג, צלמים, מפיקים וכל מה שבדרך כלל דורש לא מעט זמן כדי למצוא.  
  במקום אחד קיבצנו אליכם את הטובים ביותר, במחירים שפויים. כל שנותר לכם הוא לחייג למי שמוצא חן בעיניכם ולסגור.  
  <br />
  <div>
  <ul
    style={{
      textAlign: 'right', 
      direction: 'rtl', 
      paddingRight: '20px', 
    }}
  >
    <li>
       אם אתה ספק ואתה מעוניין לפרסם באתר שלנו, במידה שלא נרשמת כספק - עשה זאת עכשיו וכנס לדף פירסום באתר.  
      שלח אלינו בקשה ותענה בהקדם.📢
    </li>
    <li>
       אנו מאמינים בפידבקים! אם יצא לך לשכור שירות של ספק דרך האתר שלנו, נשמח שתדרגו אותו לטובת האחרים.📝
    </li>
    <li>
       באתר תמצאו טיפים ומאמרים מועילים שיעזרו לכם להתכונן לחתונה בצורה חלקה ומהנה.💡
    </li>
    <li>ועוד הרבה הפתעות שוות מחכות לכם באתר! 🎊</li>
    </ul>
    </div>
         
        </Typography>
      </Container>

      
      <Container
        id="contact-section"
        sx={{
          backgroundColor: '#fff',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          borderRadius: '12px',
          p: 3,
          mt: 5,
          maxWidth: '600px',
          border: '2px solid #000',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: '#000',
            fontWeight: 'bold',
            mb: 2,
            borderBottom: '2px solid #d4af37',
            pb: 1,
          }}
        >
          צור קשר
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontFamily: "'Varela Round', 'Rubik', 'Heebo', sans-serif",
            color: '#555',
            lineHeight: 1.8,
            fontSize: '18px',
            mb: 2,
            textAlign: 'center',
          }}
        >
      
     לשאלות, הערות, הארות, או סתם הצעות לייעול:
    

        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontFamily: "'Varela Round', 'Rubik', 'Heebo', sans-serif",
            color: '#555',
            lineHeight: 1.8,
            fontSize: '18px',
            textAlign: 'center',
          }}
        >
          <strong></strong> ruth052716@gmail.com<br />
          <strong></strong> 052-716-4146
        </Typography>
      </Container>
    </Box>
  );
}
