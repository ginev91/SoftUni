import el from './dom.js'
import * as api from './data.js'

window.addEventListener('load', 
 () => {

    document.querySelector('#loadBooks').addEventListener('click' , loadBooks)

    const table = document.querySelector('table tbody')

  

   async function loadBooks () {
    table.innerHTML = '<tr> <td colspan="4"> Loadoning... </td></tr>'
        const books =  await api.getAllBooks()
        table.innerHTML = ''

        books.sort((a,b)=> a.author.localeCompare(b.author)).forEach(element => {table.appendChild(renderBook(element))
            
        });
        
    }

    const input ={
              
         title: document.querySelector('#create-title'),
         author : document.querySelector('#create-author'),
         isbn : document.querySelector('#create-isbn')

    }

   const buttonAdd = document.querySelector('form > button')
  
    buttonAdd.addEventListener('click',createBooks)
    async function createBooks(e){

        e.preventDefault()
       
         const book = {
            title: input.title.value,
            author: input.author.value,
            isbn: input.isbn.value
        }
  let valid = true
        Object.entries(book).find(([key, value]) => {
            if(value.length ===0){

                alert(`Book ${key} cannot be emprty!!!`)
                valid = false

                return true;
            }else{

                return false;
            }
        })
            if (valid === false){
                return
            }


          try {
             const created = await api.createBook(book)
             table.appendChild(renderBook(created))
            }catch(err){
               alert(err.message)
            }
         

           input.title.value = ""
           input.author.value= ""
           input.isbn.value = ""

           
          
         
           
    }


    async function delBook(id){
        


        await api.deleteBook(bookId)
    }



    function renderBook (book) {
      const delBtn =   el('button', 'Delete')
      const editBtn =el('button','Edit')
      delBtn.addEventListener('click' , delBook)
      editBtn.addEventListener('click', togleEditor)
        const element =  el("tr",[
            el('td' ,book.title),
            el('td' , book.author),
            el('td' , book.isbn),
            el('td' , [editBtn, delBtn]) 
        ])

        return element;
         
        async function delBook(){

            await api.deleteBook(book.objectId)
            element.remove()

        }
        function togleEditor(){
            const confirmBtn = el('button' ,'Save')
            const cancelBtn = el('button' ,'Cancel')
            
         const edit ={

            title: el('input', null , {type:"text" , value: book.title}) ,
            author:el('input', null , {type:"text" , value: book.author}),
            isbn: el('input', null , {type:"text" , value: book.isbn})
         }

           const editor =  el("tr",[
                el('td' ,edit.title),
                el('td' ,edit.author),
                el('td' ,edit.isbn),
                el('td' , [confirmBtn, cancelBtn]) 
            ])

            table.replaceChild(editor ,element)

            cancelBtn.addEventListener('click', function(){
                table.replaceChild(element ,editor)
            })

            confirmBtn.addEventListener('click', editBook)

            async function editBook(bookEd){
            
       
         const bookEdited = {
             objectId: book.objectId,
            title: edit.title.value,
            author: edit.author.value,
            isbn: edit.isbn.value
        }
  let valid = true
        Object.entries(bookEdited).find(([key, value]) => {
            if(value.length ===0){

                alert(`Book ${key} cannot be emprty!!!`)
                valid = false

                return true;
            }else{

                return false;
            }
        })
            if (valid === false){
                return
            }


          try {
             const result = await api.editBook(bookEdited)
             table.replaceChild(renderBook(result),editor)

             
            }catch(err){
               alert(err.message)
            }
         


            }

        }
    }

})