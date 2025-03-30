


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
import { addFlowerWithImage, deleteFlower, getFlower, setSelectedFlowerId, updateFlower } from '../slices/flowersSlice';
import { getRecommendFlowers } from '../slices/recommandFlowerSlice';

export default function Flowers() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { flowers, loading, error } = useSelector((state) => state.flowers);
  const { recommendations } = useSelector((state) => state.flowerRecommendations);
  const user = useSelector((state) => state.user.currentUser);

  const [showForm, setShowForm] = useState(false);
  const [showForm2, setShowForm2] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [position, setPosition] = useState('');
  const [phone, setPhone] = useState('');
  const [imageFile, setImageFile] = useState('');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [flowerId, setFlowerId] = useState(null);
  const phoneRegex = /^(?:\+?\d{1,4}[-\s]?)?(\(?\d+\)?[-\s]?)?[\d\s\-]{9,10}$/;

  useEffect(() => {
    dispatch(getFlower());
  }, [dispatch]);

  useEffect(() => {
    flowers.forEach((flower) => {
      dispatch(getRecommendFlowers(flower.id));
    });
  }, [dispatch, flowers]);

  const handleDeleteFlower = async (id) => {
    try {
      await dispatch(deleteFlower(id));
      alert('המעצב נמחק בהצלחה');
    } catch (error) {
      console.error('שגיאה במחיקת המעצב', error);
      alert('אירעה שגיאה במחיקת המעצב');
    }
  };

  const handleViewDetails = (id) => {
    dispatch(setSelectedFlowerId(id));
    navigate(`/flowers/${id}/details`);
  };

  const handleAddFlower = async () => {
    if (!name || !description || !phone ||!position) {
      alert('יש למלא את כל השדות ');
      return;
    }
    
     if (!phoneRegex.test(phone)) {
      alert('מספר טלפון לא תקין. יש להזין מספר תקין בפורמט ישראלי.');
      return; 
    }

    const formData = new FormData();
    formData.append('flower', JSON.stringify({ name, description, position,phone }));
    formData.append('image', imageFile);

    try {
      await dispatch(addFlowerWithImage({ flowerData: { name, description, position,phone }, imageFile }));
      setName('');
      setDescription('');
      setPosition('');
      setPhone('');
      setImageFile(null);
      setShowForm(false);
      alert('מעצב נוסף בהצלחה!');
    } catch (error) {
      console.error('הוספת מעצב נכשלה', error);
      alert('אירעה שגיאה בהוספת המעצב');
    }
  };

  const handleUpdateFlowerForm = (flower) => {
    setName(flower.name || "");
    setDescription(flower.description || "");
    setPosition(flower.position || "");
    setPhone(flower.phone || "");
    setImageFile(null);
    setFlowerId(flower.id || null);
    setShowForm2(true);
  };
  

  const handleUpdateFlower= async () => {
    if (!name || !description ||!position|| !phone) {
      alert('יש למלא את כל השדות');
      return;
    }
     
       if (!phoneRegex.test(phone)) {
        alert('מספר טלפון לא תקין. יש להזין מספר תקין בפורמט ישראלי.');
        return; 
      }

    const updatedFlower= { name, description,position, phone };
    const formData = new FormData();
    formData.append('flower', JSON.stringify(updatedFlower));
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      await dispatch(updateFlower({ flowerData: updatedFlower, id: flowerId, imageFile }));
      setName('');
      setDescription('');
      setPosition('');
      setPhone('');
      setImageFile(null);
      setShowForm2(false);
      alert('המעצב עודכן בהצלחה');
    } catch (error) {
      console.error('אירעה שגיאה בעדכון המעצב', error);
      alert('אירעה שגיאה בעדכון המעצב');
    }
  };

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  const handleToggleForm2 = () => {
    setShowForm2(!showForm2);
  };

  const filteredFlowers = flowers.filter((flower) =>
    flower.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <Typography>טוען...</Typography>;
  if (error) return <Typography color="error">שגיאה: {error}</Typography>;
  if (!Array.isArray(flowers) || flowers.length === 0) {
     <Typography>אין מעצבים להצגה</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        מעצבים
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
        {filteredFlowers.map((flower) => {
          const flowerRecommend = recommendations[flower.id] || [];
          const averageRating = flowerRecommend.length > 0
            ? flowerRecommend.reduce((sum, r) => sum + (r.rating || 0), 0) / flowerRecommend.length
            : 0;

          return (
            <Grid item xs={12} sm={6} md={4} key={flower.id}>
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
                  image={flower.imageUrl || 'src/photo/קולולו (5).png'}
                  alt={flower.name}
                  sx={{ borderRadius: '16px 16px 0 0' }}
                />
                <CardContent>
                  <Typography variant="h6" align="center">
                    {flower.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" align="center">
                    {flower.description}
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
                          onClick={() => handleDeleteFlower(flower.id)}
                        >
                          מחק
                        </Button>
                        <Button
                          variant="contained"
                          
                          color="primary"
                          size="small"
                          onClick={() => handleUpdateFlowerForm(flower)}
                        >
                          עדכן
                        </Button>
                      </>
                    )}
                   <Button
  variant="outlined"
  color="primary"
  size="small"
  onClick={() => handleViewDetails(flower.id)}
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
      {user?.username === 'מנהל' && user?.password === '12' && (
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
      {showForm ? 'בטל הוספת מעצב' : 'הוסף מעצב'}
    </Button>
  </Box>
)}

      {showForm && (
        <div>
          <Typography variant="h6" align="center" gutterBottom>
            הוסף מעצב
          </Typography>
          <TextField
            label="שם מעצב"
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ margin: '10px 0' }}
          />
          <TextField
            label="תיאור מעצב"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ margin: '10px 0' }}
          />
       
       <TextField
            label="איזור פעילות"
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
          onClick={handleAddFlower}
>
            שמור מעצב
          </Button>
        </div>
      )}

      {showForm2 && (
        <div>
          <Typography variant="h6" align="center" gutterBottom>
            עדכן מעצב
          </Typography>
          <TextField
            label="שם מעצב"
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ margin: '10px 0' }}
          />
          <TextField
            label="תיאור מעצב"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ margin: '10px 0' }}
          />
           <TextField
            label="איזור פעילות"
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
          <Button
  variant="contained"
  onClick={handleUpdateFlower}
  sx={{
    margin: ' 0 10px', 

    backgroundColor: '#000',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#333',
    },
  }}
>
  עדכן מעצב
</Button>
        </div>
      )}
    </Container>
  );
}
