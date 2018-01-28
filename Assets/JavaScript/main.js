
var characterSelected = false;


var defenderSelected = false;


var character = {};

var defender = {};


var enemiesDefeated = 0;

gameOver = false;

var Vader = {
  name: "Vader",
  health: 120,
  baseAttack: 8,
  attack: 8
};

var Yoda = {
  name: "Yoda",
  health: 100,
  baseAttack: 5,
  attack: 5
};

var Bob = {
  name: "Bob",
  health: 150,
  baseAttack: 20,
  attack: 20
};

var Chewy = {
  name: "Chewy",
  health: 180,
  baseAttack: 25,
  attack: 25
};

function initializeCharacter(chosenCharacter) {
  character.name = chosenCharacter.name;
  character.health = chosenCharacter.health;
  character.baseAttack = chosenCharacter.baseAttack;
  character.attack = chosenCharacter.attack;
}

function initializeDefender(chosenDefender) {
  defender.name = chosenDefender.name;
  defender.health = chosenDefender.health;
  defender.baseAttack = chosenDefender.baseAttack;
  defender.attack = chosenDefender.attack;
}

function moveToEnemies() {
  $(".available-character").removeClass("available-character").addClass("enemy-character");
  $("#enemies-available").append($(".enemy-character"));
}


function resetGame() {
  
  $("#Vader-characterr").children(".health").html(Vader.health);
  $("#Yoda-character").children(".health").html(Yoda.health);
  $("#Bob-character").children(".health").html(Bob.health);
  $("#Chewy-character").children(".health").html(Chewy.health);

  $(".character-image").removeClass("chosen-character enemy-character defender-character").addClass("available-character");
  var available = $(".available-character").show();
  $("#characters-available").html(available);

  $("#game-message").empty();
  $("#restart").hide();

  characterSelected = false;
  defenderSelected = false;
  enemiesDefeated = 0;
  gameOver = false;

  character = {};
  defender = {};
}


$(document).ready(function() {

  
  $("#restart").hide();

  $("#Vader-character").on("click", function () {
    console.log("Vader is selected");

    
    if(characterSelected == false) {
      $("#game-message").empty();

      
      initializeCharacter(Vader);
      characterSelected = true;

      
      $("#Vader-character").removeClass("available-character").addClass("chosen-character");
      $("#chosen-character").append(this);

      moveToEnemies();
    } else if ((characterSelected == true) && (defenderSelected == false)) {
    
      if($("#Vader-character").hasClass("enemy-character")) {
        $("#game-message").empty();

        
        initializeDefender(Vader);
        defenderSelected = true;

       
        $("#Vader-character").removeClass("enemy-character").addClass("defender-character");
        $("#defender-section").append(this);
      }
    }
  });

  $("#Yoda-character").on("click", function () {
    console.log("Yoda is selected");

    
    if(characterSelected == false) {
      $("#game-message").empty();

      
      initializeCharacter(Vader);
      characterSelected = true;

      
      $("#Yoda-character").removeClass("available-character").addClass("chosen-character");
      $("#chosen-character").append(this);

      
      moveToEnemies();
    } else if ((characterSelected == true) && (defenderSelected == false)) {
      
      if($("#Yoda-character").hasClass("enemy-character")) {
        $("#game-message").empty();

        
        initializeDefender(Yoda);
        defenderSelected = true;

         
        $("#Yoda-character").removeClass("enemy-character").addClass("defender-character");
        $("#defender-section").append(this);
      }
    }
  });

  $("#Bob-character").on("click", function () {
    console.log("Bob-characterb is selected");

    
    if(characterSelected == false) {
      $("#game-message").empty();

       
      initializeCharacter(Bob);
      characterSelected = true;
 
      $("#Bob-character").removeClass("available-character").addClass("chosen-character");
      $("#chosen-character").append(this);

   
      moveToEnemies();
    } else if ((characterSelected == true) && (defenderSelected == false)) {
      
      if($("#Bob-character").hasClass("enemy-character")) {
        $("#game-message").empty();

        
        initializeDefender(Bob);
        defenderSelected = true;

        
        $("#Bob-character").removeClass("enemy-character").addClass("defender-character");
        $("#defender-section").append(this);
      }
    }
  });

  $("#Chewy-character").on("click", function () {
    console.log("Chewy is selected");

    if(characterSelected == false) {
      $("#game-message").empty();

      
      initializeCharacter(Chewy);
      characterSelected = true;

      
      $("#Chewy").removeClass("available-character").addClass("chosen-character");
      $("#chosen-character").append(this);

      
      moveToEnemies();
    } else if ((characterSelected == true) && (defenderSelected == false)) {
     
      if($("#Chewy-character").hasClass("enemy-character")) {
        $("#game-message").empty();

        
        initializeDefender(Chewy);
        defenderSelected = true;

       
        $("#Chewy-character").removeClass("enemy-character").addClass("defender-character");
        $("#defender-section").append(this);
      }
    }
  });

  $("#attack").on("click", function() {
    console.log("Attack selected");

    console.log("character = " + JSON.stringify(character));
    console.log("defender = " + JSON.stringify(defender));

    if (characterSelected && defenderSelected && !gameOver) {
      
      defender.health = defender.health - character.attack;
      $(".defender-character").children(".health").html(defender.health);
      $("#game-message").html("<p>You attacked " + defender.name + " for " + character.attack + " damage.<p>");

   
      character.attack = character.attack + character.baseAttack;

      
      if (defender.health > 0) {
        character.health = character.health - defender.baseAttack;
        $(".chosen-character").children(".health").html(character.health);

        
        if (character.health > 0) {
          $("#game-message").append("<p>" + defender.name + " attacked you back for " + defender.baseAttack + " damage.</p>");
        } else {
          gameOver = true;
          $("#game-message").html("<p>You were defeated... womp womp...</p><p>Play again?</p>");
          $("#restart").show();
        }
      } else {
        
        enemiesDefeated++;
        defenderSelected = false;
        $("#game-message").html("<p>You have defeated " + defender.name + ". Choose another enemy.</p>");
        $(".defender-character").hide();

        
        if (enemiesDefeated === 3) {
          gameOver = true;
          $("#game-message").html("<p>You have won the game!!!</p><p>Play again?</p>");
          $("#restart").show();
        }
      }
    } else if (!characterSelected && !gameOver) {
      $("#game-message").html("<p>You must first select your game character.</p>");
    } else if (!defenderSelected && !gameOver) {
      $("#game-message").html("<p>You must choose an enemy to fight.</p>");
    }

    console.log("character = " + JSON.stringify(character));
    console.log("defender = " + JSON.stringify(defender));
  });

  $("#restart").on("click", function() {
    console.log("Restart selected");

    resetGame();
  });

}); // Main routine