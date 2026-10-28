// servidor estático simples para pré-visualizar o protótipo (+ POST /save para gravar imagens geradas)
const http=require("http"),fs=require("fs"),path=require("path");
const root=path.resolve(__dirname,"..","prototipo");
const types={".html":"text/html; charset=utf-8",".svg":"image/svg+xml",".webp":"image/webp",".png":"image/png",".jpg":"image/jpeg",".xml":"application/xml",".txt":"text/plain; charset=utf-8",".js":"text/javascript",".css":"text/css"};
http.createServer((req,res)=>{
  if(req.method==="POST" && req.url.startsWith("/save?name=")){
    const name=decodeURIComponent(req.url.split("=")[1]).split(/[\/]/).filter(x=>x&&x!=="..").join("/");
    let b=[]; req.on("data",c=>b.push(c)); req.on("end",()=>{ { const out=path.join(root,"assets",name); fs.mkdirSync(path.dirname(out),{recursive:true}); fs.writeFileSync(out,Buffer.concat(b)); } res.end("ok "+name); }); 
    return;
  }
  let p=decodeURIComponent(req.url.split("?")[0]); if(p==="/") p="/camuzi-home.html"; else if(p.endsWith("/")) p+="index.html";
  if(p.startsWith("/_orig/")){ return fs.readFile(path.join(root,"..","fotos-originais",path.basename(p)),(e,d)=>{ if(e) return res.writeHead(404).end(); res.writeHead(200); res.end(d); }); }
  const f=path.join(root,p); if(!f.startsWith(root)) return res.writeHead(403).end();
  fs.readFile(f,(e,d)=>{ if(e) return res.writeHead(404).end("404"); res.writeHead(200,{"Content-Type":types[path.extname(f)]||"application/octet-stream"}); res.end(d); });
}).listen(5173,()=>console.log("http://localhost:5173"));
