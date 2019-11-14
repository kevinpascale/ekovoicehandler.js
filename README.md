# ekovoicehandler.js
A javascript library that allows eko-studio users to add vocal commands instead of using traditional button-click interaction.

TABLE OF CONTENTS

1. [ Description. ](#desc)
2. [ How to use. ](#usage)

    [ 1st Step: Include the library in your project.](#1st)
   
    [ 2nd Step: Paste. ](#2nd)
   
    [ 3rd Step: Add Keywords. ](#3rd)
   
    [ 4th Step: . ](#4th)

<a name="desc"></a>
## 1. Description

This library uses <a href = https://sdkcarlos.github.io/sites/artyom.html>artyom.js</a> and it's made in a way that content creators who use eko studio tool can add vocal commands without necessarily developing code. 

Follow this guide to learn how to use the commands.

<a name="usage"></a>
## 2. How to use 

<a name="1st"></a>
## 1st Step: Include this library in your eko-project

After creating an eko project, open the developer mode by clicking the button on the topright of the page between preview and publish.

Open the code panel and click on "add package".
![alt test](screenshots/picturename).
On the search bar digit "ekovoicehandler.js" and click on the result. 

notice: If you've done the checkout of your project you can install this library inside your local project by running the command "npm install ekovoicehandler.js --save" from the command prompt. 

<a name="2nd"></a>
## 2nd Step: Copy and paste these lines on the code panel 
 
import voice from './ekovoicehandler.js' 
 
Paste this line on the top of the page. 



 voice.onInit(player,"it-IT","decision");
 
 Paste this line inside function onInit
 
 <a name="3rd"></a>
 ## 3rd Step: Add your personal Keywords 

Select a node and decide which keywords will take you to the node selected.

Right-click and open metadata.

Write "keywords: []" 
