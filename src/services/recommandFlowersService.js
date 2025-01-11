import axios from "axios";

const axiosInstance=axios.create({
  withCredentials:true,
})

  export async function GetRecommendFlowers(flowerId) {
    const response = await axiosInstance.get(
      `http://localhost:8080/api/flowers/recommendations/getRecommendations/${flowerId}`
    );
    console.log("Recommendations from server:", response.data); // הדפסת הנתונים מהשרת
    return response.data;
  }


export async function AddRecommendFlowers(flowerId, recommend) {
  const response = await axiosInstance.post(
    `http://localhost:8080/api/flowers/recommendations/addRecommendation/${flowerId}`,
    recommend
  );
  console.log("Recommendations from server:", response.data);
  return response.data;
}

export async function DeleteRecommendFlower(id) {
const response=await axiosInstance.delete(`http://localhost:8080/api/flowers/recommendations/deleteRecommendation/${id}`)
console.log("Recommendations from server:", response.data);
return id;
  
}
  