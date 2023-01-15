const socket= io();

// Get DOM elements in respective js variables
const form= document.getElementById('send-container');
const messageInput= document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');

// Audio that will play on receiving message
var audio = new Audio('ting.mp3');

const append = (message, position) =>{
    const messageElement= document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left'){
        audio.play();
    }
}

// Ask new user name for joining
do {
    name = prompt('Please enter your name: ')
} while(!name)
//const name= prompt("Enter your name to join");
socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right');
});

socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`, 'left')
});

socket.on('left', name =>{
    append(`${name} left the chat`,'right')
});

// If the form gets submitted, send server the message
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value = ""
})