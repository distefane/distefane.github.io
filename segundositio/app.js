
const header=document.querySelector(".site-header");
const menuBtn=document.querySelector(".menu-toggle");
const menu=document.querySelector(".nav-menu");
function updateHeader(){if(header) header.classList.toggle("scrolled",window.scrollY>25)}
updateHeader();window.addEventListener("scroll",updateHeader,{passive:true});
if(menuBtn){menuBtn.addEventListener("click",()=>{const open=menu.classList.toggle("open");menuBtn.setAttribute("aria-expanded",String(open));});}
document.querySelectorAll(".nav-menu a").forEach(a=>a.addEventListener("click",()=>menu?.classList.remove("open")));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");observer.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
document.querySelectorAll("[data-year]").forEach(el=>el.textContent=new Date().getFullYear());
document.querySelectorAll("form[data-demo]").forEach(form=>form.addEventListener("submit",e=>{e.preventDefault();const out=form.querySelector(".form-status");if(out) out.textContent="Formulario listo para conectarse con tu correo o backend.";form.reset();}));
