
import axios from "axios";

const axiosInstance=axios.create({
  withCredentials:true,
})


export async function GetSingerRecommend(singerId) {
    try{
    const response = await axiosInstance.get(
      `http://localhost:8080/api/singersRecommendController/getRecommendations/${singerId}`
    );
    console.log("Recommendations from server:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    throw error;
  } 
}

export async function AddRecommendSinger(singerId, recommend) {
  const response = await axiosInstance.post(
    `http://localhost:8080/api/singersRecommendController/addSingerRecommend/${singerId}`,
    recommend
  );
  console.log("Recommendations from server:", response.data);
  return response.data;
}

export async function DeleteRecommendSinger(id) {
  const response=await axiosInstance.delete(`http://localhost:8080/api/singersRecommendController/deleteRecommend/${id}`)
  console.log("Recommendations from server:", response.data);
  return id;
    
  }

