



import axios from 'axios';




export async function signUpUser(user) {
    console.log('signUpUser function called with:', user);

    try {
        const response = await axios.post('http://localhost:8080/api/users/signUp', user); 
        console.log(`Registration successful: ${response.data} (status: ${response.status})`); 
        alert("נרשמת! כדי להנות מכל השירותים שלנו אל תשכח גם להתחבר");

        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 400) {
            throw new Error('יש למלא את כל השדות');}

      else  if (error.response && error.response.status === 409) {
            console.log('Username already exists');
            //alert("userName already exists please sign up with a new name");
            throw new Error('משתמש קיים במערכת');
        } else if(error.response&&error.response.status===404){
           
            throw new Error('אינך מחובר למערכת , אנא הרשם');
        }
        else{
            console.log('An error occurred:', error.message);
            throw error;

        }
    }

    
}




export async function SigninUser(user) {
    try {
        const response = await axios.post('http://localhost:8080/api/users/Log_in', user);
        console.log("the date from server",response.data)
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            throw new Error("אינך מחובר למערכת בבבקשה הרשם");
        } else if (error.response && error.response.status === 400) {
            throw new Error("סיסמא שגויה");
        } 
        else if (error.response && error.response.status === 409) {
            throw new Error("יש למלא את כל השדות");}
        else {
            throw new Error("An unexpected error occurred");
        }
    }
}



    export async function UpdateUser(user, id) {
        try {
            const response = await axios.put(`http://localhost:8080/api/users/updateUser/${id}`, user);
            console.log("The response from server", response.data);
            return { user: response.data, id }; 
        } catch (error) {
            console.error("An error occurred when you tried to update user", error);
        }
    }
    


export default { signUpUser, SigninUser };






