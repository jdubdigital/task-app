import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
  databaseURL: "https://realtime-database-615b6-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const listItemsInDB = ref(database, "listItems")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const itemListEl = document.getElementById("item-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(listItemsInDB, inputValue)
  
    clearInputFieldEl()
    
})

onValue(listItemsInDB, function (snapshot) {
  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val())

  console.log(snapshot.val())

  clearItemListEl()

  for (let i = 0; i < itemsArray.length; i++) {
    let currentItem = itemsArray[i]
    let currentItemID = currentItem[0]
    let currentItemValue = currentItem[1]

    appendItemToItemListEl(currentItem)
  }
  } else {
    itemListEl.innerHTML = ""
  }

})

function clearItemListEl() {
  itemListEl.innerHTML = ""
}

function clearInputFieldEl() {
  inputFieldEl.value = ""
}

function appendItemToItemListEl(item) {
  //itemListEl.innerHTML += `<li>${itemValue}</li>`
  let itemID = item[0]
  let itemValue = item[1]

  let newEl = document.createElement("li")

  newEl.textContent = itemValue

  newEl.addEventListener("click", function() {
    let exactLocationOfItemInDB = ref(database, `listItems/${itemID}`)

    remove(exactLocationOfItemInDB)
  })

  itemListEl.append(newEl)
}

var input = document.getElementById("input-field");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("add-button").click();
  }
});


