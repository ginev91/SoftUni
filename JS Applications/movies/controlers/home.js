import commonPartials from './partial.js'
import { setHeader } from './auth.js'
import {getAll} from '../models/movies.js'

export  function getHome(ctx){

    setHeader(ctx)
  getAll().then(res => {console.log(res)
      const movies =res.docs.map(el =>

          el ={...el.data() , id: el.id}
          )
      console.log(movies)
ctx.movies = movies
        ctx.loadPartials(commonPartials).partial('./view/user/home.hbs')
})

    
}