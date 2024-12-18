


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


import { addPhotographerWithImage, deletePhotographer, getPhotographers, setSelectedPhotographerId, updatePhotographers } from '../slices/photographerSlice';
import { getRecommendPhotographer } from '../slices/recommendPhotographerSlice';
import { area } from 'framer-motion/client';
export default function Photographer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { photographers, loading, error } = useSelector((state) => state.photographers);
  const { recommendations } = useSelector((state) => state.photographerRecommendations);
  const user = useSelector((state) => state.user.currentUser);

  const [showForm, setShowForm] = useState(false);
  const [showForm2, setShowForm2] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [position, setPosition] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [phone, setPhone] = useState('');
  const [imageFile, setImageFile] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  const [photographerId, setPhotographerId] = useState(null);
  const phoneRegex = /^(?:\+?\d{1,4}[-\s]?)?(\(?\d+\)?[-\s]?)?[\d\s\-]{9,10}$/;


  useEffect(() => {
    dispatch(getPhotographers());
  }, [dispatch]);

  useEffect(() => {
    photographers.forEach((photographer) => {
      dispatch(getRecommendPhotographer(photographer.id));
    });
  }, [dispatch, photographers]);

  const handleDeletePhotographer = async (id) => {
    try {
      await dispatch(deletePhotographer(id));
      alert('צלם נמחק בהצלחה');
    } catch (error) {
      console.error('שגיאה במחיקת צלם', error);
      alert('אירעה שגיאה במחיקת צלם');
    }
  };

  const handleViewDetails = (id) => {
    dispatch(setSelectedPhotographerId(id));
    navigate(`/photographers/${id}/details`);
  };

  const handleAddPhotographer = async () => {
    if (!name || !description || !phone || !yearsOfExperience || !position) {
      alert('יש למלא את כל השדות ');
      return;
    }
    // בדיקת תקינות מספר הטלפון
    if (!phoneRegex.test(phone)) {
      alert('מספר טלפון לא תקין. יש להזין מספר תקין בפורמט ישראלי.');
      return; // עצירת הפונקציה
    }
    const formData = new FormData();
    formData.append('photographer', JSON.stringify({ name, description, position, yearsOfExperience, phone }));
    formData.append('image', imageFile);

    try {
      await dispatch(addPhotographerWithImage({ photographerData: { name, description, position, yearsOfExperience, phone }, imageFile }));
      setName('');
      setDescription('');
      setPosition('');
      setYearsOfExperience('');
      setPhone('');
      setImageFile(null);
      setShowForm(false);
      alert('צלם נוסף בהצלחה!');
    } catch (error) {
      console.error('הוספת צלם נכשלה', error);
      alert('אירעה שגיאה בהוספת צלם');
    }
  };

  const handleUpdatePhotographerForm = (photographer) => {
    setName(photographer.name || "");
    setDescription(photographer.description || "");
    setPosition(photographer.position || "");
    setYearsOfExperience(photographer.yearsOfExperience || "")
    setPhone(photographer.phone || "");
    setImageFile(null);
    setPhotographerId(photographer.id || null);
    setShowForm2(true);
  };


  const handleUpdatePhotographer = async () => {
    if (!name || !description || !position || !yearsOfExperience || !phone) {
      alert('יש למלא את כל השדות');
      return;
    }

    const updatedPhotographer = { name, description, position, yearsOfExperience, phone };
    const formData = new FormData();
    formData.append('photographer', JSON.stringify(updatedPhotographer));
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      await dispatch(updatePhotographers({ photographerData: updatedPhotographer, id: photographerId, imageFile }));
      setName('');
      setDescription('');
      setPosition('');
      setYearsOfExperience('');
      setPhone('');
      setImageFile(null);
      setShowForm2(false);
      alert('צלם עודכן בהצלחה');
    } catch (error) {
      console.error('אירעה שגיאה בעדכון צלם', error);
      alert('אירעה שגיאה בעדכון צלם');
    }
  };

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  const handleToggleForm2 = () => {
    setShowForm2(!showForm2);
  };





  const filteredPhotographers = photographers.filter((photographer) =>
    photographer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <Typography>טוען...</Typography>;
  if (error) return <Typography color="error">שגיאה: {error}</Typography>;
  if (!Array.isArray(photographers) || photographers.length === 0) {
    <Typography>אין צלמים להצגה</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        צלמים
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
        {filteredPhotographers.map((photographer) => {
          const photographerRecommend = recommendations?.[photographer?.id] || [];
          const averageRating = photographerRecommend.length > 0
            ? photographerRecommend.reduce((sum, r) => sum + (r.rating || 0), 0) / photographerRecommend.length
            : 0;

          return (
            <Grid item xs={12} sm={6} md={4} key={photographer.id}>
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
                  image={photographer.imageUrl || 'src/photo/קולולו (5).png'}
                  alt={photographer.name}
                  sx={{ borderRadius: '16px 16px 0 0' }}
                />
                <CardContent>
                  <Typography variant="h6" align="center">
                    {photographer.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" align="center">
                    {photographer.description}
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
                          onClick={() => handleDeletePhotographer(photographer.id)}
                        >
                          מחק
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={() => handleUpdatePhotographerForm(photographer)}
                        >
                          עדכן
                        </Button>
                      </>
                    )}
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={() => handleViewDetails(photographer.id)}
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
            {showForm ? 'בטל הוספת צלם' : 'הוסף צלם'}
          </Button>
        </Box>
      )}


      {showForm && (
        <div>
          <Typography variant="h6" align="center" gutterBottom>
            הוסף צלם
          </Typography>
          <TextField
            label="שם צלם"
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ margin: '10px 0' }}
          />
          <TextField
            label="תיאור צלם"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ margin: '10px 0' }}
          />
          <TextField
            label="איזור"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ margin: '10px 0' }}
          />
          <TextField
            label="שנות נסיון"
            type='number'
            value={yearsOfExperience}

            onChange={(e) => setYearsOfExperience(e.target.value)}

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
            onClick={handleAddPhotographer}
          >
            שמור צלם
          </Button>
        </div>
      )}

      {showForm2 && (
        <div>
          <Typography variant="h6" align="center" gutterBottom>
            עדכן צלם
          </Typography>
          <TextField
            label="שם צלם"
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ margin: '10px 0' }}
          />
          <TextField
            label="תיאור צלם"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ margin: '10px 0' }}
          />
          <TextField
            label="איזור"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ margin: '10px 0' }}
          />
          <TextField
            label="שנות נסיון"
            type='number'
            value={yearsOfExperience}
            onChange={(e) => setYearsOfExperience(e.target.value)}
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
            onClick={handleUpdatePhotographer}>
            עדכן צלם
          </Button>
        </div>
      )}
    </Container>
  );
}
