

import React, { Fragment, useEffect, useState } from 'react';
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

export default function HallDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [averageRating, setAverageRating] = useState(0);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const imageLinks = [
    '/src/photo/אולמות-בקרית-עקרון.jpg',
    '/src/photo/Leonardo_Phoenix_Create_an_opulent_and_lavish_picture_featurin_2.jpg',
    '/src/photo/business682_pic2.jpg',
  ];

  useEffect(() => {
    dispatch(getHalls());
    dispatch(getRecommendHalls(id));
  }, [dispatch, id]);

  const { halls, loading: hallsLoading, error: hallsError } = useSelector((state) => state.halls);
  const { recommendations, loading: recLoading, error: recError } = useSelector((state) => state.hallRecommendations);

  const selectedHall = halls.find((hall) => hall.id === parseInt(id));
  const hallRecommend = recommendations?.[id] || [];
  const user = useSelector((state) => state.user.currentUser);
  
  useEffect(() => {
    if (hallRecommend.length > 0) {
      const totalRating = hallRecommend.reduce((sum, rec) => sum + rec.rating, 0);
      const avgRating = totalRating / hallRecommend.length;
      setAverageRating(avgRating);
    }
  }, [hallRecommend]);

  const handleDeleteRecommendHall = async (recId) => {
    try {
      await dispatch(deleteRecommendHall(recId));
      alert('התגובה נמחקה בהצלחה!');
    } catch (error) {
      console.error('שגיאה במחיקת התגובה:', error);
      alert('אירעה שגיאה במחיקת התגובה');
    }
  };

  const handleAddRecommendation = () => {
    if (reviewerName && reviewRating  && reviewComment) {
      const recommendation = {
        reviewerName,
        rating: reviewRating,
        comment: reviewComment,
        date: new Date().toISOString(),
      };

      dispatch(addRecommendHall({ hallId: id, recommend: recommendation }));
      setReviewerName('');
      setReviewRating(0);
      setReviewComment('');
      setOpenReviewModal(false);
    } else {
      alert('נא למלא את כל השדות');
    }
  };

  if (hallsLoading || recLoading) return <CircularProgress />;
  if (hallsError || recError) return <Typography color="error">שגיאה: {hallsError || recError}</Typography>;
  if (!selectedHall) return <Typography>לא נמצא זמר עם מזהה זה</Typography>;

  return (
    <Fragment>
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
        <Box
  sx={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    background: 'linear-gradient(90deg, #ECE4F0, #D7CDE5, #C3A3CC, #9B77AE)',




    borderRadius: 2,
    padding: 2,
    width: '90%',
    position: 'relative', 
  }}
  
>

  <Avatar
  
    src={selectedHall?.imageUrl || '/src/photo/blog-8.jpg'} 
    sx={{
      width: 200, 
      height: 200,
      position: 'absolute', 
      left: '10%', 
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
      border: '3px solid white', 
    }}
  /> 




  <Box sx={{ marginLeft: '200px' }}> 
    <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#fff' }}>
      {selectedHall.name}
    </Typography>
    <Typography variant="h5" sx={{ marginTop: 1, color: '#fff8e1' }}>
      {selectedHall.description}
    </Typography>
    <Typography sx={{ marginTop: 1, color: '#fff8e1' }}>
     מיקום: {selectedHall.position}
    </Typography>
    <Typography sx={{ marginTop: 1, color: '#fff8e1' }}>{selectedHall.phone}</Typography>
  </Box>
</Box>


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

        
        <Typography variant="h5" sx={{ marginTop: 3, color: 'black' }}>
          תגובות:
        </Typography>
        {hallRecommend.length > 0 ? (
          hallRecommend.map((recommendation) => (
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
                <Button size="small" color="error" onClick={() => handleDeleteRecommendHall(recommendation.id)}>
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
    </Fragment>
  );
}


