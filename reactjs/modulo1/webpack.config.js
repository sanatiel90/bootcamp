//webpack para automatizar transpilacao do js com babel

//usando lib path para navegar entre os diretorios fisicos da aplicacao, pois no windows tais diretorios precisariam ser acessados 
//com barra invertida \
const path = require('path')

//exportando config do webpack
module.exports = {
    //entry: informa onde esta o arq principal da app 
    entry: path.resolve(__dirname, 'src', 'index.js'),
    //output: informa onde ('path') será armazenado o arq de transpilacao e qual será o nome do arquivo ('filename')
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    //usando dev server para automaticamente recarregar o servidor com as alterações salvas 
    devServer: {
        //contentBase: pasta onde o bundle está localizado, q é onde o dev-server vai monitorar as modificacoes
        contentBase: path.resolve(__dirname, 'public')
    },
    module: {
        //regras para carregamento de arquivos
        rules: [
            {   //essa regra define q todos os arquivos js da aplicacao, com excecao dos que estão na pasta node_modules, vao ser carregados pelo babel-loader  
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {   //essa regra define q todos os arquivos scss (sass) vao ser carregados pelos loaders informados; com isso o arquivo .css pode ser importado nos arq js da aplicacao
                test: /\.scss$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                    { loader: "sass-loader" }
                ]
            }
        ]
    }
}