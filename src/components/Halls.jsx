

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Rating,
  TextField,

} from '@mui/material';

import { addHallWithImage, deleteHall, getHalls, setSelectedHallId, updateHall } from '../slices/hallSlice';
import { getRecommendHalls } from '../slices/recommendHallSlice';
export default function Halls() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { halls, loading, error } = useSelector((state) => state.halls);
  const { recommendations } = useSelector((state) => state.hallRecommendations);
  const user = useSelector((state) => state.user.currentUser);

  const [showForm, setShowForm] = useState(false);
  const [showForm2, setShowForm2] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [position, setPosition] = useState('');
  const [phone, setPhone] = useState('');
  const [imageFile, setImageFile] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  const [hallId, setHallId] = useState(null);
  const phoneRegex = /^(?:\+?\d{1,4}[-\s]?)?(\(?\d+\)?[-\s]?)?[\d\s\-]{9,10}$/;


  useEffect(() => {
    dispatch(getHalls());
  }, [dispatch]);

  useEffect(() => {
    halls.forEach((hall) => {
      dispatch(getRecommendHalls(hall.id));
    });
  }, [dispatch, halls]);

  const handleDeleteHalls = async (id) => {
    try {
      await dispatch(deleteHall(id));
      alert('אולם נמחק בהצלחה');
    } catch (error) {
      console.error('שגיאה במחיקת האולם', error);
      alert('אירעה שגיאה במחיקת האולם');
    }
  };

  const handleViewDetails = (id) => {
    dispatch(setSelectedHallId(id));
    navigate(`/halls/${id}/details`);
  };

  const handleAddHall = async () => {
    // רג'קס לבדיקת תקינות מספר טלפון ישראלי
  
    // בדיקה אם כל השדות מולאו
    if (!name || !description || !phone || !position) {
      alert('יש למלא את כל השדות');
      return; // עצירת הפונקציה
    }
  
    // בדיקת תקינות מספר הטלפון
    if (!phoneRegex.test(phone)) {
      alert('מספר טלפון לא תקין. יש להזין מספר תקין בפורמט ישראלי.');
      return; // עצירת הפונקציה
    }
  
    // הכנת המידע להוספה
    const formData = new FormData();
    formData.append('hall', JSON.stringify({ name, description, position, phone }));
    formData.append('image', imageFile);
  
    try {
      // קריאה לפעולת הוספת האולם
      await dispatch(addHallWithImage({ hallData: { name, description, position, phone }, imageFile }));
      // איפוס השדות בטופס
      setName('');
      setDescription('');
      setPosition('');
      setPhone('');
      setImageFile(null);
      setShowForm(false);
      alert('אולם נוסף בהצלחה!');
    } catch (error) {
      console.error('הוספת אולם נכשלה', error);
      alert('אירעה שגיאה בהוספת האולם');
    }
  };
  
  const handleUpdateHallForm = (hall) => {
    setName(hall.name || "");
    setDescription(hall.description || "");
    setPosition(hall.position || "");
    setPhone(hall.phone || "");
    setImageFile(null);
    setHallId(hall.id || null);
    setShowForm2(true);
  };


  const handleUpdateHall = async () => {
    if (!name || !description || !position || !phone) {
      alert('יש למלא את כל השדות');
      return;
    }
   // בדיקת תקינות מספר הטלפון
   if (!phoneRegex.test(phone)) {
    alert('מספר טלפון לא תקין. יש להזין מספר תקין בפורמט ישראלי.');
    return; // עצירת הפונקציה
  }
    const updatedHall = { name, description, position, phone };
    const formData = new FormData();
    formData.append('flower', JSON.stringify(updatedHall));
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      await dispatch(updateHall({ hallData: updatedHall, id: hallId, imageFile }));
      setName('');
      setDescription('');
      setPosition('');
      setPhone('');
      setImageFile(null);
      setShowForm2(false);
      alert('אולם עודכן בהצלחה');
    } catch (error) {
      console.error('אירעה שגיאה בעדכון האולם', error);
      alert('אירעה שגיאה בעדכון האולם');
    }
  };

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };





  const filteredHalls = halls.filter((hall) =>
    hall.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <Typography>טוען...</Typography>;
  if (error) return <Typography color="error">שגיאה: {error}</Typography>;
  if (!Array.isArray(halls) || halls.length === 0) {
    <Typography>אין אולמות להצגה</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        אולמות
      </Typography>

      <Box display="flex" justifyContent="center" marginBottom={3}>
        <TextField
          label="הקלד שם לחיפוש"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: '200px' }}
        />
      </Box>
      <Grid container spacing={4}>
        {filteredHalls.map((hall) => {
          const hallRecommend = recommendations?.[hall?.id] || [];
          const averageRating = hallRecommend.length > 0
            ? hallRecommend.reduce((sum, r) => sum + (r.rating || 0), 0) / hallRecommend.length
            : 0;

          return (
            <Grid item xs={12} sm={6} md={4} key={hall.id}>
              <Card
                sx={{
                  borderRadius: '16px',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                  '&:hover': { boxShadow: '0 12px 30px rgba(0,0,0,0.4)' },
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={hall.imageUrl || 'src/photo/קולולו (5).png'}
                  alt={hall.name}
                  sx={{ borderRadius: '16px 16px 0 0' }}
                />
                <CardContent>
                  <Typography variant="h6" align="center">
                    {hall.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" align="center">
                    {hall.description}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" align="center" mt={2}>
                    <Rating value={averageRating} readOnly precision={0.5} sx={{ fontSize: '2rem' }} />
                  </Typography>
                  <Box mt={2} display="flex" justifyContent="space-between">
                    {user?.username === 'מנהל' && user?.password === '12' && (
                      <>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => handleDeleteHalls(hall.id)}
                        >
                          מחק
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={() => handleUpdateHallForm(hall)}
                        >
                          עדכן
                        </Button>
                      </>
                    )}
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={() => handleViewDetails(hall.id)}
                      sx={{
                        backgroundColor: '#E3F2FD', // גוון תכלת עדין
                        borderColor: '#64B5F6', // גוון כחול כהה יותר
                        color: '#1976D2', // טקסט בגוון כחול
                        borderRadius: '8px', // פינות מעוגלות
                        transition: 'transform 0.2s ease, background-color 0.2s ease',
                        '&:hover': {
                          backgroundColor: '#BBDEFB', // גוון כחול בעת ריחוף
                          transform: 'scale(1.1)', // הגדלה בעת ריחוף
                          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', // צל בעת ריחוף
                        },
                      }}
                    >
                      פרטים נוספים
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {user?.username === 'מנהל' && user?.password === '12' && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '15vh', // גובה המסך המלא
          }}
        >
          <Button
            variant="contained"
            sx={{
              margin: '10px 0',
              backgroundColor: 'black',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#333',
              },
            }}
            onClick={handleToggleForm}
          >
            {showForm ? 'בטל הוספת אולם' : 'הוסף אולם'}
          </Button>
        </Box>
      )}


      {showForm && (
        <div>
          <Typography variant="h6" align="center" gutterBottom>
            הוסף אולם
          </Typography>
          <TextField
            label="שם אולם"
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ margin: '10px 0' }}
          />
          <TextField
            label="תיאור אולם"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ margin: '10px 0' }}
          />
          <TextField
            label="מיקום אולם"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ margin: '10px 0' }}
          />
          <TextField
            label="טלפון"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ margin: '10px 0' }}
          />
          <Button
            variant="contained"
            component="label"
            sx={{
              margin: '10px 0',
              backgroundColor: 'gray',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#333',
              },
            }}          >
            העלאת תמונה
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => setImageFile(e.target.files[0])}
            />
          </Button>
          <Button variant="contained"
            sx={{
              margin: ' 0 10px ',
              backgroundColor: 'black',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#333',
              },
            }}
            onClick={handleAddHall}
               >
            שמור אולם
          </Button>
        </div>
      )}

      {showForm2 && (
        <div>
          <Typography variant="h6" align="center" gutterBottom>
            עדכן אולם
          </Typography>
          <TextField
            label="שם אולם"
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ margin: '10px 0' }}
          />
          <TextField
            label="תיאור אולם"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ margin: '10px 0' }}
          />
          <TextField
            label="מיקום"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ margin: '10px 0' }}
          />
          <TextField
            label="טלפון"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ margin: '10px 0' }}
          />
          <Button
            variant="contained"
            component="label"
            sx={{
              margin: '10px 0',
              backgroundColor: 'gray',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#333',
              },
            }}
          >
            העלאת תמונה חדשה
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => setImageFile(e.target.files[0])}
            />
          </Button>
          <Button variant="contained"
            sx={{
              margin: ' 0 10px',
              backgroundColor: 'black',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#333',
              },
            }}
            onClick={handleUpdateHall}>
            עדכן אולם
          </Button>
        </div>
      )}
    </Container>
  );
}
