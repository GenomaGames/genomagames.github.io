---
title: P2D Devlog v0.2.0 Polishing and Destructibles
date: '2018-05-12 19:32:00'
tags:
- devlog
- games
- pixel-art
- project-p2d
---

This is the second devlog of the project P2D (Name to be defined). The changes made in this new version are not that huge of [the previous ones](http://genomagames.com/2018/04/19/p2d-devlog-v0-1-0-getting-started/). The main reason for this is the iteration over the things made and the polishing and analysis of that should come next.

### TL;DR

- Improves in **jump** movement
- Some **color** palette changes
- Improves in **camera** behavior
- Added one-way **platforms** and implemented in the actual levels
- The player can now **attack** by throwing a punch
- Improve **menu buttons** appearance

**Scroll down to see some GIFs!**

### Details

This milestone has been mostly for iterating over the things done in the last version, I've spend some of the time analyzing and defining what the game has and how everything connects, trying to have a big picture to figure out what is the next step.

#### Color Change

By playing the game in different devices the color palette seemed darkened, some of the colors have been changed to improve the game appearance.

![Color Palette Changes](https://i.imgur.com/QjuUeUq.gif)

#### New Camera System

The old camera system that was a small script in charge of following the player has been changed by [Cinemachine](https://assetstore.unity.com/packages/essentials/cinemachine-79898) tool, this will let me implement some cool stuff like camera boundaries or camera animations without losing too much time developing this things.

![Unity Cinemachine System](https://i.imgur.com/ax5ERdy.gif)

#### Destructible Boxes and Punch Attack

The hero can now attack and inflict damage with a punch! Currently there is only wooden boxes around but it is start. Next step is polish this system and controls to result comfortable to the player.

![New Attack Controls](https://i.imgur.com/h26DNEN.gif)

#### New Menu Buttons

The main menu buttons have been replaced by new pixelated ones.

![New Menu Buttons](https://i.imgur.com/TlWWxpr.png)

#### Jump Improves and One-Way Platforms

What would be a platformer without traversable platforms? Not a platformer. I've created a couple of wooden platform tiles and implemented to them the one-way platform component included in Unity.

![Platforms and Jump Improves](https://i.imgur.com/GIjVsKA.gif)

### What's Next?

The is a lot of analysis pending and iterations but this time I need to move forward a little further so the next changes will be bigger, just to list some of the next possible implementations:

- New location
- Decoration
- Some FX
- Collectibles / Items
- Improves on the attack system
- Score System

### Stay Tuned

You can follow the project progress on:
- [Twitter @GenomaGames](https://twitter.com/GenomaGames)
- [Imgur](https://genomagames.imgur.com/)
- [Tumblr](https://genomagames.tumblr.com)
- [Itch.io](https://genomagames.itch.io/project-p2d)
- [Game Jolt](https://genomagames.gamejolt.io/project-p2d)