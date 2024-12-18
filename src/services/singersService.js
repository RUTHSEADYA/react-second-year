
import axios from "axios";


export async function GetSingers() {
try{
    const response=await axios.get("http://localhost:8080/api/singers/getSingers");
    console.log("the data from server ",response.data);
    console.log("the status data from server ",response.status);


    return response.data;
}
catch(error){
    console.error("an error occurred when you try to get the singers");
}
   
}


// export async function AddSinger(singer) {
//     console.log("add singer function called with ",singer)

//     try{
//         const response=await axios.post("http://localhost:8080/api/singers/addSinger",singer);

//         console.log(" status data from server ",response.status)
//         console.log("the data from server ",response.data);
//         return response.data;
//     }catch(error){
//         console.error("an error occurred when you tryed to add singer");
        
//     }

        
//     }
    export async function DeleteSinger(id) {
        try{
        const response=await axios.delete(`http://localhost:8080/api/singers/deleteSinger/${id}`);
        console.log("the status data from server",response.status)
        return id;

    }catch(error){
console.error("an error occurred when you tryed to delete singer",error)
    }
    }

    // export async function UpdateSinger(singer,id) {
    //   try{
    //     const response=await axios.put(`http://localhost:8080/api/singers/updateSinger/${id}`,singer);
    //      console.log("the response from server",response.data);
    //      return { id, singer: response.data }; // החזרת המידע הנדרש
    //     }catch(error){
    //     console.error("an error occurred when you tryed to update singer",error);
    //   }
      
    // }

    export async function UpdateSinger(singerData, imageFile, id) {
      try {
        const formData = new FormData();
        formData.append("singer", JSON.stringify(singerData));
        if (imageFile) {
          formData.append("image", imageFile);
        }
    
        const response = await axios.put(
          `http://localhost:8080/api/singers/updateSinger/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Response from server:", response.data);
        return { id, singer: response.data };
      } catch (error) {
        console.error("Error occurred while updating singer:", error);
        throw error;
      }
    }
    

    // export async function FilterSingers(name) {
    //     try {
    //       // הוספת פרמטר name ל-URL (למשל: ?name=...)
    //       const response = await axios.get(`http://localhost:8080/api/singers/searchSingers`, {
    //         params: { name }
    //       });
      
    //       console.log("the status data from server", response.status);
    //       return response.data;
    //     } catch (error) {
    //         console.error("an error occurred when you tryed to filter singer",error)

    //       throw new Error(error.message);
    //     }

        export async function FilterSingers(name) {
       
            //if (name == name.trim()); // הסרת רווחים מיותרים
            try{
            const response=await axios.get("http://localhost:8080/api/singers/searchSingers",name);
            if(response.data.length===0||response.status===204){
              return {message:"לא נמצאו תוצאות"}
            }
            console.log("the data from server ",response.data)
            return response.data;
          }catch(error){
                        console.error("an error occurred when you tryed to filter singer",error)

          }      throw new Error("התרחשה שגיאה בזמן החיפוש. נסה שוב מאוחר יותר.");
      }

      export async function AddSinger(singerData, imageFile) {
    
        try {
          const formData = new FormData();
          formData.append('singer', JSON.stringify(singerData)); 
          if(imageFile)// שולח את הנתונים כאובייקט JSON
          formData.append('image', imageFile); // מוסיף את קובץ התמונה
      
          // בדוק את התוכן של FormData
          for (let pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
          }
      
          const response = await axios.post(
            "http://localhost:8080/api/singers/upload",
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
      
      