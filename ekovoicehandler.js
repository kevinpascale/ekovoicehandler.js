//ekovoicehandler library

  import Artyom from "artyom.js";
  import jQuery from "jquery";
  const voiceHandler = new Artyom(); //create artyom object




  function onInit(player, language, actTime){ //eko player, string language and command activation time boolean as parameters

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

    var settings = {
      continuous:true, // Enable continuous if HTTPS connection
      onResult:function(text){

        // Do something with the text
         console.log(text);
         //jQuery.post( "https://eko-video.herokuapp.com/feedback" , {content:text});

       },

        onStart:function(){
          console.log("Dictation started by the user");
        },

         onEnd:function(){

           console.log("Dictation stopped");
          }

     }

    var UserDictation = null;
    startRec(language);
    switch (actTime) {
      case "decision":

        player.on('nodestart',function(){
        voiceHandler.dontObey();
        voiceHandler.fatality();
        console.log("comandi e voiceRecognition disattivati");});

        player.on('decision.start',function(){
          if(player.currentNodeId != 'node_no_e8f655'){
          //voiceHandler.restart();
          startRec(language);
          voiceHandler.obey();
          voiceHandler.emptyCommands();
          console.log("comandi attivati e resettati");
          addVocalCommands();}
          //attempt to store user responses
          else{

              UserDictation = voiceHandler.newDictation(settings);
              UserDictation.start();
         }
        });

        player.on('nodeend', ()=> {if(UserDictation != null) UserDictation.stop();}); //why not decision.stop

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
