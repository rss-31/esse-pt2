const FL=[["Morango","#E8467C"],["Pistache","#A8D5A2"],["Chocolate belga","#6B3F34"],["Baunilha","#F6E3B4"],["Limão siciliano","#F2E65D"],["Doce de leite","#C98A4B"],["Coco","#F3F0EA"],["Mirtilo","#5B6CC9"]];
const SZ=[["Pote 1 L",28,"Ideal para casa e pequenos pedidos."],["Balde 5 L",120,"Para lanchonetes e festas."],["Balde 10 L",225,"Para sorveterias e eventos."],["Caixa com 24 picolés",96,"Sabores sortidos ou escolhidos."]];
const brl=v=>v.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
const $=id=>document.getElementById(id);
const pic=c=>`<svg viewBox="0 0 100 100" role="img" aria-hidden="true"><path d="M24 56h52l-7 38a6 6 0 0 1-6 5H37a6 6 0 0 1-6-5z" fill="#fff" stroke="#E0B9C6" stroke-width="2"/><path d="M28 70h44M31 84h38" stroke="#F3C6D3" stroke-width="3"/><circle cx="50" cy="38" r="27" fill="${c}"/><path d="M24 50q4 14 9 0q4 12 9 0q5 14 10 0q5 12 10 0q5 14 10 0" fill="${c}"/><ellipse cx="40" cy="26" rx="8" ry="5" fill="#fff" opacity=".35" transform="rotate(-25 40 26)"/><circle cx="50" cy="9" r="6" fill="#D6264F"/><path d="M50 4q4-6 9-6" stroke="#5C7A3A" stroke-width="2" fill="none"/></svg>`;
$("flavors").innerHTML=FL.map(f=>`<div class="fl">${pic(f[1])}<b>${f[0]}</b></div>`).join("");
$("sizes").innerHTML=SZ.map(s=>`<div class="sz"><h3>${s[0]}</h3><div class="price">${brl(s[1])}</div><p>${s[2]}</p></div>`).join("");
$("f").innerHTML=FL.map((f,i)=>`<option value="${i}">${f[0]}</option>`).join("");
$("s").innerHTML=SZ.map((s,i)=>`<option value="${i}">${s[0]} – ${brl(s[1])}</option>`).join("");
let cart=[];
function render(){
  $("list").innerHTML=cart.length?cart.map((c,i)=>`<li><span>${c.q}× ${SZ[c.s][0]} de ${FL[c.f][0]}</span><span>${brl(c.q*SZ[c.s][1])} <button type="button" data-i="${i}" aria-label="Remover item">Remover</button></span></li>`).join(""):'<li class="empty">Nenhum item ainda. Adicione um sabor ao lado.</li>';
  const tot=cart.reduce((a,c)=>a+c.q*SZ[c.s][1],0);
  $("total").textContent=cart.length?"Total: "+brl(tot):"";
  let t="Olá, Gelatto! Quero fazer um pedido:\n"+cart.map(c=>`- ${c.q}x ${SZ[c.s][0]} de ${FL[c.f][0]}`).join("\n");
  t+=`\nTotal estimado: ${brl(tot)}\nNome: ${$("n").value||"-"}\nReceber: ${$("t").value}\nEndereço/obs: ${$("a").value||"-"}`;
  $("send").href=cart.length?"https://wa.me/5541999999999?text="+encodeURIComponent(t):"#pedido";
}
$("add").onclick=()=>{const q=Math.max(1,parseInt($("q").value)||1);cart.push({f:+$("f").value,s:+$("s").value,q});$("msg").textContent="";render()};
$("list").onclick=e=>{const i=e.target.dataset.i;if(i!==undefined){cart.splice(+i,1);render()}};
["n","t","a"].forEach(id=>$(id).addEventListener("input",render));
$("send").onclick=e=>{if(!cart.length){e.preventDefault();$("msg").textContent="Adicione pelo menos um item para enviar o pedido."}};
render();
