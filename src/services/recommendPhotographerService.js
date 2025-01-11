import axios from "axios";

const axiosInstance=axios.create({
  withCredentials:true,
})

  export async function GetRecommendPhotographer(photographerId) {
    const response = await axiosInstance.get(
      `http://localhost:8080/api/photographerRecommend/getRecommendations/${photographerId}`
    );
    console.log("Recommendations from server:", response.data); 
    return response.data;
  }

  export async function AddRecommendPhotographer(photographerId, recommend) {
    try{
    const response = await axiosInstance.post(
      `http://localhost:8080/api/photographerRecommend/addRecommendadion/${photographerId}`,
      recommend
    );
    console.log("Recommendations from server:", response.data);
    return response.data;
  }catch(error){
    console.error("error",error);
  }
  }
  
  export async function DeleteRecommendPhotographer(id) {
    const response=await axiosInstance.delete(`http://localhost:8080/api/photographerRecommend/deleteRecommendation/${id}`)
    console.log("Recommendations from server:", response.data);
    return id;
      
    }