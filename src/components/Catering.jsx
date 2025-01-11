


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

import { addCateringWithImage, deleteCatering, getCatering, setSelectedCateringId, updateCatering } from '../slices/cateringSlice';
import { getRecommendCatring } from '../slices/recommendCateringSlice';
export default function Catering() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { catering, loading, error } = useSelector((state) => state.catering);
  const { recommendations } = useSelector((state) => state.cateringRecommendations);
  const user = useSelector((state) => state.user.currentUser);

  const [showForm, setShowForm] = useState(false);
  const [showForm2, setShowForm2] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [area, setArea] = useState('');
  const [phone, setPhone] = useState('');
  const [type, setType] = useState('');
  const [imageFile, setImageFile] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [cateringId, setCatringId] = useState(null);
  const phoneRegex = /^(?:\+?\d{1,4}[-\s]?)?(\(?\d+\)?[-\s]?)?[\d\s\-]{9,10}$/;


  useEffect(() => {
    dispatch(getCatering());
  }, [dispatch]);

  useEffect(() => {
    catering.forEach((c) => {
      dispatch(getRecommendCatring(c?.id));
    });
  }, [dispatch, catering]);

  const handleDeleteCatering = async (id) => {
    try {
      await dispatch(deleteCatering(id));
      alert('קייטרינג נמחק בהצלחה');
    } catch (error) {
      console.error('שגיאה במחיקת קייטרינג', error);
      alert('אירעה שגיאה במחיקת קייטרינג');
    }
  };

  const handleViewDetails = (id) => {
    dispatch(setSelectedCateringId(id));
    navigate(`/catering/${id}/details`);
  };

  const handleAddCatering = async () => {
    if (!name || !description || !area || !phone || !type) {
      alert('יש למלא את כל השדות ');
      return;
    }

    if (!phoneRegex.test(phone)) {
      alert('מספר טלפון לא תקין. יש להזין מספר תקין בפורמט ישראלי.');
      return;
    }

    const formData = new FormData();
    formData.append('catering', JSON.stringify({ name, description, area, type, phone }));
    formData.append('image', imageFile);

    try {
      await dispatch(addCateringWithImage({ cateringData: { name, description, area, type, phone }, imageFile }));
      setName('');
      setDescription('');
      setArea('');
      setType('');
      setPhone('');
      setImageFile(null);
      setShowForm(false);
      alert('קייטרינג נוסף בהצלחה!');
    } catch (error) {
      console.error('הוספת קייטרינג נכשלה', error);
      alert('אירעה שגיאה בהוספת קייטרינג');
    }
  };

  const handleUpdateCateringForm = (c) => {
    setName(c.name || "");
    setDescription(c.description || "");
    setArea(c.area || "");
    setType(c.type || "")
    setPhone(c.phone || "");
    setImageFile(null);
    setCatringId(c.id || null);
    setShowForm2(true);
  };


  const handleUpdateCatering = async () => {
    if (!name || !description || !area || !type || !phone) {
      alert('יש למלא את כל השדות');
      return;
    }
    
    if (!phoneRegex.test(phone)) {
      alert('מספר טלפון לא תקין. יש להזין מספר תקין בפורמט ישראלי.');
      return;
    }

    const updatedCatering = { name, description, area, type, phone };
    const formData = new FormData();
    formData.append('catering', JSON.stringify(updatedCatering));
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      await dispatch(updateCatering({ cateringData: updatedCatering, id: cateringId, imageFile }));
      setName('');
      setDescription('');
      setArea('');
      setType('');
      setPhone('');
      setImageFile(null);
      setShowForm2(false);
      alert('קייטרינג עודכן בהצלחה');
    } catch (error) {
      console.error('אירעה שגיאה בעדכון קייטרינג', error);
      alert('אירעה שגיאה בעדכון קייטרינג');
    }
  };

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };



  const filteredCatering = catering?.filter((c) =>
    c?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );




  if (loading) return <Typography>טוען...</Typography>;
  if (error) return <Typography color="error">שגיאה: {error}</Typography>;

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        קייטרינג
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
        {filteredCatering.map((c) => {
          const cateringRecommend = recommendations[c.id] || [];
          const averageRating = cateringRecommend.length > 0
            ? cateringRecommend.reduce((sum, r) => sum + (r.rating || 0), 0) / cateringRecommend.length
            : 0;

          return (
            <Grid item xs={12} sm={6} md={4} key={c.id}>
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
                  image={c.imageUrl || 'src/photo/קולולו (5).png'}
                  alt={c.name}
                  sx={{ borderRadius: '16px 16px 0 0' }}
                />
                <CardContent>
                  <Typography variant="h6" align="center">
                    {c.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" align="center">
                    {c.description}
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
                          onClick={() => handleDeleteCatering(c.id)}
                        >
                          מחק
                        </Button>
                        <Button
                          variant="contained"

                          color="primary"
                          size="small"
                          onClick={() => handleUpdateCateringForm(c)}
                        >
                          עדכן
                        </Button>
                      </>
                    )}
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={() => handleViewDetails(c.id)}
                      sx={{
                        backgroundColor: ' #A8D5BA', 
                        borderColor: 'black', 
                        color: 'black',
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
            {showForm ? 'בטל הוספת קייטרינג' : 'הוסף קייטרינג'}
          </Button>
        </Box>
      )}

      {showForm && (
        <div>
          <Typography variant="h6" align="center" gutterBottom>
            הוסף קייטרינג
          </Typography>
          <TextField
            label="שם קייטרינג"
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ margin: '10px 0' }}
          />
          <TextField
            label="תיאור קייטרינג"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ margin: '10px 0' }}
          />

          <TextField
            label="איזור פעילות"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ margin: '10px 0' }}
          />
          <TextField
            label="סוג"
            type='text'
            value={type}
            onChange={(e) => setType(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ margin: '10px 0' }}
          />


          <TextField
            label="טלפון"
            type='number'
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
              margin: ' 0 10px ',
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
              margin: '10px 0',
              backgroundColor: 'black',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#333',
              },
            }}
            onClick={handleAddCatering}>
            שמור קייטרינג
          </Button>
        </div>
      )}

      {showForm2 && (
        <div>
          <Typography variant="h6" align="center" gutterBottom>
            עדכן קייטרינג
          </Typography>
          <TextField
            label="שם קייטרינג"
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ margin: '10px 0' }}
          />
          <TextField
            label="תיאור קייטרינג"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ margin: '10px 0' }}
          />
          <TextField
            label="איזור פעילות"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ margin: '10px 0' }}
          />
          <TextField
            label="סוג "
            type='text'
            value={type}
            onChange={(e) => setType(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ margin: '10px 0' }}
          />

          <TextField
            label="טלפון"
            type='number'
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
          <Button
            variant="contained"
            onClick={handleUpdateCatering}
            sx={{
              margin: ' 0 10px',

              backgroundColor: '#000',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#333',
              },
            }}
          >
            עדכן קייטרינג
          </Button>
        </div>
      )}
    </Container>
  );
}
