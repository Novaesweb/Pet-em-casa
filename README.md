# Pet em Casa 🐾

Site responsivo para apresentar os serviços de banho, tosa e cuidados pet em Canoas, RS, com mostruário editável e painel de personalização.

## Arquivos

- `index.html`: página principal, serviços, mostruário e formulário de agendamento.
- `styles.css`: identidade visual responsiva.
- `script.js`: menu mobile, mostruário e fluxo de agendamento por WhatsApp.
- `admin.html`: painel de personalização.
- `admin.css`: estilos do painel.
- `admin.js`: editor de fotos, descrições e número de WhatsApp.

## Usar localmente

Abra `index.html` no navegador para visualizar o site e `admin.html` para abrir o painel.

## Atenção: limites da primeira versão do painel

O painel usa `localStorage`, então as alterações só ficam salvas naquele navegador e dispositivo. Não há login real, banco de dados nem sincronização entre dispositivos. O painel não é seguro para uso público/produção ainda. Para um painel administrativo completo, a próxima etapa é conectar autenticação segura e banco de dados (por exemplo, Supabase ou Firebase), validar permissões no servidor e armazenar imagens em um serviço de storage.

## WhatsApp

No painel, informe o número oficial no formato internacional, somente números, por exemplo, país + DDD + número. Não use o exemplo como número real. Ao enviar um formulário, o visitante será encaminhado ao WhatsApp para revisar e confirmar a mensagem. O pedido não fica confirmado até a loja responder.

## Antes de publicar

- Configurar e testar o número oficial de WhatsApp.
- Confirmar preços, horários, endereço/área de atendimento e serviços oferecidos.
- Trocar as fotos de demonstração pelas fotos autorizadas da loja.
- Conectar o painel a autenticação e banco de dados para sincronização e segurança.
- Testar em celular e computador.

**Nenhum deploy foi feito por esta alteração.**
