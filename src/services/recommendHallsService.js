import axios from "axios";


const axiosInstance=axios.create({
  withCredentials:true,
})


  export async function GetRecommendHalls(hallId) {
    const response = await axios.get(
      `http://localhost:8080/api/hall/recommendations/getRecommendations/${hallId}`
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
  
  export async function DeleteRecommendHall(id) {
    const response=await axios.delete(`http://localhost:8080/api/hall/recommendations/deleteRecommendation/${id}`)
    console.log("Recommendations from server:", response.data);
    return id;
      
    }