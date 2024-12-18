import axios from "axios";


  export async function GetRecommendCatring(cateringId) {
    try{
    const response = await axios.get(
      `http://localhost:8080/api/catering/recommendations/getRecommendations/${cateringId}`
    );
    console.log("Recommendations from server:", response.data); // הדפסת הנתונים מהשרת
    return response.data;}
    catch(error){
      console.error("erorrr",error);
    }
  }


export async function AddRecommendCatering(cateringId, recommend) {
  const response = await axios.post(
    `http://localhost:8080/api/catering/recommendations/addRecommendation/${cateringId}`,
    recommend
  );
  console.log("Recommendations from server:", response.data);
  return response.data;
}

export async function DeleteRecommendCatering(id) {
const response=await axios.delete(`http://localhost:8080/api/catering/recommendations/deleteRecommendation/${id}`)
console.log("Recommendations from server:", response.data);
return id;
  
}
  