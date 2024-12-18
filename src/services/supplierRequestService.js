

import axios from "axios";

export async function AddRequest(request){
    try{
    const response=await axios.post("http://localhost:8080/api/requests/addRequest",request);
    console.log("the data from server",response.data);
    return response.data;
    }catch(error){
        console.error("the function faild when you try to add request",error)
        throw error;

    }
}