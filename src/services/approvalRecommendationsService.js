

import axios from "axios";


export async function AddRecommendFlowers(flowerId, recommend) {
    const response = await axios.post(
      `http://localhost:8080/api/flowers/recommendations/addRecommendation/${flowerId}`,
      recommend
    );
    console.log("Recommendations from server:", response.data);
    return response.data;
  }

  export async function AddRecommendHall(hallId, recommend) {
    const response = await axios.post(
      `http://localhost:8080/api/hall/recommendations/addRecommendation/${hallId}`,
      recommend
    );
    console.log("Recommendations from server:", response.data);
    return response.data;
  }
  
  export async function AddRecommendProducer(producerId, recommend) {
    const response = await axios.post(
      `http://localhost:8080/api/producerRecommend/addRecommendadion/${producerId}`,
      recommend
    );
    console.log("Recommendations from server:", response.data);
    return response.data;
  }

  export async function AddRecommendSinger(singerId, recommend) {
    const response = await axios.post(
      `http://localhost:8080/api/singersRecommendController/addSingerRecommend/${singerId}`,
      recommend
    );
    console.log("Recommendations from server:", response.data);
    return response.data;
  }
  
  export async function DeleteRecommendSinger(id) {
    const response=await axios.delete(`http://localhost:8080/api/singersRecommendController/deleteRecommend/${id}`)
    console.log("Recommendations from server:", response.data);
    return id;
      
    }