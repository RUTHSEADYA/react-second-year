import axios from "axios";

const axiosInstance=axios.create({
  withCredentials:true,
})

export async function GetFlowers() {
  try{
    const response = await axiosInstance.get("http://localhost:8080/api/flowers/getFlowers");
    console.log("Data from server:", response.data); 
    return response.data;
  }
  catch(error){
    if (error.response && error.response.status === 401) {
      throw new Error("אינך מורשה לצפות בתכני האתר לפני שתתחבר");}
  else {
      throw new Error("An unexpected error occurred");
  }
  }
  }

  
    export async function DeleteFlower(id) {
      try{
const response=await axiosInstance.delete(`http://localhost:8080/api/flowers/deleteFlower/${id}`);
console.log("the stutus  data erom server :",response.status);
return id;
      }catch(error){
        console.log("an error occurred when you tryed to delete");
       
      }
      
    }
    
    

    
    export async function UpdateFlower(flowerData, imageFile, id) {
      try {
        const formData = new FormData();
        formData.append("flower", JSON.stringify(flowerData));
        if (imageFile) {
          formData.append("image", imageFile);
        }
    
        const response = await axiosInstance.put(
          `http://localhost:8080/api/flowers/updateFlowers/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Response from server:", response.data);
        return { id, flower: response.data };
      } catch (error) {
        console.error("Error occurred while updating flower:", error);
        throw error;
      }
    }

    export async function FilterFlowers({name,position}) {
      const params={};
 
      if (name) params.name = name.trim(); 
      if (position) params.position = position.trim();
      try{
      const response=await axiosInstance.get("http://localhost:8080/api/flowers/searchFlower",{params});
      if(response.data.length===0||response.status===204){
        return {message:"לא נמצאו תוצאות"}
      }
      console.log("the data from server ",response.data)
      return response.data;
    }catch(error){
     
    }      throw new Error("התרחשה שגיאה בזמן החיפוש. נסה שוב מאוחר יותר.");

    }

    export async function UploadFloewr(flowerData, imageFile) {
    
      try {
        const formData = new FormData();
        formData.append('flower', JSON.stringify(flowerData));
        if(imageFile)
        formData.append('image', imageFile); 
        for (let pair of formData.entries()) {
          console.log(pair[0] + ', ' + pair[1]);
        }
    
        const response = await axiosInstance.post(
          "http://localhost:8080/api/flowers/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
    
        console.log("Uploaded flower:", response.data);
        return response.data;
      } catch (error) {
        console.error("An error occurred while uploading the flower:", error);
        throw error;
      }
    }