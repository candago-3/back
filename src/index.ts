import { Grupo, Preparacao, Produto } from "./models"; // importação dos modelos
import fs from 'fs';
import readline from 'node:readline';
import connect from "./models/connection";

connect();

// importando tabela grupo
var rl = readline.createInterface({
    input: fs.createReadStream('./src/Taco-Grupo.csv'),
    output: process.stdout,
    terminal: false
}) // cria a interface para leitura do arquivo assyncrona

let x: number = 0; // variável necessária para pular a primeira linha de cabeçalho do arquivo CSV

rl.on('line', function (linha: any) { // função que lê linha a linha do arquivo e as colaca na variável linha
    if (x > 0) { // só processa se não for a primeira linha
        var l = linha.split(';'); // quebra a linha nos pontos-e-vírgula gerando um array com cada campo/coluna
        var grupo = new Grupo({ // criar um objeto Schema Grupo e popula seus campos/colunas
            gru_id: l[0],
            gru_descricao: l[1],
        });
        grupo.save(); // salva o objeto no BD
    }
    x++; // incrementa a varíavel de controle de linha
})

rl.close; // fecha a função rl para o arquivo não constar como aberto pelo SO

// importando tabela preparacao
var rl = readline.createInterface({
    input: fs.createReadStream('./src/Taco-Preparacao.csv'),
    output: process.stdout,
    terminal: false
}) // cria a interface para leitura do arquivo assyncrona

let y: number = 0; // variável necessária para pular a primeira linha de cabeçalho do arquivo CSV

rl.on('line', function (linha: any) { // função que lê linha a linha do arquivo e as colaca na variável linha
    if (y > 0) { // só processa se não for a primeira linha
        var l = linha.split(';'); // quebra a linha nos pontos-e-vírgula gerando um array com cada campo/coluna
        console.log(l);
        var preparacao = new Preparacao({ // criar um objeto Schema Preparacao e popula seus campos/colunas
            pre_id: l[0],
            pre_descricao: l[1],
        });
        preparacao.save(); // salva o objeto no BD
    }
    y++; // incrementa a varíavel de controle de linha
})

rl.close; // fecha a função rl para o arquivo não constar como aberto pelo SO

// importando tabela produtos

const data = fs.readFileSync('./src/Taco-Produto.csv',
    { encoding: 'utf8', flag: 'r' }).toString().split("\r\n"); // lê e fecha o arquivo CSV de Produtos, 
                                                              // colocando os dados na variável data linha a linha

let w: number = 0; // variável necessária para pular a primeira linha de cabeçalho do arquivo CSV

data.forEach(async linha => { // faz a leitura de cada linha da variável data
    if (w > 0) { // só processa se não for a primeira linha
        var l = linha.split(';'); // quebra a linha nos pontos-e-vírgula gerando um array com cada campo/coluna
//        console.log(l);
        var doc = await Grupo.findOne({ gru_id: l[2] }).exec(); // busca o grupo específico na coleção Grupo através do ID original
//        console.log(doc);
        if (doc != null) { // processa apenas caso tenha encontrado o documento
            var produto = new Produto({ // criar um objeto Schema Produto e popula seus campos/colunas
                grupo: doc._id, // aloca o _id gerado pelo Mongoose na coleção Grupo
                pro_id: l[0],
                pro_descricao: l[1],
                pro_grupo: l[2]
            });
            produto.save(); // salva o objeto no BD
        }
    }
    w++; // incrementa a varíavel de controle de linha
}); // fecha data.forEach