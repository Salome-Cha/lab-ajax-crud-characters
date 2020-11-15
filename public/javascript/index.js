const charactersAPI = new APIHandler('http://localhost:8000');


// GET ALL 
window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function (event) {

    charactersAPI.getFullList().then((response) => {

      const charactersList = response.data;
      console.log("Here is the list of characters:", charactersList)
      let listItems = ''
      charactersList.forEach(character => {
        listItems+= `
        <div class="character-info">
          <div class="name"> Character Name: ${character.name} </div>
          <div class="occupation">Character Occupation: ${character.occupation}</div>
          <div class="cartoon">Is a Cartoon? : ${character.cartoon}</div>
          <div class="weapon">Character Weapon: ${character.weapon}</div>
        </div>     
        `
    })

    document.getElementsByClassName('characters-container')[0].innerHTML = listItems;

  })
  });

  // FETCH ONE
  document.getElementById('fetch-one').addEventListener('click', function (event) {
   
    const id = document.getElementById('character-id').value;
    
    charactersAPI.getOneRegister(id)
    .then((response) => {
      const oneCharacter = response.data;
      console.log('Response from api for one character', oneCharacter);
      
       
    let oneItem = '';
    oneItem = `
      <div class="character-info">
        <div class="name"> Character Name: ${oneCharacter.name} </div>
        <div class="occupation">Character Occupation: ${oneCharacter.occupation}</div>
        <div class="cartoon">Is a Cartoon? : ${oneCharacter.cartoon}</div>
        <div class="weapon">Character Weapon: : ${oneCharacter.weapon}</div>
      </div>     
      `

      document.getElementsByClassName('characters-container')[0].innerHTML = oneItem;
  })
  .catch((error) => {
    console.log('An error occured while retrieving the data for one character', error);
  })
})

// DELETE ONE
  document.getElementById('delete-one').addEventListener('click', function (event) {
  
  const id = document.getElementById('delete-one-input').value;
    console.log(id)
    charactersAPI.deleteOneRegister(id)
    //.then(() => {
  //    console.log("Here is the list of remaining characters:", charactersList)
  
  // document.getElementsByClassName('characters-container')[0].innerHTML = listItems;
  
 // });
});

  // EDIT ONE
  document.getElementById('edit-character-form').addEventListener('submit', function (event) {
     // We could have done with id selector:  querySelector("#edit-character-form #name")
    event.preventDefault();
     const id = document.getElementById('update-id').value 

      const name = document.getElementById('edit-name').value;
      const occupation = document.getElementById('edit-occupation').value;
      const weapon = document.getElementById('edit-weapon').value;
      const cartoon = document.getElementById('edit-cartoon').checked;
      
      let updatedCharacter = {name, occupation, weapon, cartoon};
   
      
      charactersAPI.updateOneRegister(id, updatedCharacter).then((data) => {
        document.getElementsByClassName('characters-container')[0].innerHTML = listItems;
    }).catch((error) => {
      console.log('An error occured while posting a new character', error);
      })

  });


  // CREATE ONE
  document.getElementById('new-character-form').addEventListener('submit', function (event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const occupation = document.getElementById('occupation').value;
    const weapon = document.getElementById('weapon').value;
    const cartoon = document.getElementById('cartoon').checked;  

    const newCharacter = {
        name,
        occupation,
        weapon,
        cartoon
    }

    charactersAPI.createOneRegister(newCharacter)
    .then(() => {
          document.getElementById('new-character-form').reset();
          document.getElementsByClassName('characters-container')[0].innerHTML = listItems;
     }) 
    .catch((error) => {
    console.log('An error occured while posting a new character', error);
    })
  });
});
