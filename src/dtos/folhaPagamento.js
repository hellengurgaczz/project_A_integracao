const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('folha-pagamento', 'root', null, {
    host: '127.0.0.1',
    dialect: 'mysql'
});

const FolhaPagamento = sequelize.define('folhas_pagamento', {
    mes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ano: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    horas: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    valor: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    bruto: {
      type: DataTypes.FLOAT
    },
    irrf: {
      type: DataTypes.FLOAT
    },
    inss: {
      type: DataTypes.FLOAT
    },
    fgts: {
      type: DataTypes.FLOAT
    },
    liquido: {
      type: DataTypes.FLOAT
    },
    funcionario: {
        type: DataTypes.JSON,
        allowNull: false,
    },
});

FolhaPagamento.sync()
    .then(() => {
        console.log('Tabela folha de pagamentos criada com sucesso!');
    })
    .catch((error) => {
        console.error('Erro ao criar tabela folha de pagamentos:', error);
    });

module.exports = { FolhaPagamento }