


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

import { addProducerWithImage, deleteProducer, getProducers, setSelectedProducerId, updateProducer } from '../slices/producerSlice';
import { getRecommendProducer } from '../slices/recommendProducerSlice';
export default function Producer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { producers, loading, error } = useSelector((state) => state.producers);
  const { recommendations } = useSelector((state) => state.producerRecommend);
  const user = useSelector((state) => state.user.currentUser);
  const [showForm, setShowForm] = useState(false);
  const [showForm2, setShowForm2] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [producerId, setProducerId] = useState(null);
  const phoneRegex = /^(?:\+?\d{1,4}[-\s]?)?(\(?\d+\)?[-\s]?)?[\d\s\-]{9,10}$/;


  useEffect(() => {
    dispatch(getProducers());
  }, [dispatch]);

  useEffect(() => {
    producers.forEach((producer) => {
      dispatch(getRecommendProducer(producer.id));
    });
  }, [dispatch, producers]);

  const handleDeleteProducer = async (id) => {
    try {
      await dispatch(deleteProducer(id));
      alert('המפיק נמחק בהצלחה');
    } catch (error) {
      console.error('שגיאה במחיקת המפיק', error);
      alert('אירעה שגיאה במחיקת המפיק');
    }
  };

  const handleViewDetails = (id) => {
    dispatch(setSelectedProducerId(id));
    navigate(`/producer/${id}/details`);
  };

  const handleAddProducer = async () => {
    if (!name || !description || !phone) {
      alert('יש למלא את כל השדות ');
      return;
    }


    if (!phoneRegex.test(phone)) {
      alert('מספר טלפון לא תקין. יש להזין מספר תקין בפורמט ישראלי.');
      return; 
    }

    const formData = new FormData();
    formData.append('producer', JSON.stringify({ name, description, phone }));
    formData.append('image', imageFile);

    try {
      await dispatch(addProducerWithImage({ producerData: { name, description, phone }, imageFile }));
      setName('');
      setDescription('');
      setPhone('');
      setImageFile(null);
      setShowForm(false);
      alert('מפיק נוסף בהצלחה!');
    } catch (error) {
      console.error('הוספת מפיק נכשלה', error);
      alert('אירעה שגיאה בהוספת המפיק');
    }
  };

  const handleUpdateProducerForm = (producer) => {
    setName(producer.name);
    setDescription(producer.description);
    setPhone(producer.phone);
    setImageFile(null);
    setProducerId(producer.id);
    setShowForm2(true);
  };

  const handleUpdateProduc = async () => {
    if (!name || !description || !phone) {
      alert('יש למלא את כל השדות');
      return;
    }
    if (!phoneRegex.test(phone)) {
      alert('מספר טלפון לא תקין. יש להזין מספר תקין בפורמט ישראלי.');
      return; 
    }

    const updatedProducer = { name, description, phone };
    const formData = new FormData();
    formData.append('producer', JSON.stringify(updatedProducer));
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      await dispatch(updateProducer({ producerData: updatedProducer, id: producerId, imageFile }));
      setName('');
      setDescription('');
      setPhone('');
      setImageFile(null);
      setShowForm2(false);
      alert('המפיק עודכן בהצלחה');
    } catch (error) {
      console.error('אירעה שגיאה בעדכון המפיק', error);
      alert('אירעה שגיאה בעדכון הזמר');
    }
  };

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };



  const filteredProducers = producers.filter((producer) =>
    producer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <Typography>טוען...</Typography>;
  if (error) return <Typography color="error">שגיאה: {error}</Typography>;
  if (!Array.isArray(producers) || producers.length === 0) {
    <Typography>אין מפיקים להצגה</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        מפיקים
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
        {filteredProducers.map((producer) => {
          const producerRecommendations = recommendations[producer.id] || [];
          const averageRating = producerRecommendations.length > 0
            ? producerRecommendations.reduce((sum, r) => sum + (r.rating || 0), 0) / producerRecommendations.length
            : 0;

          return (
            <Grid item xs={12} sm={6} md={4} key={producer.id}>
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
                  image={producer.imageUrl || 'src/photo/קולולו (5).png'}
                  alt={producer.name}
                  sx={{ borderRadius: '16px 16px 0 0' }}
                />
                <CardContent>
                  <Typography variant="h6" align="center">
                    {producer.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" align="center">
                    {producer.description}
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
                          onClick={() => handleDeleteProducer(producer.id)}
                        >
                          מחק
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={() => handleUpdateProducerForm(producer)}
                        >
                          עדכן
                        </Button>
                      </>
                    )}
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={() => handleViewDetails(producer.id)}
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
            {showForm ? 'בטל הוספת מפיק' : 'הוסף מפיק'}
          </Button>
        </Box>
      )}


      {showForm && (
        <div>
          <Typography variant="h6" align="center" gutterBottom>
            הוסף מפיק
          </Typography>
          <TextField
            label="שם מפיק"
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ margin: '10px 0' }}
          />
          <TextField
            label="תיאור מפיק"
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
              margin: '0 10px',
              backgroundColor: 'black',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#333',
              },
            }}
            onClick={handleAddProducer}

          >
            שמור מפיק
          </Button>
        </div>
      )}

      {showForm2 && (
        <div>
          <Typography variant="h6" align="center" gutterBottom>
            עדכן מפיק
          </Typography>
          <TextField
            label="שם מפיק"
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ margin: '10px 0' }}
          />
          <TextField
            label="תיאור מפיק"
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
            onClick={handleUpdateProduc}>
            עדכן מפיק
          </Button>
        </div>
      )}
    </Container>
  );
}

