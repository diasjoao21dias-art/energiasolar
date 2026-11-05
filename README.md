# Solar Energia Solar — site estático

Site responsivo, sem banco de dados e pronto para publicação como Static Site no Render.

## Publicar no Render
1. Extraia o ZIP e envie o conteúdo para um repositório GitHub.
2. No Render, escolha **New + → Static Site** e conecte o repositório.
3. Build Command: deixe em branco.
4. Publish Directory: `.` (raiz do projeto).
5. Faça o deploy.

## Domínio e compartilhamento
O site já está configurado para `https://solarenergia.onrender.com/`. O Open Graph aponta para `/assets/og-image.png` (imagem PNG 1200×630) e inclui metadados para WhatsApp/Facebook. Se o endereço público mudar, atualize `canonical`, `og:url`, `og:image`, Twitter image e sitemap em `index.html`/`sitemap.xml`.

Após publicar, valide a prévia em um depurador de compartilhamento e aguarde o cache do WhatsApp atualizar. O crawler precisa conseguir acessar a página e a imagem sem login.

## Conteúdo a confirmar antes de divulgar
- O telefone e WhatsApp usados são **(34) 9864-2806**, conforme o print.
- Endereço e nota Google foram inseridos conforme as informações fornecidas.
- O depoimento é o texto compartilhado pelo solicitante; confirme autorização e correspondência com uma avaliação pública antes de divulgar.
- A calculadora é ilustrativa (80% de economia potencial), não é proposta técnica nem promessa de economia. O cálculo real depende de tarifa, consumo, custos mínimos, regras da distribuidora e dimensionamento.
- Confirme horários, área efetiva de atendimento, serviços executados e dados de avaliações com a empresa.
