// Catturati
let contactsWrapper = document.querySelector("#contactsWrapper");
let mostraBtn = document.querySelector("#mostraBtn");
let chiudiBtn = document.querySelector("#chiudiBtn");
let aggiungiBtn = document.querySelector("#aggiungiBtn");
let deleteBtn = document.querySelector("#deleteBtn");
let modifyBtn = document.querySelector("#modifyBtn");
let icon = document.querySelectorAll(".icon");

document.addEventListener("DOMContentLoaded", () => {
  const cover = document.getElementById("cover");
  const rubrica = document.getElementById("rubrica");
  
  
  mostraBtn.addEventListener("click", () => {
    cover.hidden = true;
    rubrica.hidden = false;
    rubrica.classList.add("attiva");
  });
  
  chiudiBtn.addEventListener("click", () => {
    rubrica.hidden = true;
    rubrica.classList.remove("attiva");
    cover.hidden = false;
  });
  
});
const rubrica ={
  lista_contatti: [
    { contatto_name : "Mario" , phone_number: "1234567890" },
    { contatto_name : "Luigi" , phone_number: "0987654321" },
    { contatto_name : "Peach" , phone_number: "5551234567" },
    { contatto_name : "Daisy" , phone_number: "4445556666" },

  ],
  mostracontatti: function () {
    contactsWrapper.innerHTML = "";
    this.lista_contatti.forEach(contatto => {
      let div = document.createElement("div");
      div.classList.add("card-custom", "contatto");
      div.innerHTML = `<p class="lead mb-1">${contatto.contatto_name}</p>
                            <p class="mb-0 text-muted">${contatto.phone_number}</p>
                            <button class="icon btn btn-black p-0" aria-label="Elimina contatto">
                                <i  class="fa-solid fa-trash-can icon"></i>
                            </button> `;
      contactsWrapper.appendChild(div);
    });
    let icon = document.querySelectorAll(".icon");
icon.forEach((icona, index) => {
  icona.addEventListener("click", () => {
    this.lista_contatti.splice(index, 1);
    this.mostracontatti();
  });
});
  },
  lanciaInput: function () {
    aggiungiBtn.addEventListener("click", () => {
      let div = document.createElement("div");
      div.classList.add("input-group");
      div.innerHTML = `
        <input type="text" class="form-control mt-5 bginput" placeholder="Nome" aria-label="Nome">
        <input type="text" class="form-control mt-5 bginput" placeholder="Numero di telefono" aria-label="Numero di telefono">
        <button id="aggiungiContacts" class="btn btn-primary mt-5" type="button">Aggiungi</button>
      `;
      let aggiungiContacts = div.querySelector("#aggiungiContacts");
      aggiungiContacts.addEventListener("click", () => {
        let nome = div.querySelector('input[aria-label="Nome"]').value;
        let numero = div.querySelector('input[aria-label="Numero di telefono"]').value;
        if (!nome || !numero) {
          alert("Entrambi i campi sono obbligatori.");
          return;
        }
        this.lista_contatti.push({contatto_name: nome, phone_number: numero});
        this.mostracontatti();
        div.remove();
      });
      let inputArea = document.getElementById("inputarea");
      inputArea.innerHTML = ""; 
      inputArea.appendChild(div);
      
    });
  },
  lanciadeleteInput: function () {
    deleteBtn.addEventListener("click", () => {
      let div = document.createElement("div");
      div.classList.add("input-group");
      div.innerHTML = `
        <input type="text" class="form-control mt-5 bginput" placeholder="Nome" aria-label="Nome">
        <button id="CancellaContacts" class="btn btn-secondary mt-5" type="button">Cancella</button>
      `;
      let deleteContact = div.querySelector('input[aria-label="Nome"]');
      let deleteContacts = div.querySelector("#CancellaContacts");
      deleteContacts.addEventListener("click", () => {
        let nome = div.querySelector('input[aria-label="Nome"]').value;
        this.lista_contatti = this.lista_contatti.filter(contatto => contatto.contatto_name !== nome);
        this.mostracontatti();
        div.remove();
      });
      let inputArea = document.getElementById("inputarea");
      inputArea.innerHTML = "";
      inputArea.appendChild(div);

    });
  },
  creaApriModifica: function () {
    modifyBtn.addEventListener("click", () => {
      let inputArea = document.getElementById("inputarea");
      inputArea.innerHTML = "";

      let cercaDiv = document.createElement("div");
      cercaDiv.classList.add("input-group");
      cercaDiv.innerHTML = `
    <input type="text" class="form-control mt-5 bginput" placeholder="Nome" aria-label="Nome">
    <button id="cercaContacts" class="btn btn-success mt-5" type="button">Cerca</button>
  `;

  
  cercaDiv.querySelector("#cercaContacts").addEventListener("click", () => {
    let nomeDaCercare = cercaDiv.querySelector('input[aria-label="Nome"]').value.trim();

    if (!nomeDaCercare) {
      alert("Il campo nome è obbligatorio.");
      return;
    }

    
    let index = this.lista_contatti.findIndex(contatto => contatto.contatto_name.toLowerCase() === nomeDaCercare.toLowerCase());

    if (index === -1) {
      alert("Contatto non trovato.");
      return;
    }

    
    inputArea.innerHTML = "";
    let contatto = this.lista_contatti[index];

    let moddiv = document.createElement("div");
    moddiv.classList.add("input-group");
    moddiv.innerHTML = `
      <input type="text" class="form-control mt-5 bginput" aria-label="Nome" value="${contatto.contatto_name}">
      <input type="text" class="form-control mt-5 bginput" aria-label="Numero di telefono" value="${contatto.phone_number}">
      <button id="salvabtn" class="btn btn-success mt-5" type="button">Salva Modifiche</button>
    `;

    
    moddiv.querySelector("#salvabtn").addEventListener("click", () => {
      let nuovoNome = moddiv.querySelector('input[aria-label="Nome"]').value.trim();
      let nuovoNumero = moddiv.querySelector('input[aria-label="Numero di telefono"]').value.trim();

      if (!nuovoNome || !nuovoNumero) {
        alert("Tutti i campi sono obbligatori.");
        return;
      }

      
      this.lista_contatti[index] = { contatto_name: nuovoNome, phone_number: nuovoNumero };
      this.mostracontatti();
      inputArea.innerHTML = ""; 
    });

    inputArea.appendChild(moddiv);
  });

  inputArea.appendChild(cercaDiv);
});
},
};

rubrica.mostracontatti();
rubrica.lanciaInput();
rubrica.lanciadeleteInput();
rubrica.creaApriModifica(); 