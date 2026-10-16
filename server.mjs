/** Backend opcional do VisionCAD 2.0. Requer Node.js >= 20.
 * Instale em hospedagem com Node, separada do GitHub Pages.
 * Variáveis: OPENAI_API_KEY, ALLOWED_ORIGIN, PORT, OPENAI_MODEL.
 */
import http from 'node:http';
const port=Number(process.env.PORT||3000), origin=process.env.ALLOWED_ORIGIN||'';
const key=process.env.OPENAI_API_KEY||'',model=process.env.OPENAI_MODEL||'gpt-4.1-mini';
const replies=(res,code,payload)=>{res.writeHead(code,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store',...(origin?{'Access-Control-Allow-Origin':origin,'Vary':'Origin'}:{})});res.end(JSON.stringify(payload));};
function allowed(req){return Boolean(origin&&req.headers.origin===origin)}
function isPoint(p){return p&&Number.isFinite(p.x)&&Number.isFinite(p.y)&&Math.abs(p.x)<1e6&&Math.abs(p.y)<1e6}
function valid(s){if(!s||!['line','circle','poly','rect'].includes(s.type))return false;if(s.type==='line'||s.type==='rect')return isPoint(s.a)&&isPoint(s.b);if(s.type==='circle')return isPoint(s.c)&&Number.isFinite(s.r)&&s.r>0&&s.r<1e6;if(s.type==='poly')return Array.isArray(s.pts)&&s.pts.length>=2&&s.pts.length<=250&&s.pts.every(isPoint)&&typeof s.closed==='boolean';return false}
http.createServer(async(req,res)=>{
 if(req.method==='OPTIONS'){if(!allowed(req))return replies(res,403,{error:'Origin não permitido'});res.writeHead(204,{'Access-Control-Allow-Origin':origin,'Access-Control-Allow-Methods':'POST,OPTIONS','Access-Control-Allow-Headers':'Content-Type','Access-Control-Max-Age':'600'});return res.end()}
 if(req.url==='/health')return replies(res,200,{ok:true,aiConfigured:Boolean(key)});
 if(req.url!=='/api/analyze'||req.method!=='POST')return replies(res,404,{error:'Rota não encontrada'});
 if(!allowed(req))return replies(res,403,{error:'Origem não autorizada'});
 if(!key)return replies(res,503,{error:'Servidor sem OPENAI_API_KEY'});
 try{let body='';for await(const chunk of req){body+=chunk;if(body.length>5_000_000)throw Error('Imagem excede o limite de 5 MB')}
 const {image,mmPerPixel,width,height}=JSON.parse(body);
 if(typeof image!=='string'||!/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(image)||!Number.isFinite(mmPerPixel)||mmPerPixel<=0||mmPerPixel>1000||!Number.isFinite(width)||!Number.isFinite(height)||width<1||height<1||width>3000||height>3000)throw Error('Parâmetros inválidos');
 const instructions=`Analise a fotografia como auxiliar de desenho técnico 2D. Nunca invente geometrias invisíveis. Retorne exclusivamente JSON {"shapes":[...]} com propostas conservadoras, no máximo 20 objetos. Tipos válidos: line {type:"line",a:{x,y},b:{x,y}}, rect {type:"rect",a:{x,y},b:{x,y}}, circle {type:"circle",c:{x,y},r:number}, poly {type:"poly",pts:[{x,y}],closed:boolean}. Coordenadas em milímetros: origem no canto INFERIOR ESQUERDO da imagem, x = pixelX * ${mmPerPixel}; y = (${height} - pixelY) * ${mmPerPixel}. Largura da imagem ${width} pixels; altura ${height} pixels. Prefira poucas sugestões confiáveis; para furos circulares use circle. Sem comentários, sem markdown. Tudo será revisado manualmente. Caso a imagem seja ruim, retorne array vazio.`;
 const response=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${key}`},body:JSON.stringify({model,max_output_tokens:2200,input:[{role:'user',content:[{type:'input_text',text:instructions},{type:'input_image',image_url:image,detail:'high'}]}]})});
 if(!response.ok){let err=await response.text();throw Error(`Serviço de IA respondeu ${response.status}: ${err.slice(0,160)}`)}
 const data=await response.json();let t=(data.output||[]).flatMap(m=>m.content||[]).filter(c=>c.type==='output_text').map(c=>c.text).join('');let parsed=JSON.parse(t.replace(/^```(?:json)?\s*/,'').replace(/\s*```$/,''));return replies(res,200,{shapes:(Array.isArray(parsed.shapes)?parsed.shapes:[]).filter(valid).slice(0,20),warning:'Sugestões não medidas. Conferir antes da fabricação.'});
 }catch(e){return replies(res,400,{error:String(e.message||e).slice(0,250)})}
}).listen(port,()=>console.log(`VisionCAD IA API on port ${port}`));
