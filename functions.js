const connectionsModel = require('./models/connections');
const { connections, identifications, chats } = require('./database-memory')
const { v4: uuidv4 } = require('uuid');

const onConnection = (ws) => {
  return uuidv4()
}

const onIdentification = async (message) => {
  const { connection_id, user_id, ong_id } = message
  const id = user_id || ong_id
  
  await connectionsModel.upsert({ 
    id,
    connection_id
  });
}

const getChat = (user_id, ong_id) => {
  return chats.find(chat => chat.user_id === user_id && chat.ong_id === ong_id)
}

const onMessage = (message) => {
  const { user_id, ong_id, message: content } = message
  const chat = getChat(user_id, ong_id)
  
  if(chat){
    chat.messages.push(content)
  } else {
    chats.push({
      id: uuidv4(),
      user_id,
      ong_id,
      messages: [content]
    })
  }

  console.log('connections', connections)

  if(identifications[ong_id]){
    const ong_connection = connections[identifications[ong_id]]
    ong_connection.send(JSON.stringify(content))
  }

  if(identifications[user_id]){
    const user_connection = connections[identifications[user_id]]
    user_connection.send(JSON.stringify(content))
  }
}

module.exports = {
  onConnection,
  onIdentification,
  onMessage
}