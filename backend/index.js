import app from "./app.js"
import connectToDB from "./db/db.js";

const PORT =process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`SERVER STARTED AT PORT ${PORT}`),
    connectToDB();
})




