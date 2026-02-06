import{a as g,S as h,i as c}from"./assets/vendor-xpOxgMII.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const b="https://pixabay.com/api/",L="54018968-920e73cf119f2d437152d8f97";async function S(n,r=1){return(await g.get(b,{params:{key:L,q:n,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:40}})).data}const a=document.querySelector(".gallery"),d=document.querySelector(".loader"),q=new h(".gallery a",{captionsData:"alt",captionDelay:250});function w(n){if(!a)return;const r=n.map(({webformatURL:o,largeImageURL:i,tags:e,likes:t,views:s,comments:m,downloads:y})=>`
    <li class="gallery-item">
      <a href="${i}">
        <img class="gallery-image" src="${o}" alt="${e}" />
      </a>
      <div class="info">
        <p><b>Likes:</b> ${t}</p>
        <p><b>Views:</b> ${s}</p>
        <p><b>Comments:</b> ${m}</p>
        <p><b>Downloads:</b> ${y}</p>
      </div>
    </li>
  `).join("");a.insertAdjacentHTML("beforeend",r),q.refresh()}function v(){a&&(a.innerHTML="")}function P(){d.classList.remove("is-hidden")}function $(){d.classList.add("is-hidden")}const f=document.querySelector(".form");f.addEventListener("submit",O);async function O(n){n.preventDefault();const r=n.target.elements["search-text"].value.trim();if(!r){c.warning({message:"Please enter a search query",position:"topRight"});return}v(),P();try{const o=await S(r);if(o.hits.length===0){c.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}w(o.hits)}catch{c.error({message:"Something went wrong",position:"topRight"})}finally{$()}}const l=document.querySelector("label");l.classList.add("form-label");const x=document.querySelector("input");x.classList.add("form-input");const p=document.querySelector("button");p.classList.add("form-btn");const u=document.createElement("div");u.classList.add("form-container");f.insertBefore(u,l);u.append(l,p);
//# sourceMappingURL=index.js.map
