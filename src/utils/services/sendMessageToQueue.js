require('dotenv').config();
var amqp = require('amqplib');

async function sendMessageToQueue(message, queue) {
  console.log('Enviando mensagem para fila: ', queue)
    
  try {
    const connection = await amqp.connect('amqp://127.0.0.1:5672');
    const channel = await connection.createChannel();
    await channel.assertQueue(queue, { durable: true, exclusive: false, autoDelete: false, arguments: null });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message), 'utf8'));
    console.log('Mensagem enviada com sucesso.');
    
  } catch (error) {
    console.error('Erro ao conectar ao RabbitMQ:', error);
    throw error;
  }

}

module.exports = { sendMessageToQueue };
