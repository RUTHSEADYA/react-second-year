

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
import { getSingers } from '../slices/singersSlice';
import { addRecommendSinger, deleteRecommendSinger, getRecommendSinger } from '../slices/recommendSingerSlice';

export default function SingerDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [averageRating, setAverageRating] = useState(0);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const imageLinks = [
    '/src/photo/israelnews-הופעות-של-זמרים-מחול-בישראל.jpg',
    '/src/photo/images.jpeg',
    '/src/photo/זמרים.jpg',
  ];

  useEffect(() => {
    dispatch(getSingers());
    dispatch(getRecommendSinger(id));
  }, [dispatch, id]);

  const { singers, loading: singersLoading, error: singersError } = useSelector((state) => state.singers);
  const { recommendations, loading: recLoading, error: recError } = useSelector((state) => state.singerRecommend);

  const selectedSinger = singers.find((singer) => singer.id === parseInt(id));
  const singerRecommend = recommendations?.[id] || [];
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    if (singerRecommend.length > 0) {
      const totalRating = singerRecommend.reduce((sum, rec) => sum + rec.rating, 0);
      const avgRating = totalRating / singerRecommend.length;
      setAverageRating(avgRating);
    }
  }, [singerRecommend]);

  const handleDeleteRecommendSinger = async (recId) => {
    try {
      await dispatch(deleteRecommendSinger(recId));
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

      dispatch(addRecommendSinger({ singerId: id, recommend: recommendation }));
      setReviewerName('');
      setReviewRating(0);
      setReviewComment('');
      setOpenReviewModal(false);
    } else {
      alert('נא למלא את כל השדות');
    }
  };

  if (singersLoading || recLoading) return <CircularProgress />;
  if (singersError || recError) return <Typography color="error">שגיאה: {singersError || recError}</Typography>;
  if (!selectedSinger) return <Typography>לא נמצא זמר עם מזהה זה</Typography>;

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
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            background: 'linear-gradient(90deg, #fbd7a2, #ff7f56)',
            borderRadius: 2,
            padding: 2,
            width: '90%',
            position: 'relative', 
          }}

        >

          <Avatar

            src={selectedSinger?.imageUrl || 'src/photo/קולולו (5).png'}
            alt={selectedSinger?.name}
            sx={{
              width: 200,
              height: 200,
              position: 'absolute',
              top: '20%',
              left: '10%',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
              border: '3px solid white',
            }}
          />




          <Box sx={{ marginLeft: '200px' }}> 
            <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#fff' }}>
              {selectedSinger.name}
            </Typography>
            <Typography variant="h5" sx={{ marginTop: 1, color: '#fff8e1' }}>
              {selectedSinger.description}
            </Typography>
            <Typography sx={{ marginTop: 1, color: '#fff8e1' }}>
              איזור פעילות: כל הארץ {selectedSinger.position}
            </Typography>
            <Typography sx={{ marginTop: 1, color: '#fff8e1' }}>{selectedSinger.phone}</Typography>
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
        {singerRecommend.length > 0 ? (
          singerRecommend.map((recommendation) => (
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
                <Button size="small" color="error" onClick={() => handleDeleteRecommendSinger(recommendation.id)}>
                  מחק
                </Button>
              )}
            </Box>
          ))
        ) : (
          <Typography>אין תגובות לזמר זה</Typography>
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
