import axios from "axios";

const axiosInstance=axios.create({
  withCredentials:true,
})


  export async function GetRecommendCatring(cateringId) {
    try{
    const response = await axiosInstance.get(
      `http://localhost:8080/api/catering/recommendations/getRecommendations/${cateringId}`
    );
    console.log("Recommendations from server:", response.data); 
    return response.data;}
    catch(error){
      console.error("erorrr",error);
    }
  }


export async function AddRecommendCatering(cateringId, recommend) {
  const response = await axiosInstance.post(
    `http://localhost:8080/api/catering/recommendations/addRecommendation/${cateringId}`,
    recommend
  );
  console.log("Recommendations from server:", response.data);
  return response.data;
}

export async function DeleteRecommendCatering(id) {
const response=await axiosInstance.delete(`http://localhost:8080/api/catering/recommendations/deleteRecommendation/${id}`)
console.log("Recommendations from server:", response.data);
return id;
  
}
  