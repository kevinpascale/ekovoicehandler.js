# ekovoicehandler.js
A javascript library that allows eko-studio users to add vocal commands instead of using traditional button-click interaction.



HOW TO USE:

The library is made in a way that content creators that use eko studio tool can add vocal commands without the necessity of being able to develop code. 
Follow this guide to learn how to use commands.

1st STEP: INCLUDE THIS LIBRARY IN YOUR EKO-PROJECT

After creating an eko project, open the developer mode by clicking the button topright of the page between preview and publish. Open the code panel and click on add package. In the search bar digit "ekovoicehandler.js" and click on the result. 

2nd STEP: COPY AND PASTE THIS LINES ON THE CODE PANEL 
import voice from './ekovoicehandler.js'//TOP OF THE PAGE 


 voice.onInit(player,"it-IT","decision"); //INSIDE THE FUNCTION onInit
 
 3rd STEP: ADD YOUR PERSONAL KEYWORDS/COMMANDS 
 click on the node you want to move to during video playback with words or sentences
