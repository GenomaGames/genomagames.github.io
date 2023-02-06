---
date: 2018-11-01
tags:
  - devlog
  - project-p2d
  - games
lastmod: 2023-02-06
---

# P2D Devlog v0.4.0 - Player Mechanics Improvements and Game World Outlining

Another step towards a better game! This one almost appears to be a step back, the created scenes have been removed but in exchange, there is a huge world to be shaped.

You can check the [previous devlog](../09/p2d-devlog-v0-3-0-enemies-and-new-location) if you missed it.

## TL;DR;

- Defined the outline of the game world waiting to be shaped
- Improve player movements, now jumping, running and attacking feel more organic
- The player can now attack while on air
- Now the game loads the areas progressively without load screens
- Implemented a pause menu
- Now the game works on iPhone and Android and it will run at 60fps
- The whole game logic has been improved (game management, inputs, menus, enemies...)

> Don't miss the GIFs! Scroll a little bit

## Detail

The biggest change in this version is **the world** and the **level progression mechanic** followed by improvements in several game mechanics and systems (a better core a better game)

### The World

The whole world outline has been designed, meaning that now the game can be played from beginning to end, there's no content yet so the player walks along plain and empty landscapes ready to be shaped with more interesting forms and to be filled with enemies, objects, decoration...

![Whole World Outline](https://i.imgur.com/sBa4xAd.gif)

You can complete the game as it is now in around 15 minutes. Now the challenge is to fill and expand that time width fun and challenging scenery.

### The new level loading system

The old screen fading to change between levels has been replaced for a progressive loading system. No more loading screens.

![New Level Loading System](https://i.imgur.com/lYso4er.gif)

Although it is likely that the screen fade system will be used to pass through doors.

### Movement Improvements

The movement logic has been changed to be a little more organic. The player and other walking things now have a small acceleration time, this allows the player to make more precise movements.

![Player Movement Improves](https://i.imgur.com/IDUkZBE.gif)

It could be improved more but at this moment it's fine.

### Air Attack!

In the previous version the game included a new type of enemy (bats), now the player can fight them by attacking while jumping.

![Player now can attack while on air](https://i.imgur.com/iKHQIBl.gif)

### Menus

A new pause menu has been added to access to the main menu while on gameplay (or to take a break)

![Pause Menu](https://i.imgur.com/5rpZXGp.gif)

## Nobody thinks in the future?

The plan now is:

- Forest zone levels content
- Dungeon zone levels content
- Work on the game world and leveling
- More enemies
- New mechanics

## Don't miss it!

You can find out earlier about these changes in [@GenomaGames](https://twitter.com/GenomaGames)
