import { Grupo, Preparacao, Produto , ProdPrep } from "./models"; // importação dos modelos
import fs from 'fs';
import readline from 'node:readline';
import connect from "./models/connection";

connect(); //função que conecta ao mongodb e inicia o servidor

// //importando tabela grupo----------------------------------------------------------------------------------

// var rl = readline.createInterface({
//     input: fs.createReadStream('./src/Taco-Grupo.csv'),
//     output: process.stdout,
//     terminal: false
// }) // cria a interface para leitura do arquivo assyncrona

// let x: number = 0; // variável necessária para pular a primeira linha de cabeçalho do arquivo CSV

// rl.on('line', function (linha: any) { // função que lê linha a linha do arquivo e as colaca na variável linha
//     if (x > 0) { // só processa se não for a primeira linha
//         var l = linha.split(';'); // quebra a linha nos pontos-e-vírgula gerando um array com cada campo/coluna
//         console.log(l);
//         var grupo = new Grupo({ // criar um objeto Schema Grupo e popula seus campos/colunas
//             gru_id: l[0],
//             gru_descricao: l[1],
//         });
//         grupo.save(); // salva o objeto no BD
//     }
//     x++; // incrementa a varíavel de controle de linha
// })

// rl.close; // fecha a função rl para o arquivo não constar como aberto pelo SO



// // importando tabela preparacao ------------------------------------------------------------------------

// var rl = readline.createInterface({
//     input: fs.createReadStream('./src/Taco-Preparacao.csv'),
//     output: process.stdout,
//     terminal: false
// }) // cria a interface para leitura do arquivo assyncrona

// let y: number = 0; // variável necessária para pular a primeira linha de cabeçalho do arquivo CSV

// rl.on('line', function (linha: any) { // função que lê linha a linha do arquivo e as colaca na variável linha
//     if (y > 0) { // só processa se não for a primeira linha
//         var l = linha.split(';'); // quebra a linha nos pontos-e-vírgula gerando um array com cada campo/coluna
//         console.log(l);
//         var preparacao = new Preparacao({ // criar um objeto Schema Preparacao e popula seus campos/colunas
//             pre_id: l[0],
//             pre_descricao: l[1],
//         });
//         preparacao.save(); // salva o objeto no BD
//     }
//     y++; // incrementa a varíavel de controle de linha
// })

// rl.close; // fecha a função rl para o arquivo não constar como aberto pelo SO



// // importando tabela produtos ------------------------------------------------------------------------

// var rl = readline.createInterface({
//   input: fs.createReadStream('./src/Taco-Produto.csv'),
//   output: process.stdout,
//   terminal: false
// }) // cria a interface para leitura do arquivo assyncrona

// let w: number = 0; // variável necessária para pular a primeira linha de cabeçalho do arquivo CSV

// rl.on('line', async function (linha: any) { // função que lê linha a linha do arquivo e as colaca na variável linha
//   if (w > 0) { // só processa se não for a primeira linha
//     var l = linha.split(';'); // quebra a linha nos pontos-e-vírgula gerando um array com cada campo/coluna
//     console.log(l);
//      var doc = await Grupo.findOne({ gru_id: l[2] }).exec(); // busca o grupo específico na coleção Grupo através do ID original
// //        console.log(doc);
//      if (doc != null) { // processa apenas caso tenha encontrado o documento
//          var produto = new Produto({ // criar um objeto Schema Produto e popula seus campos/colunas
//              grupo: doc._id, // aloca o _id gerado pelo Mongoose na coleção Grupo
//              pro_id: l[0],
//              pro_descricao: l[1],
//              pro_grupo: l[2]
//          });
//          produto.save(); // salva o objeto no BD
//      }
//   }
//   w++; // incrementa a varíavel de controle de linha
// })

// rl.close; // fecha a função rl para o arquivo não constar como aberto pelo SO



// importando tabela prodprep --------------------------------------------------------------------

var rl = readline.createInterface({
  input: fs.createReadStream('./src/Taco-ProdPrep.csv'),
  output: process.stdout,
  terminal: false
}) // cria a interface para leitura do arquivo assyncrona

let z: number = 0; // variável necessária para pular a primeira linha de cabeçalho do arquivo CSV

rl.on('line', async function (linha: any) { // função que lê linha a linha do arquivo e as colaca na variável linha
  if (z > 0) { // só processa se não for a primeira linha
    const l = linha.split(';'); // Divide a linha nos pontos-e-vírgula
    // console.log(l);
      // Busca as referências de Produto e Preparacao no BD
      const produtoDoc = await Produto.findOne({ pro_id: l[0] }).exec();
      const preparacaoDoc = await Preparacao.findOne({ pre_id: l[1] }).exec();

      if (produtoDoc && preparacaoDoc) {
        // Cria um novo documento ProdPrep utilizando as referências e dados do CSV
        const prodPrep = new ProdPrep({
          produto: produtoDoc._id,
          preparacao: preparacaoDoc._id,
          energia: parseFloat(l[2]),
          proteina: parseFloat(l[3]),
          lipidio: parseFloat(l[4]),
          carboidrato: parseFloat(l[5]),
          fibra: parseFloat(l[6]),
          colesterol: parseFloat(l[7]),
          agsaturado: parseFloat(l[8]),
          agmono: parseFloat(l[9]),
          agpoli: parseFloat(l[10]),
          aglinoleico: parseFloat(l[11]),
          aglinolenico: parseFloat(l[12]),
          agtranstotal: parseFloat(l[13]),
          acucartotal: parseFloat(l[14]),
          acucaradicao: parseFloat(l[15]),
          calcio: parseFloat(l[16]),
          magnesio: parseFloat(l[17]),
          manganes: parseFloat(l[18]),
          fosforo: parseFloat(l[19]),
          ferro: parseFloat(l[20]),
          sodio: parseFloat(l[21]),
          sodioadicao: parseFloat(l[22]),
          potassio: parseFloat(l[23]),
          cobre: parseFloat(l[24]),
          zinco: parseFloat(l[25]),
          selenio: parseFloat(l[26]),
          retinol: parseFloat(l[27]),
          vitamina_a: parseFloat(l[28]),
          tiamina: parseFloat(l[29]),
          riboflavina: parseFloat(l[30]),
          niacina: parseFloat(l[31]),
          niacina_ne: parseFloat(l[32]),
          piridoxina: parseFloat(l[33]),
          cobalamina: parseFloat(l[34]),
          folato: parseFloat(l[35]),
          vitamina_d: parseFloat(l[36]),
          vitamina_e: parseFloat(l[37]),
          vitamina_c: parseFloat(l[38]),
        });

        await prodPrep.save(); // Salva o documento no MongoDB
        console.log(`Document for produto ${l[0]} and preparacao ${l[1]} saved successfully.`);
      }
  }
  z++; // incrementa a varíavel de controle de linha
})

rl.close; // fecha a função rl para o arquivo não constar como aberto pelo SO

