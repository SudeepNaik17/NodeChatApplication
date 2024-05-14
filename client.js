const socket = io()
let name;
const button = document.querySelector('.submit')
const input= document.querySelector('#inputVal');
const newUser=document.querySelector('.user-joined');
const chatBox= document.querySelector('.chat-box');
const userNot=(name)=>{
  const newEl= document.createElement('div');
  newEl.classList.add('user-joined');
  newEl.innerHTML=`${name} joined the chat`;
  chatBox.append(newEl);
}
const userMess=(mess,pos)=>{
  const newEl= document.createElement('div');
  newEl.classList.add(pos);
  newEl.classList.add('message');
  newEl.innerText=mess;
  chatBox.append(newEl);
}
name = prompt('Please enter your name: ');

socket.emit('new-user-joined',name);

button.addEventListener('click',(e)=>{
  const message = input.value;
  e.preventDefault();
    if (message.trim() !== "") {  
    userMess(`You: ${message}`,'right');
  socket.emit('send',message);
  input.value="";
    }
});
socket.on('user-joined',(name)=>{
  userNot(name);
})
socket.on('receive',(data)=>{
  userMess(`${data.user}:${data.message}`,'left');
})

