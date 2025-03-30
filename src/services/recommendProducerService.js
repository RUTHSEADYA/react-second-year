
import axios from "axios";

const axiosInstance=axios.create({
  withCredentials:true,
})

export async function GetProducerRecommend(producerId) {
    try{
    const response = await axios.get(
      `http://localhost:8080/api/producerRecommend/getRecommendations/${producerId}`
    );
    console.log("Recommendations from server:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    throw error;
  } 
}

export async function AddRecommendProducer(producerId, recommend) {
  const response = await axios.post(
    `http://localhost:8080/api/producerRecommend/addRecommendadion/${producerId}`,
    recommend
  );
  console.log("Recommendations from server:", response.data);
  return response.data;
}

export async function DeleteRecommendProducer(id) {
  try{
  const response=await axios.delete(`http://localhost:8080/api/producerRecommend/deleteRecommend/${id}`)
  console.log("Recommendations from server:", response.data);
  return id;}
  catch(error){
    console.error("the function failed",error)
  }
    
  }