# 🤖 Bot de Ofertas e Carrinho Shopee 🔥

Automatize a divulgação de ofertas relâmpago e incentive seus usuários a finalizarem compras diretamente no carrinho da Shopee.

Este bot funciona integrado com o Telegram e possui uma API HTTP via Express, além de dois jobs automáticos:

* 🚀 **Ofertas Relâmpago da Shopee** (com cupons fictícios)
* 🛒 **Lembrete de Carrinho** (direto para o carrinho da Shopee)

---

## 📦 Tecnologias Utilizadas

* Node.js + TypeScript
* Telegraf (API do Telegram)
* Express (API HTTP)
* CORS
* dotenv (Gerenciamento de variáveis de ambiente)

---

## ⚙️ Funcionalidades

* ✅ Envio automático de mensagens de ofertas com:

  * Categoria aleatória
  * Porcentagem de desconto aleatória
  * Cupom fictício aleatório (estilo marketing)
* ✅ Envio de lembretes direcionando o usuário ao carrinho da Shopee
* ✅ API HTTP rodando junto, preparada para expansão (Webhooks, Admin, Dashboard, etc.)
* ✅ Logs no console para rastrear atividades
* ✅ Gerenciamento de desligamento seguro (Graceful Shutdown)

---

## 🚀 Como Rodar Localmente

### 1️⃣ Clone o projeto

```bash
git clone git@github.com:rafaelcitario/telegram-oferbot.git
cd telegram-oferbot
```

### 2️⃣ Instale as dependências

```bash
npm install
```

### 3️⃣ Configure o arquivo `.env`

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
BOT_TOKEN=seu_token_do_telegram
PORT=3000
```

> 🔑 Você pode gerar seu token criando um bot com o [@BotFather](https://t.me/BotFather) no Telegram.

### 4️⃣ Rode o projeto

```bash
npx ts-node server.ts
```

> ✔️ Isso vai iniciar:

* O servidor Express na porta definida (`http://localhost:3000`)
* O bot do Telegram
* O job de **ofertas relâmpago** (a cada 2 horas)
* O job de **lembrete de carrinho** (a cada 90 minutos)

---

## 🗺️ Estrutura de Pastas

```bash
/http
 ├── lib          # Instância do bot
 └── routes       # Rotas da API HTTP
/jobs              # Jobs automáticos (ofertas, carrinho)
/utils             # Funções utilitárias (random, cupom)
server.ts          # Ponto de entrada (Express + Bot + Jobs)
.env               # Variáveis de ambiente
```

---

## 🔗 Exemplo de Mensagem no Telegram

**OFERTA RELÂMPAGO NA SHOPEE**
💰 Até **65% OFF** em **Eletrônicos**
🔗 👉 ACESSE AQUI AGORA 👈
🎟️ **CUPOM:** `A1B2C3AF`
⚠️ Estoque limitado. Corra antes que acabe!

---

## 🛠️ Melhorias Futuras (To-Do)

* [ ] Painel Web (Admin Dashboard)
* [ ] Webhooks para monitoramento de eventos da Shopee
* [ ] Integração com bancos de dados (Histórico de mensagens, analytics)
* [ ] Deploy com Docker e PM2
* [ ] Sistema de logs externo (Logtail, Loggly ou AWS CloudWatch)

---

## 💼 Licença

MIT — Faça bom uso e compartilhe.

---

## 🧠 Observação Profissional

> Este bot é um projeto de automação **não oficial** da Shopee. Use com responsabilidade, dentro dos termos de uso da plataforma e do Telegram.

---

## ✍️ Autor

Desenvolvido por **Rafael Citario 👑**
🔗 [Seu LinkedIn](https://linkedin.com/in/rafaelcitario)
