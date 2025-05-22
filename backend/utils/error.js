export const errorHandler =(statusCode, message)=>{
    const error =new Error();
    error.statusCode =statusCode;
    error.message =message;

    return error;
}
export const asyncHandler =(fn)=>(req,res,next)=>{
    Promise.resolve(fn(req,res,next)).catch(next);
}
