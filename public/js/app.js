const formData = document.querySelector('form')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')
const message3 = document.querySelector('#message-3')
const message4 = document.querySelector('#message-4')
const message5 = document.querySelector('#message-5')
const message6 = document.querySelector('#message-6')

formData.addEventListener('submit',(e)=>{
    e.preventDefault()
    message1.textContent = 'fetching...'
    message2.textContent = ''
    message3.textContent = ''
    message4.textContent = ''
    message5.textContent = ''
    message6.textContent = ''
    const location = document.querySelector('input').value
        fetch('/weather?address='+location).then((res)=>{
        res.json().then((data)=>{
            if(data.error){
                message1.textContent = data.error
                message2.textContent = ''
            }
            else{
                // console.log(data)
                message1.textContent = data.place
                message2.textContent = data.forecast
                message3.textContent = 'Humidity: ' + data.humidity+'%'
                message4.textContent = 'Wind Speed: '+data.wind+' kph'
                message5.textContent = 'Temperature: '+data.temp+' degree C'
                message6.textContent = 'Feels Like: '+data.feels+' degree C'
            }
        })
    })
})