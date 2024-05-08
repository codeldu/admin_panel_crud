const id = new URLSearchParams(window.location.search).get("id");
let data = {};


const addForm = document.querySelector('#add');
const companyInput = document.querySelector('#companyName');
const contactInput = document.querySelector('#contactName');
const titleInput = document.querySelector('#contactTitle');

const getData = async () =>{
    let response = await axios.get('https://northwind.vercel.app/api/suppliers/'+id);
    data= response.data;

    companyInput.value = data.companyName;
    contactInput.value = data.contactName;
    titleInput.value = data.contactTitle;

}

getData()



addForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    
    if (companyInput.value && contactInput.value && titleInput.value) {
        const bodyObj = {
            companyName : companyInput.value,
            contactName : contactInput.value,
            contactTitle : titleInput.value
        }
    
        axios.patch('https://northwind.vercel.app/api/suppliers/' + id , bodyObj)
        .then(res=> {
            if (res.status == 200) {
            addForm.innerHTML += `<p style="color:green;"> Melumat ugurla elave yenilendi`
            }

            setTimeout(()=>{window.location = "./index.html"}, 1500)
        })
    }else{
        alert("Form tam doldurulmayib")
    }
    

})