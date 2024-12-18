

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  CircularProgress,
  Typography,
  Box,
  Divider,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  DialogTitle,
  Avatar,
} from '@mui/material';
import Rating from '@mui/material/Rating';

import { getHalls } from '../slices/hallSlice';
import { addRecommendHall, deleteRecommendHall, getRecommendHalls } from '../slices/recommendHallSlice';
import { GetPotographer } from '../services/photographerService';
import { addRecommendPhotographer, deleteRecommendPhotographer, getRecommendPhotographer } from '../slices/recommendPhotographerSlice';
import { getPhotographers } from '../slices/photographerSlice';

export default function PhotographerDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [averageRating, setAverageRating] = useState(0);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const imageLinks = [
    '/src/photo/Leonardo_Phoenix_Capture_a_stunning_black_and_white_photograph_3.jpg',
    '/src/photo/camera-933148_640.jpg',
    '/src/photo/96.webp',
  ];

  useEffect(() => {
    dispatch(getPhotographers());
    dispatch(getRecommendPhotographer(id));
  }, [dispatch, id]);

  const { photographers, loading: photographersLoading, error: photographersError } = useSelector((state) => state.photographers);
  const { recommendations, loading: recLoading, error: recError } = useSelector((state) => state.photographerRecommendations);

  const selectedPhotographer = photographers.find((photographer) => photographer.id === parseInt(id));
  const photographerRecommend = recommendations?.[id] || [];
  const user = useSelector((state) => state.user.currentUser);
  
  useEffect(() => {
    if (photographerRecommend.length > 0) {
      const totalRating = photographerRecommend.reduce((sum, rec) => sum + rec.rating, 0);
      const avgRating = totalRating / photographerRecommend.length;
      setAverageRating(avgRating);
    }
  }, [photographerRecommend]);

  const handleDeleteRecommendPhotographer = async (recId) => {
    try {
      await dispatch(deleteRecommendPhotographer(recId));
      alert('התגובה נמחקה בהצלחה!');
    } catch (error) {
      console.error('שגיאה במחיקת התגובה:', error);
      alert('אירעה שגיאה במחיקת התגובה');
    }
  };

  const handleAddRecommendation = () => {
    if (reviewerName && reviewRating > 0 && reviewComment) {
      const recommendation = {
        reviewerName,
        rating: reviewRating,
        comment: reviewComment,
        date: new Date().toISOString(),
      };

      dispatch(addRecommendPhotographer({ photographerId: id, recommend: recommendation }));
      setReviewerName('');
      setReviewRating(0);
      setReviewComment('');
      setOpenReviewModal(false);
    } else {
      alert('נא למלא את כל השדות');
    }
  };

  if (photographersLoading || recLoading) return <CircularProgress />;
  if (photographersError || recError) return <Typography color="error">שגיאה: {photographersError || recError}</Typography>;
  if (!selectedPhotographer) return <Typography>לא נמצא זמר עם מזהה זה</Typography>;

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 4,
          backgroundColor: 'white',
          color: 'black',
          borderRadius: 2,
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
          animation: 'fade-in 1s ease-in-out',
          '@keyframes fade-in': {
            from: { opacity: 0 },
            to: { opacity: 1 },
          },
        }}
      >
        {/* פרטי הזמר עם תמונת סטטוס */}
        <Box
  sx={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    //background: 'linear-gradient(90deg, #ECE4F0, #D7CDE5)'
    background: 'linear-gradient(90deg, #E3F2FD, #BBDEFB, #90CAF9, #42A5F5)',



    borderRadius: 2,
    padding: 2,
    width: '90%',
    position: 'relative', // מאפשר למקם את התמונה בצורה מדויקת
  }}
  
>

  <Avatar
  
    src={selectedPhotographer?.imageUrl || '/src/photo/blog-8.jpg'} // נתיב לתמונת ברירת מחדל
    // alt={selectedHall?.name}
    sx={{
      width: 200, // גודל גדול יותר
      height: 200,
      position: 'absolute', // מאפשר להזיז את התמונה למיקום מותאם
      top: '20%', // מיקום ורטיקלי יחסי
      left: '10%', // מיקום אופקי יחסי
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
      border: '3px solid white', // תיחום לתמונה
    }}
  /> 




  <Box sx={{ marginLeft: '200px' }}> {/* הסטת התוכן מימין לתמונה */}
    <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#fff' }}>
      {selectedPhotographer.name}
    </Typography>
    <Typography variant="h5" sx={{ marginTop: 1, color: '#fff8e1' }}>
      {selectedPhotographer.description}
    </Typography>
    <Typography sx={{ marginTop: 1, color: '#fff8e1' }}>
     מיקום: {selectedPhotographer.position}
    </Typography>
    <Typography sx={{ marginTop: 1, color: '#fff8e1' }}>{selectedPhotographer.phone}</Typography>
  </Box>
</Box>


        {/* דירוג */}
        <Box display="flex" alignItems="center" mt={4}>
          <Rating value={averageRating} readOnly precision={0.5} sx={{ fontSize: '3rem' }} />
          <Typography
            sx={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: 'primary.main',
              ml: 2,
              transition: 'all 0.3s ease-in-out',
              '&:hover': { transform: 'scale(1.2)', color: '#000000' },
            }}
          >
            ({averageRating.toFixed(1)})
          </Typography>
        </Box>

        {/* תגובות */}
        <Typography variant="h5" sx={{ marginTop: 3, color: 'black' }}>
          תגובות:
        </Typography>
        {photographerRecommend.length > 0 ? (
          photographerRecommend.map((recommendation) => (
            <Box
              key={recommendation.id}
              sx={{
                width: '50%',
                backgroundColor: '#f9f9f9',
                borderRadius: 1,
                padding: 2,
                marginTop: 2,
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                '&:hover': { transform: 'scale(1.02)', transition: 'transform 0.3s' },
              }}
            >
              <Typography>
                <strong>שם הממליץ:</strong> {recommendation.reviewerName}
              </Typography>
              <Rating value={recommendation.rating} readOnly precision={0.2} />
              <Typography>
                <strong>תגובה:</strong> {recommendation.comment}
              </Typography>
              <Typography>
                <strong>תאריך:</strong> {recommendation.date}
              </Typography>
              <Divider sx={{ marginTop: 1 }} />
              {user?.username === 'מנהל' && user?.password === '12' && (
                <Button size="small" color="error" onClick={() => handleDeleteRecommendPhotographer(recommendation.id)}>
                  מחק
                </Button>
              )}
            </Box>
          ))
        ) : (
          <Typography>אין תגובות לאולם זה</Typography>
        )}
      </Box>

      <Box textAlign="center" mb={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            if (user) {
              setOpenReviewModal(true);
            } else {
              alert('עליך להתחבר כדי להוסיף תגובה');
            }
          }}
        >
          הוסף תגובה
        </Button>
      </Box>

      {/* דיאלוג הוספת תגובה */}
      <Dialog open={openReviewModal} onClose={() => setOpenReviewModal(false)} fullWidth maxWidth="sm">
        <DialogTitle>הוסף תגובה</DialogTitle>
        <DialogContent>
          <TextField
            label="שם הממליץ"
            value={reviewerName}
            onChange={(e) => setReviewerName(e.target.value)}
            margin="normal"
            fullWidth
          />
          <Rating
            value={reviewRating}
            onChange={(e, newValue) => setReviewRating(newValue)}
            precision={0.5}
            sx={{ mb: 2 }}
          />
          <TextField
            label="התגובה"
            value={reviewComment}
            onChange={(e) => setReviewComment(e.target.value)}
            multiline
            rows={4}
            margin="normal"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenReviewModal(false)} color="secondary">
            ביטול
          </Button>
          <Button onClick={handleAddRecommendation} color="primary">
            שלח
          </Button>
        </DialogActions>
      </Dialog>

      {/* גלריה */}
      <Typography variant="h5" sx={{ marginTop: 5, color: 'black' }}></Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 2,
          marginTop: 2,
          padding: 2,
        }}
      >
        {imageLinks.map((link, index) => (
          <Box
            key={index}
            sx={{
              width: 200,
              height: 200,
              backgroundColor: '#ccc',
              borderRadius: 2,
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              backgroundImage: `url(${link})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'scale(1.1)',
                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.4)',
              },
            }}
          />
        ))}
      </Box>
    </>
  );
}


