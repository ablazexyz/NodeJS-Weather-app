console.log('Client Side JS loaded')



const formData = document.querySelector('form')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

formData.addEventListener('submit',(e)=>{
    e.preventDefault()
    message1.textContent = 'fetching...'
    message2.textContent = ''
    const location = document.querySelector('input').value
        fetch('http://localhost:3000/weather?address='+location).then((res)=>{
        res.json().then((data)=>{
            if(data.error){
                message1.textContent = data.error
                message2.textContent = ''
            }
            else{
                // console.log(data)
                message1.textContent = data.place
                message2.textContent = data.forecast
            }
        })
    })
})