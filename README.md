# Pet em Casa 🐾

Site responsivo para apresentar serviços de banho, tosa e cuidados pet em Canoas, RS.

## Arquivos

- `index.html`: estrutura e conteúdo da página.
- `styles.css`: identidade visual responsiva.
- `script.js`: menu mobile, validação do formulário e integração preparada para WhatsApp.

## Como visualizar

Abra `index.html` no navegador. Para desenvolvimento local, também pode usar a extensão Live Server do VS Code.

## Configuração necessária antes de receber agendamentos

No início de `script.js`, configure:

```js
const WHATSAPP_NUMBER = "55DDDNUMERO";
```

Use o número oficial completo com código do país e DDD, somente números. O valor acima é apenas um formato ilustrativo, não um número funcional.

Até esse número ser configurado, o formulário valida os campos, mas informa claramente que não enviou nem salvou a solicitação. O site ainda não possui banco de dados nem painel administrativo, e o envio pelo WhatsApp depende de a pessoa confirmar a mensagem no aplicativo.

## Antes de publicar

- Confirmar o WhatsApp oficial.
- Confirmar preços, horários e serviços oferecidos.
- Confirmar endereço/área de atendimento e políticas de agendamento.
- Testar o formulário em celular e computador.

**Este repositório não foi publicado nem conectado a um serviço de deploy por esta alteração.**
