const path = require('path');
// html-webpack-plugin é um plugin para automatizar a injeção do js
// no html estático da aplicação.
const HtmlWebpackPlugin = require('html-webpack-plugin');
// o plugin React Refresh permite que os estados fiquem salvos no componente
// mesmo que haja alguma alteração no código, porém quando recarregado
// o comportamento ainda é padrão então os estados são zerados.
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  // para que seja possível identificarmos melhor um erro na aplicação
  // usamos uma ferramenta que vai ajudar a mostrar o lugar exato do
  // erro no código original
  devtool: isDevelopment ? 'eval-source-map' : 'source-map',
  // "entry" é o arquivo principal da aplicação
  // "__dirname" significa que eu quero pegar o diretório do aquivo
  // no qual o código esta sendo chamado
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  // aqui sera o arquivo que sera gerado, a saida do bundle
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    // no resolve extensions, indicamos ao webpack quais as extensões de arquivos
    // ele entendera
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  //Webpack auto-load
  devServer: {
    // dentro do contentBase deve ser passado onde está o diretório
    // do arquivo HTML da aplicação, o conteúdo estático.
    contentBase: path.resolve(__dirname, 'public'),
    hot: true,
  },
  plugins: [
    isDevelopment && new ReactRefreshWebpackPlugin(),
    //para passar algumas configs para o plugin é basta abrir um objeto
    new HtmlWebpackPlugin({
      // indica qual é o arquivo q vai geral o HTML
      template: path.resolve(__dirname, 'public', 'index.html'),
    }),
  ].filter(Boolean), //com filter(Boolean) irá retornar apenas valores truthy
  // Em "modules" é onde iremos controlar nossas importações e exportações
  module: {
    rules: [
      // deve ser criado um objeto para cada tipo de aquivo
      {
        // na propriedade "test" indicamos com uma expressão regular, qual o
        // tipo do aquivo
        test: /\.(j|t)sx$/,
        // por padrão os arquivos dentro da pasta node_modules já vem num formato
        // que o browser entende, então não é necessário que se converta nada
        // pois é a responsabilidade de cada biblioteca fazer sua própria build e converter
        // seu próprio código para que o browser entenda
        exclude: /node_modules/,
        // "use" é integração entre o babel e o webpack
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              isDevelopment && require.resolve('react-refresh/babel'),
            ].filter(Boolean),
          },
        },
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};
