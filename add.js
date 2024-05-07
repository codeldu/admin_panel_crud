const companyInput = document.querySelector('#companyName');
const contactInput = document.querySelector('#contactName');
const titleInput = document.querySelector('#contactTitle');

const addForm = document.querySelector('#add');

addForm.addEventListener('submit', (e)=>{
    e.preventDefault();


    if (companyInput.value && contactInput.value && titleInput.value) {
        const bodyObj = {
            companyName : companyInput.value,
            contactName : contactInput.value,
            contactTitle : titleInput.value
        }
    
        axios.post('https://northwind.vercel.app/api/suppliers' , bodyObj)
        .then(res=> {
            if (res.status == 201) {
            addForm.innerHTML += `<p style="color:green;"> Melumat ugurla elave edildi`
            }

            setTimeout(()=>{window.location = "./index.html"}, 1500)
        })
    }else{
        alert("Form tam doldurulmayib")
    }
    
    
})
