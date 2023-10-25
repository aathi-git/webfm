const chatMessages = document.getElementById('chat-messages');
const messageInput = document.getElementById('message');
const sendButton = document.getElementById('send');

const ws = new WebSocket('wss://your-websocket-server-url');

ws.addEventListener('open', () => {
    // Connection is established
    console.log('Connected to WebSocket');
});

ws.addEventListener('message', (event) => {
    // Received a message from the server, add it to the chat container
    const message = event.data;
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
});

sendButton.addEventListener('click', () => {
    // Send the message to the server
    const message = messageInput.value;
    ws.send(message);

    // Clear the input field
    messageInput.value = '';
});
