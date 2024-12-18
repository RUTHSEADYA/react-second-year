import axios from "axios";

export async function GetHalls() {
    const response = await axios.get("http://localhost:8080/api/hall/getHalls");
    console.log("Data from server:", response.data); // בדיקת נתונים
    return response.data;
  }

  // export async function AddHall(hall) {
  //         console.log("add hall function called with ",hall)

  //   try{

  //   const response=await axios.post("http://localhost:8080/api/hall/addHall",hall);
  //   console.log("status data from server",response.status)
  //   console.log(response.data)
  //   return response.data;}
  //   catch(error){
  //     console.log("an error occurred");
  //   }
  // }
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
    // export async function UpdateHall(hall,id) {
    //   try{
    //   const response=await axios.put(`http://localhost:8080/api/hall/updateHall/${id}`,hall);
    //   console.log("thedata feom server ",response.data);
    //   return response.data;
    //   }catch(error){
    //     console.error("the update error ",error)
    //     throw error;
    //   }
      
    // }

  
     
    // export async function AddHall(hallData, imageFile) {
    //   try {
    //     const formData = new FormData();
    //     formData.append('hall', JSON.stringify(hallData)); // שולח את הנתונים כאובייקט JSON
    //     formData.append('image', imageFile); // מוסיף את קובץ התמונה
    // console.log("halldata",hallData);
    //     // בדוק את התוכן של FormData
    //     for (let pair of formData.entries()) {
    //       console.log(pair[0] + ', ' + pair[1]);
    //     }
    
    //     const response = await axios.post(
    //       "http://localhost:8080/api/hall/upload",
    //       formData,
    //       {
    //         headers: {
    //           "Content-Type": "multipart/form-data",
    //         },
    //       }
    //     );
    
    //     console.log("Uploaded hall:", response.data);
    //     return response.data;
    //   } catch (error) {
    //     console.error("An error occurred while uploading the hall:", error);
    //     throw error;
    //   }
    // }

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
   
    
    
    



    
    // export async function FilterFlowers({name,position}) {
    //   const params={};
    //   if (name) params.name=name;
    //   if(position)params.position=position;
    //   try{
    //   const response=await axios.get("http://localhost:8080/api/flowers/searchFlower",{params});
    //   if(response.data.length===0||response.status===204){
    //     return {message:"לא נמצאו תוצאות"}
    //   }
    //   console.log("the data from server ",response.data)
    //   return response.data;
    // }catch(error){
     
    // }      throw new Error("התרחשה שגיאה בזמן החיפוש. נסה שוב מאוחר יותר.");

    // }

    

    // export async function ContactDesigner(designerId, eventType, eventDate, eventLocation) {
    //   try {
    //     const response = await axios.post("http://localhost:8080/api/flowers/contactDesigner", {
    //       designerId,
    //       eventType,
    //       eventDate,
    //       eventLocation,
    //     });
    
    //     if (response.status === 200) {
    //       console.log("הבקשה נשלחה בהצלחה!");
    //       return { message: "הבקשה נשלחה בהצלחה!" };
    //     } else {
    //       console.error("אירעה שגיאה, נסה שוב מאוחר יותר.");
    //       return { message: "אירעה שגיאה, נסה שוב מאוחר יותר." };
    //     }
    //   } catch (error) {
    //     console.error("שגיאה בחיבור לשרת:", error);
    //     throw new Error("שגיאה בחיבור לשרת.");
    //   }

    // }
    
    
  