SkillUpPlus 2030+

O SkillUpPlus 2030+ é um aplicativo móvel desenvolvido em React Native com Expo, projetado para auxiliar na requalificação profissional de trabalhadores e estudantes, alinhando-se aos Objetivos de Desenvolvimento Sustentável (ODS) da ONU. O projeto foi criado como parte da Global Solution da disciplina de Mobile Development & IoT.

Visão Geral do Projeto

O aplicativo oferece uma plataforma de aprendizado com cursos focados em habilidades para o futuro do trabalho, como Inteligência Artificial, Sustentabilidade e Soft Skills. A interface é projetada para ser intuitiva e motivadora, incentivando o progresso contínuo do usuário.

Funcionalidades Principais

O SkillUpPlus 2030+ implementa uma série de funcionalidades para proporcionar uma experiência de usuário completa e fluida:

•
Autenticação de Usuário: Telas de Login e Cadastro com validação de formulário. A autenticação é simulada e os dados do usuário são persistidos localmente usando AsyncStorage.

•
Navegação Híbrida:

•
Stack Navigator: Para o fluxo inicial de autenticação (Login e Cadastro).

•
Drawer Navigator: Menu lateral para acesso a seções como Perfil e Configurações.

•
Tab Navigator: Navegação principal entre as telas de Home, Cursos e Progresso.



•
Tela Home: Apresenta um resumo do progresso do usuário, cursos recomendados e informações sobre o projeto.

•
Tela de Cursos: Lista os cursos disponíveis com a funcionalidade de busca por nome e filtro por categoria.

•
Tela de Progresso: Exibe o progresso geral e detalhado de cada curso, além de conquistas (gamificação).

•
Tela de Perfil: Mostra as informações do usuário.

•
Tela de Configurações: Permite ao usuário ajustar as preferências do aplicativo.

Estrutura do Projeto

O projeto utiliza uma estrutura de diretórios baseada em expo-router, onde a navegação é definida pela organização dos arquivos no diretório app/.

Plain Text


/SkillUpPlus20301_project
├── app/                  # Arquivos de rota e telas
│   ├── (drawer)/         # Rotas do menu lateral
│   │   ├── (tabs)/       # Rotas das abas inferiores
│   │   ├── profile.tsx
│   │   └── settings.tsx
│   ├── login.tsx
│   └── signup.tsx
├── assets/               # Imagens e outros recursos
├── components/           # Componentes reutilizáveis (vazio no projeto atual)
├── constants/            # Constantes globais (vazio no projeto atual)
├── hooks/                # Hooks customizados (AuthContext.tsx)
├── screenshots/          # Capturas de tela da aplicação
├── DOCUMENTACAO_APP.md   # Documentação original detalhada
├── package.json          # Dependências e scripts do projeto
└── ...


Tecnologias Utilizadas

O projeto foi construído com as seguintes tecnologias e bibliotecas:

•
React Native: Framework para desenvolvimento de aplicativos móveis multiplataforma.

•
Expo: Plataforma e conjunto de ferramentas para facilitar o desenvolvimento com React Native.

•
Expo Router: Para roteamento e navegação baseada em arquivos.

•
TypeScript: Superset do JavaScript que adiciona tipagem estática.

•
React Navigation: Biblioteca para gerenciamento de navegação (Stack, Drawer, Tabs).

•
AsyncStorage: Para persistência de dados localmente no dispositivo.

•
React Native Vector Icons: Para utilização de ícones na interface.

•
ESLint: Para garantir a qualidade e a padronização do código.

Como Executar o Projeto

Para executar o projeto em seu ambiente de desenvolvimento, siga os passos abaixo:

1.
Instale as dependências:

2.
Inicie o servidor de desenvolvimento do Expo:

3.
Execute em um emulador ou dispositivo físico:

•
Pressione a para abrir no emulador Android.

•
Pressione i para abrir no simulador iOS.

•
Escaneie o QR code com o aplicativo Expo Go em seu dispositivo móvel.

Login para Testes

Para facilitar os testes, você pode usar as seguintes credenciais na tela de login:

•
Email: teste@exemplo.com

•
Senha: 123456

Observação: A validação da senha não é rigorosa, o foco da autenticação é na demonstração do fluxo de navegação e persistência do email do usuário.

Contribuições

Este projeto foi desenvolvido para fins acadêmicos. Contribuições não são esperadas, mas o código está disponível para consulta e aprendizado.

