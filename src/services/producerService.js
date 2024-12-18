
import axios from "axios";


export async function GetProducers() {
try{
    const response=await axios.get("http://localhost:8080/api/producer/getProducers");
    console.log("the data from server ",response.data);
    console.log("the status data from server ",response.status);


    return response.data;
}
catch(error){
    console.error("an error occurred when you try to get the prodicers");
}
   
}


// export async function AddProducer(producer) {
//     console.log("add flower function called with ",producer)

//     try{
//         const response=await axios.post("http://localhost:8080/api/producer/addProducer",producer);

//         console.log(" status data from server ",response.status)
//         console.log("the data from server ",response.data);
//         return response.data;
//     }catch(error){
//         console.error("an error occurred when you tryed to add producer");
        
//     }

        
    
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
      if(imageFile)// שולח את הנתונים כאובייקט JSON
      formData.append('image', imageFile); // מוסיף את קובץ התמונה
  
      // בדוק את התוכן של FormData
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
  
  
