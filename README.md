# VisionCAD V1.2 — Touch Edition

Publicação: extraia e envie TODOS os arquivos para a raiz do GitHub Pages (branch main). NÃO envie apenas ZIP.

## Novidades
- Barra fixa na tela do celular: Selecionar, Apagar, Editar, Nesting, Foto, Mais. A faixa de ferramentas de desenho continua rolável na horizontal.
- Exclusão de entidade: use Selecionar e depois Excluir seleção no menu, ou Apagar e toque diretamente na linha.
- Nesting: selecione uma entidade antes de abrir; repete apenas essa entidade; grade por envelopes retangulares (sem sobreposição). Confirme substituição do desenho. A peça com vários traços precisa ser transformada numa polilinha fechada para funcionar como uma única entidade. A moldura externa da chapa é desenhada como retângulo de referência e exportada junto: remova antes do corte.
- Foto: processamento local experimental de silhuetas com referência de distância, sem IA em nuvem. Resolução de análise elevada. Sem correção automática de perspectiva.
- Copiar, girar, espelhar, escalar e mover com números exatos.

## Limitações
- Não implementa o conjunto completo de ferramentas do AutoCAD 2026 (offset, trim, fillet, chamfer, layers, blocks, hatches, dimensions persistidas e outras).
- DXF restrito a linhas, círculos e polilinhas; DWG não compatível.
- Nesting usa retângulos envolventes, não nesting de formas irregulares.
- IA de visão computacional em nuvem ainda não integrada (exige serviço, credenciais e consentimento para upload de fotos).
- A vetorização por foto NÃO garante precisão dimensional para máquinas CNC. Meça e confira.

A versão anterior salva no navegador deve permanecer acessível; faça backup JSON/DXF antes de substituir arquivos.
