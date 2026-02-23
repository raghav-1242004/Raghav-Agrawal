
document.addEventListener("DOMContentLoaded",()=>{

/* Typing */
const roles=["Frontend Developer","Python Developer","Software Engineer","Data Analytics"];
let i=0,j=0,current="",deleting=false;

function type(){
const el=document.querySelector(".typing");
if(!el) return;

current=roles[i];
el.textContent=current.substring(0,j);

if(!deleting && j++===current.length){
deleting=true;
setTimeout(type,1000);
return;
}

if(deleting && j--===0){
deleting=false;
i=(i+1)%roles.length;
}

setTimeout(type,deleting?60:120);
}
type();

/* Trailing Cursor */
document.addEventListener("mousemove", e=>{

const trail=document.createElement("div");
trail.className="trail";

trail.style.left=e.clientX+"px";
trail.style.top=e.clientY+"px";

document.body.appendChild(trail);

setTimeout(()=>{
trail.remove();
},600);

});

});


/* ===== CERTIFICATE SLIDER ===== */

document.addEventListener("DOMContentLoaded",()=>{

const track = document.querySelector(".cert-track");
const leftBtn = document.querySelector(".arrow.left");
const rightBtn = document.querySelector(".arrow.right");

let position = 0;
const slideWidth = 330;

rightBtn.addEventListener("click",()=>{
position -= slideWidth;

if(position < -(track.scrollWidth - 900)){
position = 0;
}

track.style.transform = `translateX(${position}px)`;
});

leftBtn.addEventListener("click",()=>{
position += slideWidth;

if(position > 0){
position = -(track.scrollWidth - 900);
}

track.style.transform = `translateX(${position}px)`;
});


/* ===== VIEW POPUP ===== */

const modal = document.getElementById("certModal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".view-btn").forEach(btn=>{
btn.addEventListener("click",function(){
modal.style.display="block";
modalImg.src=this.getAttribute("data-img");
});
});

closeBtn.onclick=function(){
modal.style.display="none";
};

window.onclick=function(e){
if(e.target==modal){
modal.style.display="none";
}
};

});

//* ===== FINAL SLIDER FIX ===== */

document.addEventListener("DOMContentLoaded", function () {

const track = document.querySelector(".fp-track");
const slides = document.querySelectorAll(".fp-slide");
const next = document.querySelector(".fp-arrow.right");
const prev = document.querySelector(".fp-arrow.left");

let index = 0;
const total = slides.length;

function updateSlider(){
track.style.transform = "translateX(-" + index * 100 + "%)";
}

/* NEXT */

next.addEventListener("click", function(){
index++;
if(index >= total){
index = 0;
}
updateSlider();
});

/* BACK */

prev.addEventListener("click", function(){
index--;
if(index < 0){
index = total - 1;
}
updateSlider();
});

});

/* Circle animation glow pulse */

document.querySelectorAll(".circle").forEach(c=>{
c.animate(
[{boxShadow:"0 0 10px #0ef"},
 {boxShadow:"0 0 30px #0ef"}],
{duration:1500,iterations:Infinity,direction:"alternate"}
);
});
/* ===== CODE PRACTICE SLIDER ===== */

document.addEventListener("DOMContentLoaded",()=>{

const track=document.querySelector(".cp-track");
const cards=document.querySelectorAll(".cp-card");
const next=document.querySelector(".cp-arrow.right");
const prev=document.querySelector(".cp-arrow.left");

let index=0;

const cardWidth = cards[0].offsetWidth + 30;

function update(){
track.style.transform=`translateX(-${index * cardWidth}px)`;
}

/* NEXT */

next.onclick=()=>{
if(index < cards.length-1){
index++;
update();
}
};

/* PREV */

prev.onclick=()=>{
if(index>0){
index--;
update();
}
};

});

// ==================================================== Navbar ================================================

// ================= HAMBURGER MENU =================

const hamburger = document.querySelector(".hamburger");
const menuOverlay = document.querySelector(".menu-overlay");

// OPEN MENU
hamburger.onclick = () => {
    menuOverlay.classList.add("active");
};

// ================= CLOSE ON LINK CLICK =================

// Select all menu links
const navLinks = document.querySelectorAll(".overlay-menu a");

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        menuOverlay.classList.remove("active");
    });
});

// CLOSE IF CLICK OUTSIDE MENU

menuOverlay.addEventListener("click", (e) => {
    if (e.target === menuOverlay) {
        menuOverlay.classList.remove("active");
    }
});

// CLOSE MENU BY CROSS
closeMenu.onclick = () => {
    menuOverlay.classList.remove("active");
};

// ===============================
// PAGE BACK / LOAD RESET FIX
// ===============================

window.addEventListener("pageshow", function () {

  // Overlay remove
  const overlay = document.querySelector(".menu-overlay");
  if (overlay) overlay.classList.remove("active");

  // Scroll enable
  document.body.style.overflow = "auto";

});


// ===============================
// MENU AUTO CLOSE
// ===============================

document.querySelectorAll(".overlay-menu a").forEach(link => {
  link.addEventListener("click", () => {
    document.querySelector(".menu-overlay").classList.remove("active");
  });
});



