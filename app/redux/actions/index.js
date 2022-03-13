export  const getProfile  = (profile)=>{
    return (dispatch)=>{
        dispatch({
            type:"get",
            payload:profile
        })
    }
}