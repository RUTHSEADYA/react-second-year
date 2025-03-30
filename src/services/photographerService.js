import axios from "axios";

const axiosInstance=axios.create({
  withCredentials:true,
})

export async function GetPotographer() {
    try{
    const response = await axios.get("http://localhost:8080/api/photographer/getPhotographers");
    console.log("Data from server:", response.data); 
    return response.data;}
    catch(error){
      if (error.response && error.response.status === 401) {
        throw new Error("אינך מורשה לצפות בתכני האתר לפני שתתחבר");}
    else {
        throw new Error("An unexpected error occurred");
    }
    }
  }


  export async function AddPotographer(photographerData, imageFile) {
    try {
      const formData = new FormData();
      formData.append('photographer', JSON.stringify(photographerData));
      if (imageFile) {
        formData.append('image', imageFile);
      }  
     
      for (let pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }
  
      const response = await axios.post(
        "http://localhost:8080/api/photographer/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      console.log("Uploaded photographer:", response.data);
      return response.data;
    } catch (error) {
      console.error("An error occurred while uploading the photographer:", error);
      throw error;
    }
  }

  
    export async function UpdatePhotographer(photographerData, imageFile, id) {
      try {
        const formData = new FormData();
        formData.append("photographer", JSON.stringify(photographerData));
        if (imageFile) {
          formData.append("image", imageFile);
        }
    
        const response = await axios.put(
          `http://localhost:8080/api/photographer/updatePhotographer/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Response from server:", response.data);
        return { id, photographer: response.data };
      } catch (error) {
        console.error("Error occurred while updating photographer:", error);
        throw error;
      }
    }
   
  
    export async function DeletePotographer(id) {
        try{
  const response=await axios.delete(`http://localhost:8080/api/photographer/deletePhotographer/${id}`);
  console.log("the stutus  data erom server :",response.status);
  return id;
        }catch(error){
          console.log("an error occurred when you tryed to delete");
         
        }
        
      }
  
    
    


