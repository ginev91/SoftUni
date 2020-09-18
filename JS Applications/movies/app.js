import {getHome} from './controlers/home.js'
import { postLogin,getLogin} from './controlers/user.js'
import {register} from './controlers/user.js'
import {logout} from './controlers/user.js'
import {getCreate, postCreate, getDetails, getEdit ,postEdit,getClose, getLikes} from './controlers/movies.js'
import {postRegister} from './controlers/user.js'
import {getLogout} from './controlers/user.js'
const app = Sammy('body', function(){
    this.use('Handlebars', 'hbs');

this.get('#/home', getHome)
this.get('#/login', getLogin)
this.get('#/register', register)
 this.get('#/logout', logout)

this.post('#/register' , postRegister)
this.post('#/login' , postLogin)
this.get('#/logout' , getLogout)

this.get('#/create' , getCreate)
this.post('#/create' , postCreate)
 this.get('#/details/:id' , getDetails)
this.get('#/edit/:id' , getEdit)
this.post('#/edit/:id' , postEdit)
///
this.get('#/delete/:id' , getClose)
this.get('#/likes/:id' , getLikes)

 
})

app.run('#/home')

