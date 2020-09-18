import commonPartials from './partial.js'
import { setHeader } from './auth.js'
import {create, update,close} from '../models/movies.js'
import { get } from '../models/movies.js'

export  function getCreate(ctx){
    setHeader(ctx)
    ctx.loadPartials(commonPartials).partial('./view/movies/create.hbs')
}

export  function postCreate(ctx){
    
    const {title, description ,imageUrl} = ctx.params
    const creator = sessionStorage.getItem('email')

    create({title, description ,imageUrl, creator, likes :0}).
    then(res =>{
        ctx.redirect('#/home')
        console.log("Successfull post")})
}

export function getDetails(ctx){
const id = ctx.params.id
setHeader(ctx)
    get(id).then(res => {
       const movie = {...res.data(), id: res.id}
       
        ctx.isCreator = movie.creator === sessionStorage.getItem('email')
        ctx.movie =movie
        ctx.loadPartials(commonPartials).partial('./view/movies/details.hbs')

    
    })

}
export function getEdit(ctx){
    const id = ctx.params.id
   
    get(id).then(res => {
           const movie = {...res.data() , id: res.id}
           ctx.movie =movie
            ctx.loadPartials(commonPartials).partial('./view/movies/edit.hbs')
        
        }).catch(e => console.log(e))
    
    }
    export function postEdit(ctx){
        const id = ctx.params.id
        setHeader(ctx)
        const {title, description,imageUrl} = ctx.params
        update(id,{title, description,imageUrl}).then(res => {
            console.log("Successfull update")
            ctx.redirect(`#/details/${id}`)
            
            }).catch(e => console.log(e))
        
        }
    
        export function getClose(ctx){
            const id = ctx.params.id;
            close(id).then(res =>{ 
               
                
ctx.redirect('#/home')
            })
        }

        export function getLikes(ctx){
            const id = ctx.params.id;
            get(id).then(res => {
                const movie = res.data()
                ctx.movie =movie
               
                movie.likes++
                let likes = movie.likes
                update(id, {likes}).then(res =>{
                    ctx.redirect(`#/details/${id}`)

                })
                   
                
                })
        }

        