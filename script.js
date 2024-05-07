let body = document.querySelector('#main');
let searchBar = document.querySelector('#searchBar');
let aplhaSelect = document.querySelector('#alpha');
let addNewBtn = document.querySelector('#addNew');
let suppliers = [];
let filteredArr = [];

const deleteElement =  async (id) =>{
await axios.delete('https://northwind.vercel.app/api/suppliers/' + id)
window.location.reload()
}



addNewBtn.addEventListener('click', ()=>{
    window.location = './add.html'
})

const render = ( array = suppliers)=> {
    body.innerHTML = array.map((supplier)=> {
        return ` 
            <tr>
                <td>
                     ${supplier.id}
                </td>
                <td>
                    ${supplier.companyName}
                </td>
                <td>
                    ${supplier.contactName}
                </td>
                <td>
                    ${supplier.contactTitle}
                </td>
                <td><button onclick="deleteElement(${supplier.id})">Delete</button></td>
            </tr>`
    }).join('');
}

const sortElements = ( arr , target ) => {
    if (target == "a-z") {
        let sortArr = arr.toSorted((a,b) => a.companyName.localeCompare(b.companyName))
        render(sortArr)
    }else if (target == "z-a") {
        let sortArr = arr.toSorted((a,b) => b.companyName.localeCompare(a.companyName))
        render(sortArr)
    }else{
        render(arr)
    }
}


searchBar.addEventListener('input', (e)=>{
    
    filteredArr = suppliers.filter((supplier)=> supplier.companyName.toUpperCase().startsWith(e.target.value.toUpperCase()));
    
    render(filteredArr)
})


aplhaSelect.addEventListener('change', (e)=>{

    
    if(!searchBar.value){
        sortElements(suppliers, e.target.value)
    }else{
        
        sortElements(filteredArr, e.target.value )
    }

   
})




let getAllData =  async () => {
    let response = await axios.get('https://northwind.vercel.app/api/suppliers');
    
    suppliers = response.data;

   render();
    
}

getAllData()
