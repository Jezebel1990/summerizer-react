# GEN Ai - Gerador de Resumos

![Mobile](/public/mobile.png)
![Login](/public/login.png)
![Desktop](/public/desktop.png)

Bem-vindo ao GEN Ai, um aplicativo web desenvolvido para gerar resumos de textos de maneira simples, rápida e eficiente. Este projeto utiliza uma integração com inteligência artificial para proporcionar resumos otimizados e relevantes para os seus textos.

## Funcionalidades

- **Gerar Resumos:** Insira um texto ou envie um PDF para gerar resumos automaticamente.
- **Histórico de Resumos:** Visualize, copie ou exclua resumos gerados anteriormente.
- **Upload de PDF:** Carregue arquivos PDF para extrair o texto e gerar resumos diretamente.
- **Interface Responsiva:** Layout otimizado para dispositivos móveis e desktops.
- **Cópia de Texto:** Copie os resumos com um único clique.

## Tecnologias Utilizadas

- **Frontend**: React, Tailwind CSS
- **Backend**: Integração com API de inteligência artificial Hugging Face para processamento de texto
- **Gerenciamento de Estado**: useState, useEffect
- **PDF Upload**: Manipulação de arquivos para extração de texto


## Como Executar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/Jezebel1990/summerizer-react.git
   ```

2. Acesse o diretório do projeto:
  ```bash
  cd summerizer-react
  ```

 3. Instale as dependências:
  ```bash
   npm install
  ```

4. Inicie o servidor de desenvolvimento:
  ```bash
   npm run dev
  ```

 5. Abra o navegador e acesse:
  ```bash
  http://localhost:5173
  ```

## Estrutura de Pastas 
| Caminho                     | Descrição                                                                 |
|-----------------------------|---------------------------------------------------------------------------|
| `SUMMERIZER-REACT/`         | Diretório raiz do projeto, contendo todos os arquivos e pastas principais.|
| ├── `src/`                 | Pasta principal do frontend, onde estão os componentes, páginas e serviços.|
| │   ├── `components/`      | Contém os componentes reutilizáveis da interface.                         |
| │   │   ├── `Header/`      | Componente responsável pelo cabeçalho do aplicativo.                      |
| │   │   ├── `Navbar/`      | Componente para navegação entre as páginas.                               |
| │   │   ├── `TextareaForm/`| Componente para entrada de texto para gerar resumos.                      |
| │   │   ├── `History/`     | Componente para exibir o histórico de resumos gerados.                    |
| │   │   ├── `PdfButton/`   | Componente para upload de arquivos PDF.                                   |
| │   │   └── `Footer/`      | Componente que exibe o rodapé do aplicativo.                              |
| │   ├── `pages/`           | Contém as páginas do aplicativo.                                          |
| │   │   └── `LoginPage.tsx`| Página de login do usuário.                                               |
| │   ├── `services/`        | Contém a lógica de comunicação com APIs.                                  |
| │   │   └── `apiService.ts`| Arquivo para integração com a API Huggingface e outras APIs.              |
| │   ├── `assets/`          | Armazena arquivos estáticos como imagens e ícones.                       |
| │   └── `App.tsx`          | Componente raiz do React que organiza e renderiza o aplicativo.           |
| ├── `server/`              | Pasta onde está localizada a lógica do backend.                          |
| │   └── `server.ts`        | Configuração e execução do servidor.                                      |
| ├── `public/`              | Armazena arquivos públicos acessíveis diretamente, como o `index.html`.  |
| ├── `package.json`         | Lista dependências, scripts e configurações do projeto.                   |
| └── `README.md`            | Arquivo de documentação com informações sobre o projeto.                  |



## Licença
Este projeto está licenciado sob a licença MIT. Consulte o arquivo LICENSE para mais informações.

Feito com ♥ por [Jezebel Guedes](https://www.linkedin.com/in/jezebel-guedes/) 👋 Entre em contato!