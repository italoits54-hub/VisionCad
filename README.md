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
