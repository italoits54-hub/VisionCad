# VisionCAD V1 — Touch Edition

Editor CAD 2D independente, voltado a operação touchscreen e desenhos para CNC.

## Publicar pelo GitHub (celular)

1. Crie um repositório novo no GitHub, preferencialmente `visioncad`.
2. Envie **todos os 6 arquivos** diretamente para a **raiz do repositório** (não dentro de uma pasta chamada `visioncad`): `index.html`, `app.js`, `styles.css`, `manifest.webmanifest`, `icon.svg`, `sw.js`. Opcionalmente envie este `README.md`.
3. Em **Settings > Pages > Build and deployment**, selecione **Deploy from a branch**, `main` e `/ (root)`. Salve.
4. Abra o endereço indicado em Pages. Se ainda aparecer a página antiga, faça recarga do Safari e confirme que os arquivos estão na raiz.
5. Safari (iPhone): Compartilhar > Adicionar à Tela de Início.

**Não** edite ou renomeie `index.html`. Os caminhos são relativos para também funcionar em `usuario.github.io/visioncad/`.

## Recursos
- Linha, retângulo, círculo, polilinha, medição, selecionar/mover/apagar.
- Zoom com dois dedos, pan e encaixe na grade.
- Abrir DXF ASCII 2D básico e JSON de projeto.
- Exportar DXF em mm e projeto JSON, com salvamento local automático.
- Funciona offline após primeiro carregamento bem-sucedido (service worker), sujeito às regras do navegador.

## Limitações
- DWG **não** suportado nesta versão.
- DXF importado: LINE, CIRCLE, ARC (convertido em segmentos), LWPOLYLINE; geometria complexa e entidades 3D não suportadas.
- Arquivos e desenho ficam no aparelho, sem sincronização em nuvem.
- Faça conferência de medidas e contornos no CAM antes de cortar; não usar sem validação em máquina.


## VisionCAD V1.1 — Touch + geometria + nesting + foto

Novidades:
- **Medidas exatas:** botão 📏 Medidas para criar linha por comprimento/ângulo, retângulo por dimensões, círculo por diâmetro e polígono regular.
- **Nesting básico:** botão ▦ Nesting posiciona cópias de entidades por suas caixas envolventes em uma chapa definida em milímetros. Usa ordenação por tamanho, filas e rotação opcional de 90°. **Não é true-shape nesting** e não garante otimização nem tratamento de peças compostas com furos internos.
- **Foto → DXF experimental:** botão 📷 Foto aceita câmera/galeria. Toque em **dois pontos** de distância conhecida e digite o comprimento real; o editor detecta contraste com o fundo e extrai contornos fechados. Recomenda-se foto ortogonal de peça plana, luz uniforme e fundo contrastante. Não corrige perspectiva e não substitui metrologia. Verifique as cotas, o fechamento e o DXF no CAM antes de usinar.

## Publicação
Extraia o ZIP e envie os **oito arquivos** à raiz do repositório (incluindo `advanced.js`). O GitHub Pages deve apontar para `main` e `/ (root)`. Se uma instalação antiga estiver em cache, feche e reabra o aplicativo ou atualize a página.
