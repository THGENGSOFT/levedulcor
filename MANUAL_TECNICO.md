# 📘 Manual Técnico - Leve Dulçor

**Versão:** 1.0.0
**Data:** Janeiro/2026
**Desenvolvedor:** Thiago Fagundes (THGENGSOFT)
**Repositório:** https://github.com/THGENGSOFT/levedulcor

---

## 1. Visão Geral
Projeto de Cardápio Digital para a confeitaria saudável **Leve Dulçor**.
O sistema é um **Web App Estático** (HTML/CSS/JS), focado em performance, SEO e conversão via WhatsApp.

### Stack Tecnológica
* **Frontend:** HTML5 Semântico, CSS3 (Flexbox/Grid), JavaScript (ES6+).
* **Hospedagem:** Netlify (CI/CD via GitHub).
* **Analytics:** Google Analytics 4.
* **Dependências:** Nenhuma (Zero Dependencies) - Código puro para máxima velocidade.

---

## 2. Identidade Visual

### Paleta de Cores
* 🎨 **Creme (Destaque):** `#ffd78f`
* ☕ **Marrom Café (Texto/Títulos):** `#766142`
* 🌸 **Salmão (Ações/Botões):** `#e8a69a`
* ☁️ **Fundo Suave:** `#fffcf5`

### Tipografia
* **Títulos:** Playfair Display (Serifa, elegante).
* **Textos:** Lato (Sans-serif, leitura fácil).

---

## 3. Estrutura de Arquivos

```text
LEVEDULCOR/
├── assets/                 # Imagens e Logotipos
│   ├── logoleve.png        # Logo Principal
│   └── produtos/           # Fotos organizadas por categoria
├── css/                    # Folhas de Estilo
│   ├── style.css           # Estilo da Home (Landing Page)
│   └── cardapio.css        # Estilo do Cardápio Digital
├── js/                     # Lógica do Sistema
│   ├── main.js             # Scripts da Home
│   └── cardapio.js         # Lógica do Carrinho, Zoom e Horários
├── index.html              # Página Principal (Home)
├── cardapio.html           # Página do Cardápio (Vendas)
└── MANUAL_TECNICO.md       # Este documento
4. Guia de Manutenção
A. Como Adicionar/Editar Produtos
Abra o arquivo cardapio.html. Cada produto é um bloco <div class="item">.

Para mudar o preço:

Localize data-price="25.90". Altere para o novo valor (use ponto para centavos).

Localize <span class="price">R$ 25,90</span>. Altere o texto visível.

Para mudar a foto:

Coloque a nova foto na pasta assets/produtos/....

Altere o caminho no src="..." da tag <img>.

B. Como Alterar Horários de Funcionamento
A lógica de "Aberto/Fechado" fica em js/cardapio.js.

Procure a função checkOpeningHours().

day (0=Dom, 1=Seg, ... 6=Sáb).

Os horários são calculados em minutos (Hora * 60 + Minutos).

Ex: 10:30 = 630 minutos.

Ex: 22:00 = 1320 minutos.

C. Como Atualizar Textos
Textos gerais (Sobre, Descrições) estão diretamente nos arquivos index.html e cardapio.html.

5. Integrações Externas
Google Analytics: ID configurado nos arquivos HTML (Tag G-XXXXXX).

WhatsApp: O número de destino está na variável WHATSAPP_NUMBER no início do arquivo js/cardapio.js.

6. Procedimento de Deploy
Qualquer alteração feita no código deve ser enviada para o GitHub:

git add .

git commit -m "Descrição da mudança"

git push

O Netlify detectará a mudança e atualizará o site automaticamente em segundos.


---

### Passo 2: Salvar e Enviar a Documentação

Com o arquivo criado e salvo, vamos enviá-lo para a nuvem.

```bash
git add MANUAL_TECNICO.md
git commit -m "Docs: Adicionando Manual Técnico do Projeto"
git push
Passo 3: Instruções para o Linux 🐧
Agora sim! Pode fechar o Mac. Quando você abrir o seu notebook Linux, siga estes passos exatos para baixar tudo (incluindo o manual):

Abra o terminal do Linux.

Navegue até onde quer guardar o projeto (ex: cd Documentos).

Clone o repositório (baixe da nuvem):

Bash

git clone https://github.com/THGENGSOFT/levedulcor.git
Entre na pasta:

Bash

cd levedulcor
Para imprimir a documentação: Você pode abrir o arquivo MANUAL_TECNICO.md no VS Code ou num editor de texto, ou até mesmo visualizar direto no site do GitHub e imprimir pelo navegador (Ctrl+P), que sai formatado bonitinho.