import { API_URL } from "../contextapi/api";

export const useAuth =()=>{
    const signupForm =async({username,email, password})=>{
        const response =await fetch(`${API_URL}/api/auth/signup`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify({
                username,
                email,
                password
            })
        });
      
        const data =await response.json();
        return data;

    }
    const signinForm =async({email, password})=>{
        const response =await fetch(`${API_URL}/api/auth/signin`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
             credentials:"include",
            body:JSON.stringify({
                email,
                password
            })
        })
        const data =await response.json();
        return data;
    }
    
    const googleAuth =async({displayName,email,photoURL})=>{
        const response =await fetch(`${API_URL}/api/auth/google`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
             credentials:"include",
            body:JSON.stringify({
                displayName,
                email,
                photoURL
            })
        })
        const data =await response.json();
        return data;
    }
    return {signupForm,signinForm,googleAuth};
}