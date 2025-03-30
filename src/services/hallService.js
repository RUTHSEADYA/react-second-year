import axios from "axios";

const axiosInstance=axios.create({
  withCredentials:true,
})

export async function GetHalls() {
  try{
    const response = await axios.get("http://localhost:8080/api/hall/getHalls");
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

  
    export async function DeleteHall(id) {
      try{
const response=await axios.delete(`http://localhost:8080/api/hall/deleteHall/${id}`);
console.log("the stutus  data erom server :",response.status);
return id;
      }catch(error){
        console.log("an error occurred when you tryed to delete");
       
      }
      
    }

    export async function UpdateHall(hallData, imageFile, id) {
      try {
        const formData = new FormData();
        formData.append("hall", JSON.stringify(hallData));
        if (imageFile) {
          formData.append("image", imageFile);
        }
    
        const response = await axios.put(
          `http://localhost:8080/api/hall/updateHall/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Response from server:", response.data);
        return { id, hall: response.data };
      } catch (error) {
        console.error("Error occurred while updating hall:", error);
        throw error;
      }
    }
  

    export async function AddHall(hallData, imageFile) {
      try {
        const formData = new FormData();
        formData.append('hall', JSON.stringify(hallData));
        if(imageFile)
        formData.append('image', imageFile);
    
        console.log('Sending hall data:', JSON.parse(formData.get('hall')));
        console.log('Image file:', formData.get('image'));
    
        const response = await axios.post(
          "http://localhost:8080/api/hall/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
    
        console.log("Uploaded hall:", response.data);
        return response.data;
      } catch (error) {
        if (error.response) {
          console.error('Server error:', error.response.data);
        } else {
          console.error('Unexpected error:', error.message);
        }
        throw error;
      }
    }
   
    
    
    

    
  