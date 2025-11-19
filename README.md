🚀 SkillUpPlus 2030+

Plataforma de Requalificação Digital para o Futuro do Trabalho


O SkillUpPlus 2030+ é um aplicativo móvel desenvolvido em React Native com Expo Router, projetado para ser uma solução inovadora na requalificação profissional (reskilling). O projeto está alinhado aos Objetivos de Desenvolvimento Sustentável (ODS) da ONU, focando em:

•
ODS 4: Educação de Qualidade

•
ODS 8: Trabalho Decente e Crescimento Econômico

•
ODS 9: Indústria, Inovação e Infraestrutura

•
ODS 10: Redução das Desigualdades

Desenvolvido como parte da Global Solution (GS) da disciplina de Mobile Development & IoT, o aplicativo demonstra a aplicação de conceitos avançados de desenvolvimento móvel.




✨ Funcionalidades em Destaque

Funcionalidade
Detalhes da Implementação
Autenticação
Telas de Login (login.tsx) e Cadastro (signup.tsx) com validação de formulário (e-mail, senha, campos obrigatórios).
Persistência de Dados
Uso de AsyncStorage para simular a persistência do estado de login e dados básicos do usuário.
Navegação Híbrida
Combinação de Stack, Drawer e Tab Navigation para um fluxo de usuário intuitivo e hierárquico.
Gerenciamento de Cursos
Tela de Cursos com busca em tempo real e filtro por categoria utilizando o componente Picker.
Acompanhamento de Progresso
Tela dedicada ao progresso (progress.tsx) com resumo geral, detalhes por curso (incluindo barras de progresso customizadas) e seção de Conquistas (gamificação).
Interface Moderna
Design limpo e responsivo, utilizando MaterialCommunityIcons para ícones e componentes nativos.





📸 Capturas de Tela

Confira a interface do aplicativo em ação. As imagens estão localizadas na pasta screenshots/.

Fluxo de Autenticação
Navegação Principal

Tela de Cadastro
Tela Home

Tela de Cursos
Tela de Progresso


🛠️ Tecnologias e Dependências

O projeto foi construído utilizando o ecossistema Expo/React Native:

•
React Native (v0.81.5)

•
Expo (v54.0.24)

•
Expo Router (v6.0.15)

•
TypeScript

•
@react-native-async-storage/async-storage (Persistência)

•
@react-native-picker/picker (Seleção de opções)

•
@react-navigation/* (Stack, Drawer, Tabs)



⚙️ Como Executar o Projeto

Para rodar o SkillUpPlus 2030+ em seu ambiente de desenvolvimento, siga os passos abaixo:

1.
Clone o repositório:

2.
Instale as dependências:
  npm install

3.
Inicie o servidor de desenvolvimento do Expo:
npm start (vai ser gerado uma url, cole no app do Expo)

•
Use o aplicativo Expo Go no seu celular para escanear o QR Code.

•
Ou pressione a para Android / i para iOS no terminal.

5.
Acesse o aplicativo:
Login: teste@exemplo.com
senha: 1234

não há uma específica, com tanto que contenha o @ e o .com o login vai acontecer
e ficará no perfil seus detalhes



📂 Estrutura de Diretórios

A estrutura de roteamento segue o padrão do Expo Router:

Plain Text


.
├── app/
│   ├── (drawer)/
│   │   ├── (tabs)/       # Home, Cursos, Progresso
│   │   ├── profile.tsx   # Perfil
│   │   └── settings.tsx  # Configurações
│   ├── login.tsx         # Tela de Login
│   └── signup.tsx        # Tela de Cadastro
├── hooks/
│   └── AuthContext.tsx   # Contexto de Autenticação
├── screenshots/          # Imagens de demonstração
└── package.json

<img width="359" height="687" alt="image" src="https://github.com/user-attachments/assets/a0316827-cc3f-4968-8143-93d85235de6b" />
<img width="362" height="694" alt="image" src="https://github.com/user-attachments/assets/6c23480b-cedd-464c-aee8-670784e8a6a9" />
<img width="296" height="690" alt="image" src="https://github.com/user-attachments/assets/e2cb6a6c-8ced-4956-9079-d5b802cc69c1" />
<img width="364" height="684" alt="image" src="https://github.com/user-attachments/assets/2bd347d4-f3d0-4e13-bae7-37a925214283" />
<img width="362" height="684" alt="image" src="https://github.com/user-attachments/assets/7d54d2fb-7a0e-4b88-979a-f79809cd59d8" />
<img width="358" height="686" alt="image" src="https://github.com/user-attachments/assets/6e1abdd4-6ba1-41d1-9f4b-8a9459a5dcf0" />





