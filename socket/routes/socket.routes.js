const chatModel = require('../../models/chat');

const rooms = []

module.exports = async (io) => {
  io.on('connection', (socket) => {
    console.log(`[SOCKET] /connection - ${socket.id}`);
    console.log(socket.handshake.auth.user_id);

    socket.on('create-room', async (data) => {
      console.log(`[SOCKET] /create-room - ${socket.id}`);
      const room_id = `${data.user_id}-${data.ong_id}`

      if (!rooms.includes(room_id)) {
        rooms.push(room_id)
      }

      const chatExists = await chatModel.findByPk(room_id)

      if(!chatExists) {
        await chatModel.create({ 
          id: room_id,
          user_id: data.user_id,
          ong_id: data.ong_id,
          mensagens: JSON.stringify([])
        });
      }

      socket.join(room_id)

      socket.emit('create-room-response', { status: 'success' })
    })

    socket.on('join-room', async (data) => {
      console.log(`[SOCKET] /join-room - ${socket.id}`);
      const room_id = `${data.user_id}-${data.ong_id}`

      console.log('DIGUINNNN', room_id)

      socket.join(room_id)
      
      const chat = await chatModel.findOne({ where: { id: room_id } })
      const messages = chat.dataValues.mensagens

      socket.emit('join-room-response', { status: 'success', messages })
    })

    socket.on('message', async (data) => {
      console.log(`[SOCKET] /message - ${socket.id}`);
      const room_id = `${data.user_id}-${data.ong_id}`

      const chat = chatModel.findOne({ where: { id: room_id } })

      const messages = JSON.parse(chat.mensagens)

      messages.push(data.message)

      await chatModel.update({ mensagens: JSON.stringify(messages) }, { where: { id: room_id } })

      socket.to(room_id).emit('message-response', { status: 'success', message: data.message })
    })
  })
}