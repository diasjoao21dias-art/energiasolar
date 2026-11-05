const menuButton=document.querySelector('.menu-toggle');const nav=document.querySelector('.nav');
menuButton?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuButton?.setAttribute('aria-expanded','false');}));
const bill=document.getElementById('bill'),range=document.getElementById('bill-range'),saving=document.getElementById('saving'),current=document.getElementById('current'),percent=document.getElementById('percent'),annual=document.getElementById('annual'),fill=document.getElementById('bar-fill');
const money=n=>n.toLocaleString('pt-BR',{style:'currency',currency:'BRL',maximumFractionDigits:0});
function updateCalc(value){let amount=Math.max(0,Number(value)||0);let estimate=amount*.8;bill.value=amount||'';range.value=Math.min(5000,Math.max(100,amount));saving.textContent=money(estimate);current.textContent=money(amount);percent.textContent='até 80%';annual.textContent=money(estimate*12);fill.style.width=(amount?80:0)+'%';}
bill?.addEventListener('input',()=>updateCalc(bill.value));range?.addEventListener('input',()=>updateCalc(range.value));updateCalc(450);
document.getElementById('send-sim')?.addEventListener('click',()=>{const amount=Number(bill.value)||0;const msg=`Olá! Fiz uma simulação no site da Solar Energia Solar. Minha conta de energia fica em torno de ${money(amount)} por mês. Gostaria de receber uma avaliação e um orçamento para meu imóvel. Pode me orientar?`;window.open('https://wa.me/5534986422806?text='+encodeURIComponent(msg),'_blank','noopener');});
document.getElementById('year').textContent=new Date().getFullYear();
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
