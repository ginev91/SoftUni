import commonPartials from './partial.js'
import {registerUser,login,logoutUser} from '../models/user.js'
import {saveUserInfo , setHeader} from './auth.js'
import {getAll} from '../models/movies.js'



export function getLogin(ctx){
    setHeader(ctx)
    ctx.loadPartials(commonPartials).partial('./view/user/login.hbs')
}
export function profile(ctx){
    setHeader(ctx)
    
    ctx.count = 0;
   getAll()
        .then((res) => {
            const events = res.docs.map(el =>

                el ={...el.data() , id: el.id});
                
            events.forEach((event) => {
                if (event.organizer === sessionStorage.getItem("email")) {
                    ctx.haveEvents = true;
                    ctx.count++;
                    if (ctx.hasOwnProperty("movies") == false) {
                        ctx.events = [];
                        
                        
                    }
                    ctx.events.push(event.name);
                    console.log(ctx.events)
                }
            });
            ctx.loadPartials(commonPartials).partial('./view/user/home.hbs')
        })
        

   
}
export function register(ctx){
    setHeader(ctx)
    ctx.loadPartials(commonPartials).partial('./view/user/register.hbs')
}
export function logout(ctx){

    sessionStorage.clear()
    notify('Successful Log Out!!!', 'successBox')

    setTimeout(()=>{
        ctx.loadPartials(commonPartials).partial('./view/user/home.hbs')

      },1000)
     

}
export function postRegister(ctx){
    
    const {email , password , repeatPassword} = ctx.params
    if(password === repeatPassword){

    registerUser(email , password)
    .then(res =>{
       saveUserInfo(res.user.email)

       notify('Successful Registration!!!', 'successBox')
        
      setTimeout(()=>{
        ctx.redirect('#/home')

      },1000)
    })
}
}
export function postLogin(ctx){
    const {email, password} = ctx.params
    login(email,password)
    .then(res =>  {
        notify('Successful login!!!', 'successBox')
      saveUserInfo(res.user.email)
     
   
      setTimeout(()=>{
        ctx.redirect('#/home')

      },1000)
    
})

}

export function getLogout(ctx){
   
    logoutUser().then(res =>{console.log(res)
       
        sessionStorage.clear()
        ctx.redirect('#/home')
})

}
function notify(message,selector){

    const notification = document.getElementById(selector)
    const classNotification = document.getElementsByClassName('notifications')[1]
    classNotification.style.display ='block'
    notification.innerHTML = message
    
}
