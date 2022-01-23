// LocalStorage
const clearLSbtn = document.getElementsByClassName("clearLocalStorage")[0];
clearLSbtn.addEventListener("click", clearLS) // почистить LS чтоб увидеть приветственное окно
function clearLS (){
  localStorage.clear();
}
window.addEventListener("DOMContentLoaded", checkLocalStorage) // запуск приветственного окна, если его не было
function checkLocalStorage (){
  if (!localStorage.getItem("hasGreetingModal")){
    localStorage.setItem("hasGreetingModal" , true)
    showGettingModal();
  }
  else{
    console.log("приветственное окно уже было")
  }
}

window.addEventListener("DOMContentLoaded", checkGoalsLocalStorage) // проверка содержимого LS
function checkGoalsLocalStorage (){
  if (localStorage.getItem("Название цели") && localStorage.getItem("Описание цели")){
    alert (localStorage.getItem("Название цели") + localStorage.getItem("Описание цели"))
  }
}


const modalBtnFirst = document.getElementsByClassName("modal1")[0];
const modalBtnSecond = document.getElementsByClassName("modal2")[0];
const modalContainer = document.getElementsByClassName("modal")[0];
const checkModalWork = document.getElementsByClassName("checkModalWork")[0];

// клик не по модальному окну закроет его
window.addEventListener("click", function(event) {
  if (event.target == modalContainer) { 
        document.querySelector(".modal").classList.toggle("none");
        document.querySelector(".modal").lastChild.remove();
      }
    })

class modalForm {
  constructor(title,text){
    this.text = text;
    this.title = title;
  }
  showModal(){
  document.querySelector(".modal").classList.toggle("none")
  const modalSection = document.createElement("div");
  modalSection.className = "modalSection"
  const modalTitle = document.createElement("h1") // title;
  modalTitle.innerText = this.title;
  modalTitle.className = "modalTitle";
  const modalText = document.createElement("h2") // text;
  modalText.innerText = this.text;
  modalText.className = "modalText";
  const modalClose = document.createElement("button") // close
  modalClose.innerText = "Close";
  modalClose.className = "btnCloseModal";
  modalClose.addEventListener("click", this.closeModal)
  modalSection.appendChild(modalTitle);
  modalSection.appendChild(modalText);
  modalSection.appendChild(modalClose);
  modalContainer.appendChild(modalSection);
  }

  closeModal(){ 
    document.querySelector(".modal").classList.toggle("none");
    document.querySelector(".modal").lastChild.remove();
  }

}

const GreetingModal = new modalForm ("Greeting Text", "Это просто приветственное окно которое больше не появиться после закрытия или обновления сраницы")
modalBtnFirst.addEventListener("click", showGettingModal)
function showGettingModal (){
  GreetingModal.showModal();
}

class MainModals extends modalForm {
  constructor(title,text, id){
    super(title,text);
  }
  showModal(){
    document.querySelector(".modal").classList.toggle("none")
    const modalSection = document.createElement("div");
    modalSection.className = "modalSection"
    const modalTitle = document.createElement("h1");
    modalTitle.innerText = this.title;
    modalTitle.className = "modalTitle";
    const modalTitleInput = document.createElement("input"); 
    modalTitleInput.className = "modalTitleInput";
    const modalText = document.createElement("h2");
    modalText.innerText = this.text;
    modalText.className = "modalText";
    const modalTextInput = document.createElement("input"); 
    modalTextInput.className = "modalTextInput";
    const modalSave = document.createElement("button");
    modalSave.innerText = "Save";
    modalSave.className = "btnSaveModal";
    modalSave.addEventListener("click", this.modalSave);
    const modalClose = document.createElement("button");
    modalClose.innerText = "Close";
    modalClose.className = "btnCloseModal";
    modalClose.addEventListener("click", this.closeModal);
    modalSection.appendChild(modalTitle);
    modalSection.appendChild(modalTitleInput);
    modalSection.appendChild(modalText);
    modalSection.appendChild(modalTextInput);
    modalSection.appendChild(modalSave);
    modalSection.appendChild(modalClose);
    modalContainer.appendChild(modalSection);
  }

    modalSave () {
      if (document.getElementsByClassName("modalTitleInput")[0].value === "" || document.getElementsByClassName("modalTextInput")[0].value === ""){
          alert ("Введите в поля текст цели и описание цели")
      }
      else {
      const infContainer = document.createElement("div");
      const divTitle = document.createElement("div");
      divTitle.innerText = document.getElementsByClassName("modalTitleInput")[0].value;
      const divText = document.createElement("div");
      divText.innerText = document.getElementsByClassName("modalTextInput")[0].value;
      const editBtn = document.createElement("button");
      editBtn.innerText = "Изменить";
      editBtn.className = "editBtn";
      // localStorage.setItem("Название цели", divTitle.innerText); // думал что получиться потом брать инф. из LS но значения перезаписываются
      // localStorage.setItem("Описание цели", divText.innerText); //  
      const deletetBtn = document.createElement("button");
      deletetBtn.innerText = "Удалить";
      deletetBtn.className = "deletetBtn";
      checkModalWork.appendChild(infContainer);
      infContainer.appendChild(divTitle);
      infContainer.appendChild(divText);
      infContainer.appendChild(editBtn);
      infContainer.appendChild(deletetBtn);
      document.querySelector(".modal").classList.toggle("none");
      document.querySelector(".modal").lastChild.remove();
      editBtn.addEventListener("click", ()=>{
        // return showModal()
        // как перевызвать модальное онко, т.е. должно открыться тоже самое окно только внутри inputTitle и inputText должен лежать введённый выше текст
        // мне же не нужно заново весь код переписывать из части showModal()?
      })
      deletetBtn.addEventListener("click", (e)=>{
        const item = e.target;
        const todo = item.parentElement;
        localStorage.removeItem("Название цели");
        localStorage.removeItem("Описание цели")
        todo.remove()})
      }
    }
}

const MainModal = new MainModals ("Введите названаие цели", "Опишите цель")
modalBtnSecond.addEventListener("click", showMaimModal)
function showMaimModal (){
  MainModal.showModal();
}