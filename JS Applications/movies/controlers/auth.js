export function saveUserInfo(userInfo){


    sessionStorage.setItem('email', userInfo)
}
export function setHeader(ctx){
     
    ctx.isAuth = sessionStorage.getItem('email')  !== null
    ctx.email = sessionStorage.getItem('email')

}