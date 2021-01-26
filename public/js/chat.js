const socket = io()

//elemets
const $messagForm = document.querySelector('#message-form')
const $messagFormInput = document.querySelector('input')
const $messagFormButton = document.querySelector('button')
const $messages = document.querySelector('#messages')
const messagTemplate = document.querySelector('#message-template').innerHTML
socket.on('message', (message) => {

    console.log(message)
    const html = Mustache.render(messagTemplate,{
        message
    })
    $messages.insertAdjacentHTML('beforeend',html)
    
})
document.querySelector('#message-form').addEventListener('submit', (e) => {

    e.preventDefault()
    //disbale
    $messagFormButton.setAttribute('disabled','disabled')

    const message = e.target.elements.message.value
    socket.emit('sendMessage', message, () => {
        //enable
        $messagFormButton.removeAttribute('disabled')
        $messagFormInput.value=''
        $messagFormInput.focus()
        console.log("message delivered..")
    })
})

document.querySelector('#send-location').addEventListener('click', () => {

    if (!navigator.geolocation) {
        return alert('locatioin is not supported by browser')
    }
    navigator.geolocation.getCurrentPosition((position) => {

        console.log(position)
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude

        })
    })
})

/* socket.on('countUpdated',(count)=>{
    console.log('the count has been updated..',count)
})
document.querySelector('#increment').addEventListener('click',()=>{
    console.log('clciked')
    socket.emit('increment')
}) */

