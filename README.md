# VisionCAD 2.0 — CAD Inteligente Touch

Primeira implementação experimental para navegador, especialmente iPhone/Android, sem compilação. Compatível com GitHub Pages.

## Publicação no celular

1. Extraia o ZIP.
2. No seu repositório do GitHub, envie **todos os arquivos da raiz do projeto**, substituindo os da versão anterior: `index.html`, `styles.css`, `app.js`, `advanced.js`, `v2.js`, `manifest.webmanifest`, `icon.svg`, `sw.js` e este `README.md`.
3. Em Settings → Pages, configure `main` e `/ (root)`.
4. Reabra o link do GitHub Pages, feche e reabra o atalho do iPhone caso a versão anterior esteja em cache.
5. NÃO publique `api/.env` ou nenhuma chave de API. A pasta `api` é somente um exemplo para hospedar num servidor Node separado; não precisa enviá-la para GitHub Pages.

## Uso

- **Selecionar** e tocar em linhas ou círculos para editar e apagar apenas a entidade desejada.
- **Medidas exatas:** menu lateral → Medidas. Cria linha, círculo, retângulo e polígono com dimensões digitadas.
- **Peças compostas:** selecione uma linha/contorno/furo e clique **+ Peça**; repita para todas as entidades da peça; depois **Nesting da peça**. Se o desenho inteiro é uma peça, use **Peça inteira**.
- **Nesting:** utiliza envelopes (retângulos envolventes) com rotação opcional de 90º. Agrupa todas as entidades escolhidas, inclusive os furos. Os envelopes não colidem; ainda NÃO faz encaixe irregular ou otimização máxima da chapa. O limite físico da chapa é um guia visual e NÃO é exportado como linha de corte.
- **Assistente foto:** pressione **IA foto**, importe/tire a foto, marque 2 pontos de uma medida conhecida, informe mm, pressione **Analisar local**. Revise as sugestões na lista; desmarque as incorretas e só então pressione **Aplicar**.
- **Online opcional:** menu → **Configurar IA** para informar a URL HTTPS do seu backend, depois botão **Pedir sugestões online** no assistente. Não utiliza IA online enquanto não houver servidor e chave configurados.
- **Salvar:** faça backup do projeto JSON e do DXF antes de testar nesting e importações.

## Arquitetura

- `app.js` — motor básico 2D, SVG, toques, import/export DXF (suporte parcial), salvamento local.
- `advanced.js` — desenhos por medidas exatas, ferramentas geométricas iniciais, algoritmo local de contornos binários.
- `v2.js` — camada V2 de agrupamento, nesting composto, revisão assistida da foto, cliente da API.
- `api/server.mjs` — backend Node OPCIONAL de proxy à API multimodal; somente no servidor ficam credenciais. CORS limitado à origem configurada. Requer proteção adicional de autenticação, limites de requisição e antiabuso antes de disponibilizar como serviço público.

## Limitações importantes

- Suporte DXF parcial: não suporta todos os tipos de entidade, blocos, textos, arcos complexos e bulges; DWG nativo ainda não.
- Foto local usa visão computacional básica (segmentação), **não** um modelo de IA. A IA online é opcional e depende de backend configurado.
- Medida de referência sozinha não corrige perspectiva/curvatura/oclusão e não garante precisão de corte. Meça geometrias críticas com instrumentos.
- Não oferece **todos os comandos do AutoCAD 2026**. Trim, Offset, Fillet, Chamfer, blocos, cotas associativas e nesting irregular profissional ainda estão pendentes.
- Salvo localmente neste navegador; não há sincronização automática entre PC e iPhone.

## Servidor IA opcional (implantação separada)

Hospede a pasta `api` num serviço Node com HTTPS. Configure no servidor as variáveis indicadas em `api/.env.example`, principalmente `OPENAI_API_KEY` e `ALLOWED_ORIGIN` (origem do seu GitHub Pages, sem caminho). Inicie com `npm start`. No VisionCAD, digite a URL HTTPS do backend em **Configurar IA**. Nunca coloque a chave no `index.html`, no JavaScript público ou no GitHub.

Projeto experimental: não usar DXF gerado sem inspeção de escala, contorno fechado, tolerâncias e percurso de corte.
