



    import axios from 'axios';

    // const axiosInstance=axios.create({
    //     withCredentials:true,
    // })


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
            } else if (error.response && error.response.status === 401) {
                throw new Error("סיסמא שגויה");
            } 
            else if (error.response && error.response.status === 400) {
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
                }
                catch(error) {
                    if (error.response && error.response.status === 401) {
                        console.error("Unauthorized: Please login again.");
                        alert("משתמש לא מזוהה , בבקשה התחבר שוב")
                        throw new Error("משתמש לא מזוהה , בבקשה התחבר שוב");
                        
                    } else {
                        console.error("Unexpected error occurred", error);

                    }
                    throw error;
                }
        }
        // export async function UpdateUser(user, id) {
        //     try {
        //         const token = localStorage.getItem("token"); // קבל את הטוקן המקומי
        //         const response = await axiosInstance.put(
        //             `http://localhost:8080/api/users/updateUser/${id}`,
        //             user,
        //             {
        //                 headers: {
        //                     Authorization: `Bearer ${token}`,
        //                 },
        //             }
        //         );
        //         console.log("The response from server", response.data);
        //         return { user: response.data, id }; 
        //     } catch (error) {
        //         console.error("An error occurred when you tried to update user", error);
        //         throw error; // הוסף זאת כדי שהשגיאה תתגלגל למעלה
        //     }
        // }
        
        
        export async function SignOutUser() {
            try {
                const response = await axios.post('http://localhost:8080/api/users/signout');
                console.log("The response from server",  response.data);
                return response.data;
            } catch (error) {
                console.error("An error occurred when you tried to sign out user", error);
            }
        }


    export default { signUpUser, SigninUser };






