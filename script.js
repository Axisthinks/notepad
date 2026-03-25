if(localStorage.getItem("user")){
  showApp();
}

function login(){
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if(user === "" || pass === ""){
    alert("Enter details");
    return;
  }

  localStorage.setItem("user", user);
  showApp();
}

function showApp(){
  document.getElementById("loginPage").style.display = "none";
  document.getElementById("appPage").style.display = "block";

  document.getElementById("userText").innerText = "Welcome, " + localStorage.getItem("user");

  renderNotes();
}


function logout(){
  localStorage.removeItem("user");
  location.reload();
}


function getNotes(){
  const user = localStorage.getItem("user");
  return JSON.parse(localStorage.getItem(user + "_notes")) || [];
}

function saveNotes(notes){
  const user = localStorage.getItem("user");
  localStorage.setItem(user + "_notes", JSON.stringify(notes));
}

function addNote(){
  const input = document.getElementById("noteInput");
  const text = input.value.trim();

  if(text === ""){
    alert("Write something first!");
    return;
  }

  let notes = getNotes();

  notes.push(text);

  saveNotes(notes);

  input.value = "";

  renderNotes();
}

function deleteNote(index){
  let notes = getNotes();
  notes.splice(index,1);
  saveNotes(notes);
  renderNotes();
}

function renderNotes(){
  const container = document.getElementById("notesContainer");
  container.innerHTML = "";

  let notes = getNotes();

  notes.forEach((note,index)=>{
    container.innerHTML += `
      <div class="note">
        <button onclick="deleteNote(${index})">X</button>
        <p>${note}</p>
      </div>
    `;
  });
}

