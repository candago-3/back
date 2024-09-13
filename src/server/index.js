const mongoose = require('mongoose');
const app = require('../routes/index.js')

mongoose.connect('mongodb://127.0.0.1:27017/', {
   useNewUrlParser: true,
   useUnifiedTopology: true,
}).then(() => {
   console.log('Conectado ao MongoDB');
}).catch((error) => {
   console.error('Erro ao conectar ao MongoDB:', error);
});

const PORT = 3000;
app.listen(PORT, () => {
   console.log(`Servidor rodando na porta ${PORT}`);
});

