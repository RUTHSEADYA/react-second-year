

import { configureStore } from '@reduxjs/toolkit';//הפונקציה הזו היא חלק מהרידקס טולקיטס ומגדירה את 
//Middleware הסטור בצורה נוחה ופשוטה במקום להגדיר אותו עם באופן ידני ולהוסיף כלים כמו 
import userReducer from '../slices/userSlice';
import flowerReducer from '../slices/flowersSlice'; // ייבוא נכון של ה-reducer
//import flowerRecommendationsReducer from '../slices/recommandFlowerSlice'
import recommandFlowerReducer from '../slices/recommandFlowerSlice';
import requestToManagerReducer from '../slices/requestToManagerSlice';
import producersReducer from '../slices/producerSlice'
import producerRecommendReducer from '../slices/recommendProducerSlice'
import singersReducer from '../slices/singersSlice'
import singerRecommendReducer from '../slices/recommendSingerSlice'
import supplierRequestReducer from '../slices/supplierRequestSlice'
import hallsReducer from '../slices/hallSlice'
import hallRecommendationsReducer from '../slices/recommendHallSlice'
import photographersReducer from '../slices/photographerSlice'
import photographerRecommendationsReducer from '../slices/recommendPhotographerSlice'
import cateringReducer from '../slices/cateringSlice';
import cateringRecommendationsReducer from '../slices/recommendCateringSlice'

const store = configureStore({
  reducer: {
    //user-שם הסלייס
    //userReducer- השם שהגדרנו שיטפל במצבי המשתמש בסלייס
    user: userReducer,
    flowers: flowerReducer,
    flowerRecommendations: recommandFlowerReducer,
    requestToManager:requestToManagerReducer,
    producers:producersReducer,
    producerRecommend:producerRecommendReducer,
    singers:singersReducer,
    singerRecommend:singerRecommendReducer,
    supplierRequest: supplierRequestReducer,
    halls:hallsReducer,
    hallRecommendations:hallRecommendationsReducer,
    photographers:photographersReducer,
    photographerRecommendations:photographerRecommendationsReducer,
    catering:cateringReducer,
    cateringRecommendations:cateringRecommendationsReducer,

  },
});

export  default store; // ייצוא של store
