
import axios from "axios";

export async function GetCatering() {
    const response = await axios.get("http://localhost:8080/api/catering/getCatering");
    console.log("Data from server:", response.data); // בדיקת נתונים
    return response.data;
  }


    export async function DeleteCatering(id) {
      try{
const response=await axios.delete(`http://localhost:8080/api/catering/deleteCatering/${id}`);
console.log("the status  data erom server :",response.status);
return id;
      }catch(error){
        console.log("an error occurred when you tryed to delete");
       
      }
      
    }
  
    

    
    export async function UpdateCatering(cateringData, imageFile, id) {
      try {
        const formData = new FormData();
        formData.append("catering", JSON.stringify(cateringData));
        if (imageFile) {
          formData.append("image", imageFile);
        }
    
        const response = await axios.put(
          `http://localhost:8080/api/catering/updateCatering/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Response from server:", response.data);
        return { id, catering: response.data };
      } catch (error) {
        console.error("Error occurred while updating catering:", error);
        throw error;
      }
    }

    

    export async function AddCatering(cateringData, imageFile) {
    
      try {
        const formData = new FormData();
        formData.append('catering', JSON.stringify(cateringData));
        if(imageFile)
        formData.append('image', imageFile); // מוסיף את קובץ התמונה
    
        // בדוק את התוכן של FormData
        for (let pair of formData.entries()) {
          console.log(pair[0] + ', ' + pair[1]);
        }
    
        const response = await axios.post(
          "http://localhost:8080/api/catering/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
    
        console.log("Uploaded catering:", response.data);
        return response.data;
      } catch (error) {
        console.error("An error occurred while uploading the catering:", error);
        throw error;
      }
    }