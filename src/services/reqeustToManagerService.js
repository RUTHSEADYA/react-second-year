

import axios from "axios";

const axiosInstance=axios.create({
    withCredentials:true,
  })

export async function GetReqeusts() {
    const response=await axiosInstance.get("http://localhost:8080/api/requests/getAllReqeusts");
    console.log("the response from server",response.data);
    return response.data;

}

export async function DeleteReqeust(id) {
try{
    const response=await axiosInstance.delete(`http://localhost:8080/api/requests/deleteRequest/${id}`);
    console.log("the stutus  data erom server :",response.status);
    return id;}
    catch(error){
        console.log("an error occurred when you tryed to delete reqeust");
    }
    
}
