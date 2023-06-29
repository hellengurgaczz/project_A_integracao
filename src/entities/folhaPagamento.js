class FolhaPagamento {
    constructor(mes, ano, horas, valor, funcionario, bruto = null, irrf = null, inss = null, fgts = null, liquido = null) {
        this.mes = mes;
        this.ano = ano;
        this.horas = horas;
        this.valor = valor;
        this.funcionario = funcionario
        this.bruto = bruto;
        this.irrf = irrf;
        this.inss = inss;
        this.fgts = fgts;
        this.liquido = liquido;
      }
}

module.exports = { FolhaPagamento };