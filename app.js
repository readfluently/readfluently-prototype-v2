let chapterData;

async function loadChapter(){
  const params = new URLSearchParams(window.location.search);
  const id = params.get("chapter");

  const res = await fetch("data.json");
  const data = await res.json();

  chapterData = data.chapters.find(c => c.id === id);

  document.getElementById("chapterTitle").innerText = chapterData.title;

  renderText();
  renderGlossary();
}

function renderText(){
  const wrap = document.getElementById("chapterText");

  wrap.innerHTML = "";

  chapterData.text.forEach(p=>{
    wrap.innerHTML += `<p>${p}</p>`;
  });

  wrap.innerHTML += `<h2>What You Will Learn in This Chapter</h2>`;

  wrap.innerHTML += `<ul class="objectives">`;
  chapterData.objectives.forEach(o=>{
    wrap.innerHTML += `<li>${o}</li>`;
  });
  wrap.innerHTML += `</ul>`;
}

function renderGlossary(){
  const wrap = document.getElementById("glossary");

  wrap.innerHTML = "<h2>Glossary</h2>";

  chapterData.glossary.forEach((g,i)=>{

    const k1=`g${i}p`;
    const k2=`g${i}s`;

    wrap.innerHTML += `
      <div class="glossCard">
      <h3>${i+1}. ${g.term} (${g.pos})</h3>

      <p><b>Definition:</b><br>${g.definition}</p>
      <p><b>Simple Meaning:</b><br>${g.simple}</p>
      <p><b>Example Sentence:</b><br>${g.example}</p>

      <label><b>Paraphrase (write in your own words):</b></label>
      <textarea data-k="${k1}">${localStorage.getItem(k1)||""}</textarea>

      <label><b>Use the word ${g.word} in your own sentence:</b></label>
      <textarea data-k="${k2}">${localStorage.getItem(k2)||""}</textarea>
      </div>
    `;
  });

  document.querySelectorAll("textarea").forEach(t=>{
    t.addEventListener("input",()=>{
      localStorage.setItem(t.dataset.k,t.value);
    });
  });
}

/* READ ALOUD (ONLY READ AREA) */
document.getElementById("btnRead").onclick=()=>{
  const text=document.getElementById("readArea").innerText;
  const u=new SpeechSynthesisUtterance(text);
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
};

document.getElementById("btnStop").onclick=()=>{
  speechSynthesis.cancel();
};

loadChapter();
