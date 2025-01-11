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
import { addSingerWithImage, deleteSinger, getSingers, setSelectedSingerId } from '../slices/singersSlice';
import { getRecommendSinger } from '../slices/recommendSingerSlice';
import { updateSinger } from '../slices/singersSlice';
export default function Singers() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { singers, loading, error } = useSelector((state) => state.singers);
  const { recommendations } = useSelector((state) => state.singerRecommend);
  const user = useSelector((state) => state.user.currentUser);

  const [showForm, setShowForm] = useState(false);
  const [showForm2, setShowForm2] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [singerId, setSingerId] = useState(null);
  const phoneRegex = /^(?:\+?\d{1,4}[-\s]?)?(\(?\d+\)?[-\s]?)?[\d\s\-]{9,10}$/;


  useEffect(() => {
    dispatch(getSingers());
  }, [dispatch]);

  useEffect(() => {
    singers.forEach((singer) => {
      dispatch(getRecommendSinger(singer.id));
    });
  }, [dispatch, singers]);

  const handleDeleteSinger = async (id) => {
    try {
      await dispatch(deleteSinger(id));
      alert('הזמר נמחק בהצלחה');
    } catch (error) {
      console.error('שגיאה במחיקת הזמר', error);
      alert('אירעה שגיאה במחיקת הזמר');
    }
  };

  const handleViewDetails = (id) => {
    dispatch(setSelectedSingerId(id));
    navigate(`/singer/${id}/details`);
  };

  const handleAddSinger = async () => {
    if (!name || !description || !phone) {
      alert('יש למלא את כל השדות ולהעלות תמונה');
      return;
    }

    
    if (!phoneRegex.test(phone)) {
      alert('מספר טלפון לא תקין. יש להזין מספר תקין בפורמט ישראלי.');
      return; 
    }

    const formData = new FormData();
    formData.append('singer', JSON.stringify({ name, description, phone }));
    formData.append('image', imageFile);

    try {
      await dispatch(addSingerWithImage({ singerData: { name, description, phone }, imageFile }));
      setName('');
      setDescription('');
      setPhone('');
      setImageFile(null);
      setShowForm(false);
      alert('זמר נוסף בהצלחה!');
    } catch (error) {
      console.error('הוספת זמר נכשלה', error);
      alert('אירעה שגיאה בהוספת הזמר');
    }
  };

  const handleUpdateSingerForm = (singer) => {
    setName(singer.name);
    setDescription(singer.description);
    setPhone(singer.phone);
    setImageFile(null);
    setSingerId(singer.id);
    setShowForm2(true);
  };

  const handleUpdateSinger = async () => {
    if (!name || !description || !phone) {
      alert('יש למלא את כל השדות');
      return;
    }
    
    if (!phoneRegex.test(phone)) {
      alert('מספר טלפון לא תקין. יש להזין מספר תקין בפורמט ישראלי.');
      return; 
    }

    const updatedSinger = { name, description, phone };
    const formData = new FormData();
    formData.append('singer', JSON.stringify(updatedSinger));
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      await dispatch(updateSinger({ singerData: updatedSinger, id: singerId, imageFile }));
      setName('');
      setDescription('');
      setPhone('');
      setImageFile(null);
      setShowForm2(false);
      alert('הזמר עודכן בהצלחה');
    } catch (error) {
      console.error('אירעה שגיאה בעדכון הזמר', error);
      alert('אירעה שגיאה בעדכון הזמר');
    }
  };

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };



  const filteredSingers = singers.filter((singer) =>
    singer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <Typography>טוען...</Typography>;
  if (error) return <Typography color="error">שגיאה: {error}</Typography>;
  if (!Array.isArray(singers) || singers.length === 0) {
    <Typography>אין זמרים להצגה</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        זמרים
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
        {filteredSingers.map((singer) => {
          const singerRecommendations = recommendations[singer.id] || [];
          const averageRating = singerRecommendations.length > 0
            ? singerRecommendations.reduce((sum, r) => sum + (r.rating || 0), 0) / singerRecommendations.length
            : 0;

          return (
            <Grid item xs={12} sm={6} md={4} key={singer.id}>
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
                  image={singer.imageUrl || 'src/photo/קולולו (5).png'}
                  alt={singer.name}
                  sx={{ borderRadius: '16px 16px 0 0' }}
                />
                <CardContent>
                  <Typography variant="h6" align="center">
                    {singer.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" align="center">
                    {singer.description}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" align="center" mt={2}>
                    <Rating value={averageRating} readOnly precision={0.5} sx={{ fontSize: '2rem' }} />
                  </Typography>
                  <Box mt={2} display="flex" justifyContent="space-between">
                    {user?.username === 'מנהל' && user?.password === '$2a$08$KGp/4eTLFE9fv/8g37OZ4e2UNSffuSX0y/KgG64B8RFZcWu5NMcfS' && (
                      <>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => handleDeleteSinger(singer.id)}
                        >
                          מחק
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={() => handleUpdateSingerForm(singer)}
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
                        backgroundColor: '#E3F2FD',
                        borderColor: '#64B5F6',
                        color: '#1976D2',
                        borderRadius: '8px',
                        transition: 'transform 0.2s ease, background-color 0.2s ease',
                        '&:hover': {
                          backgroundColor: '#BBDEFB',
                          transform: 'scale(1.1)',
                          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
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

      {user?.username === 'מנהל' && user?.password === '$2a$08$KGp/4eTLFE9fv/8g37OZ4e2UNSffuSX0y/KgG64B8RFZcWu5NMcfS' && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '15vh', 
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
            {showForm ? 'בטל הוספת זמר' : 'הוסף זמר'}
          </Button>
        </Box>
      )}


      {showForm && (
        <div>
          <Typography variant="h6" align="center" gutterBottom>
            הוסף זמר
          </Typography>
          <TextField
            label="שם זמר"
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ margin: '10px 0' }}
          />
          <TextField
            label="תיאור זמר"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
              margin: ' 0 10px',
              backgroundColor: 'black',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#333',
              },
            }}
            onClick={handleAddSinger}
          >
            שמור זמר
          </Button>
        </div>
      )}

      {showForm2 && (
        <div>
          <Typography variant="h6" align="center" gutterBottom>
            עדכן זמר
          </Typography>
          <TextField
            label="שם זמר"
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ margin: '10px 0' }}
          />
          <TextField
            label="תיאור זמר"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
              margin: '0 10px ',
              backgroundColor: 'black',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#333',
              },
            }}
            onClick={handleUpdateSinger}>
            עדכן זמר
          </Button>
        </div>
      )}
    </Container>
  );
}
