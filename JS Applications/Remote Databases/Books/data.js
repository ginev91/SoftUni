
const appID = '47FE4C69-EFD3-B90E-FF7F-686051671400'
const apiKey = '4687A485-A844-4EFF-AA8D-FA8C574392B9'

function host(endpoint){
    return `https://api.backendless.com/${appID}/${apiKey}/data/${endpoint}`
}

 export async function getAllBooks(){

    const response = await fetch(host('books'))
    const data = await response.json()
    return data
    
};

export async function createBook(book){

    const response = await fetch(host('books'),{
        method: 'POST',
        body: JSON.stringify(book),
        header:{"content-type":"application/json"}
    })
    const data = await response.json()
    return data;
};

export async function editBook(book){
    const id = book.objectId

    const response = await fetch(host('books/'+id),{
        method: 'PUT',
        body: JSON.stringify(book),
        headers:{"content-type":"application/json"}
    })
    const data = await response.json()
    return data;


};

export async function deleteBook(id){


    const response = await fetch(host('books/'+id),{

    method: 'DELETE',

    })

  const data = await response.json()

  return data;

};

