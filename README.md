# 🐾 Receituário de Controle Especial Veterinário

Sistema web gratuito e responsivo para geração de receituários de controle especial em PDF. Ideal para médicas e médicos veterinários que precisam emitir receitas com formatação oficial, válida para uso em farmácias e drogarias.

---

## ✨ Funcionalidades

- ✅ Geração de receituário conforme modelo oficial
- 📄 Exportação em PDF com layout A4 pronto para impressão
- 🐶 Cadastro completo de dados do paciente (animal)
- 👩‍⚕️ Preenchimento de dados da veterinária ou veterinário
- 👁️ Visualização em tempo real (preview do receituário)
- 🎨 Layout responsivo com cores suaves e compatibilidade com impressão
- ⚙️ Funciona 100% no navegador — sem necessidade de login

---

## 🔧 Tecnologias Utilizadas

| Tecnologia | Função |
|------------|--------|
| [Next.js](https://nextjs.org/) | Framework React com suporte SSR/SPA |
| [Tailwind CSS](https://tailwindcss.com/) | Estilização moderna e responsiva |
| [html2canvas](https://www.npmjs.com/package/html2canvas) | Captura de screenshot da preview |
| [jsPDF](https://www.npmjs.com/package/jspdf) | Conversão da imagem para PDF |
| [Geist Font](https://vercel.com/fonts) | Tipografia minimalista e acessível |

---

## 🖥️ Pré-visualização

![Preview Receituário](public/preview.png)

> O PDF gerado segue o padrão exigido para controle especial com assinatura, identificação de fornecedor e comprador, e duas vias (retenção + orientação).

---

## 🚀 Como usar localmente

### 1. Clone o repositório

```bash
git clone https://github.com/marco0antonio0/APP-RECEITUARIO-DE-CONTROLE-ESPECIAL.git
cd APP-RECEITUARIO-DE-CONTROLE-ESPECIAL
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Rode o servidor local

```bash
npm run dev
```

Acesse via navegador: [http://localhost:3000](http://localhost:3000)

---

## 🛡️ Privacidade

> Nenhum dado é enviado para servidores. A aplicação roda inteiramente no navegador. Todos os dados permanecem apenas no dispositivo do usuário.

---