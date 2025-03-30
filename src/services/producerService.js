
import axios from "axios";

const axiosInstance=axios.create({
  withCredentials:true,
})


export async function GetProducers() {
try{

    const response=await axios.get("http://localhost:8080/api/producer/getProducers");
    console.log("the data from server ",response.data);
    console.log("the status data from server ",response.status);
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


        
    
    export async function DeleteProducer(id) {
        try{
        const response=await axios.delete(`http://localhost:8080/api/producer/deleteProducer/${id}`);
        console.log("the status data from server",response.status)
        return id;

    }catch(error){
console.error("an error occurred when you tryed to delete producer")
    }

}


      
      export async function UpdateProducer(producerData, imageFile, id) {
        try {
          const formData = new FormData();
          formData.append("producer", JSON.stringify(producerData));
          if (imageFile) {
            formData.append("image", imageFile);
          }
      
          const response = await axios.put(
            `http://localhost:8080/api/producer/updateProducer/${id}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          console.log("Response from server:", response.data);
          return { id, producer: response.data };
        } catch (error) {
          console.error("Error occurred while updating singer:", error);
          throw error;
        }
      }

export async function AddProducer(producerData, imageFile) {
    
    try {
      const formData = new FormData();
      formData.append('producer', JSON.stringify(producerData)); 
      if(imageFile)
      formData.append('image', imageFile); 
  
      for (let pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }
  
      const response = await axios.post(
        "http://localhost:8080/api/producer/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      console.log("Uploaded producer:", response.data);
      return response.data;
    } catch (error) {
      console.error("An error occurred while uploading the producer:", error);
      throw error;
    }
  }
  
  
