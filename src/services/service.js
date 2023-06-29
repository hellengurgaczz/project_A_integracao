const sendMessageToQueueService = require('../utils/services/sendMessageToQueue');
const { FolhaPagamento } = require('../dtos/folhaPagamento');

function calcIRRF(salario_bruto) {
    if(salario_bruto <= 1903.98) {
        return 0
    } else if(salario_bruto >= 1903.99 && salario_bruto <= 2826.65) {
        return ((salario_bruto * 0.075) - 142.80) 
    } else if(salario_bruto >= 2826.66 && salario_bruto <= 3751.05){
        return ((salario_bruto * 0.15) - 354.80)
    } else if(salario_bruto >= 3751.06 && salario_bruto <= 4664.68) {
        return ((salario_bruto * 0.225) - 636.13)
    } else {
        return ((salario_bruto * 0.275) - 869.36)
    }
}

function calcINSS(salario_bruto) {
    if(salario_bruto <= 1693.72) {
        return salario_bruto * 0.08
    } else if(salario_bruto >= 1693.73 && salario_bruto <= 2822.90) {
        return salario_bruto * 0.09
    } else if(salario_bruto >= 2822.91 && salario_bruto <= 5645.80){
        return salario_bruto * 0.11
    } else {
        return 621.03
    }
}

async function sendMessage(message, queue) {
    try {
      sendMessageToQueueService.sendMessageToQueue(message, queue);
      return 'Mensagem enviada para a fila!';
    } catch (error) {
      throw new Error('Falha ao enviar mensagem para a fila.');
    }
}

async function calcFolhas() {
    const folhas = await FolhaPagamento.findAll()

    for (const folha of folhas) {
        if (folha.bruto == null) {
            folha.bruto = folha.horas * folha.valor;
            folha.irrf = calcIRRF(folha.bruto);
            folha.inss = calcINSS(folha.bruto);
            folha.fgts = folha.bruto * 0.08;
            folha.liquido = folha.bruto - folha.irrf - folha.inss;
      
            await folha.save();
            await sendMessage(folha, 'folhas-calculadas')
        }
    }
  
    return 'Folhas calculadas e enviadas à fila!';
}

async function create(req, _) {
    const { mes, ano, horas, valor, funcionario } = req.body;
      try {
          const folha = await FolhaPagamento.create({
              mes, ano, horas, valor, funcionario
          });
          calcFolhas()
          return folha;
      } catch ( error ) {
          console.log(error)
          throw new Error('Falha ao cadastrar folha de pagamento.')
      }
  }

module.exports = { create, calcFolhas };
