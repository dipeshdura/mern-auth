export const useAuth =()=>{
    const signupForm =async({username,email, password})=>{
        const response =await fetch("/api/auth/signup",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
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
        const response =await fetch("/api/auth/signin",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                password
            })
        })
        const data =await response.json();
        return data;
    }
    return {signupForm,signinForm};
}