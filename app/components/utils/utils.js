export function isLogin(){
    const userid = localStorage.getItem('userid') ; 
    if(userid === undefined)return false ;
    if(userid === null)return false ;
    if(userid === 'null')return false ;

    if(userid === "")return false ;
    return true ;
}