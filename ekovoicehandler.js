//ekovoicehandler library

  import Artyom from "artyom.js";

  function onInit(player, language, actTime){ //eko player, string language and command activation time boolean as parameters


  const voiceHandler = new Artyom(); //create artyom object

  function startRec(lang){   //string parameter for language

    console.log("activating vocal commands");
    voiceHandler.fatality();  //stop any other recognition

    setTimeout(function(){    // if you use artyom.fatality , wait 250 ms to initialize again.
      voiceHandler.initialize({
          lang:lang,
          continuous: true,
          listen:true,
          debug:true,
          speed:1
       }).then(function(){
        console.log("VoiceHandler activated!");
      });
  },250);

  }

  function createCommand(indexes, idNodo){ //string array + string id nodo o idBottone? o altra proprietà del nodo?? DEVO AGGIUNGERE IL PLAYER???

    var command = {
      indexes: indexes,// array of words, will trigger the execution of the command
      action:function() { // Action to be executed when a index match with spoken word

        player.seek(idNodo); //append the node to the playlist


    }
  };
    voiceHandler.addCommands(command);
}

  function getCurrentNodeChildren(){ //gets currentNode children node array

    var decisionInstance = player.decision.get(player.currentNodeId);
    var childrenNodes = decisionInstance.children;
    return childrenNodes;

  }

  function addVocalCommands(){

   var nodi = player.repository.get(getCurrentNodeChildren()); //oppure getnodechildren con parametro nodo corrente
   var keywords = null;
   var nodofiglio = null;
   //var changeNodeonVoice = null;
   for(var i = 0;i < nodi.length; i++){

     console.log(nodi[i]);
     console.log("idnodofiglio"+i+":",nodi[i].data.id);
     keywords = nodi[i].data.studio.keywords;
     //changeNodeonVoice = nodi[i].data.studio.obeyonvoice;
     nodofiglio = nodi[i];

     //if(changeNodeonVoice == "yes")
     if(keywords != undefined) createCommand(keywords,nodofiglio);


   }
  }


  startRec(language);
  switch (actTime) {
    case "decision":
      player.on('nodestart',function(){voiceHandler.fatality();
      console.log("comandi disattivati");});
      player.on('decision.start',function(){
        voiceHandler.restart();
        voiceHandler.emptyCommands();
        console.log("comandi attivati e resettati");
        addVocalCommands();
      });
      break;
    case "always":
      player.on('nodestart',function(){
        voiceHandler.emptyCommands();
        addVocalCommands();
      });
      break;
    default:
      console.log("you didn't specified the commands' activation time");
      break;
  }

  }

  export default { onInit:onInit };