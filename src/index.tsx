import { render } from 'react-dom';
import { App } from './App';

// a função render recebe 2 parâmetros, sendo o primeiro, aquilo que eu quero
// exibir em tela e o segundo dentro de qual elemento que quero renderizar esta
// informação
render(<App />, document.getElementById('root'));
