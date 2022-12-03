---
date: 2018-04-19
tags:
  - devlog
  - games
  - pixel-art
  - project-p2d
---

# P2D Devlog v0.1.0 Getting Started

This is the **first devlog** for the **new project** codenamed **P2D** I'm working on. It's still a prototype more than a game and I'm yet trying to find the correct mechanics for the gameplay experience I'm looking for.

### TL;DR

I removed all my gamedev progress and started from zero.

**New mechanics!**

- **Movement**: The player can move around with his legs.
- **Jumping**: The player jump around with his legs.
- **Camera Follow**: There will be some magic entity that will follow you very smoothly filming whatever you're doing.
- **Health**: The player have health, is a living thing
- **Damage**: The player can be damaged losing health
- **Dead**: The player can die respawning where he started the level

**New gameplay experiences!**

- **Move and jump** around the world with the smoothest **camera follow** ever.
- Currently the only thing that could **kill you** is **fall damage**.

Scroll down to see some screenshots and GIFs!

### Wiping the Dust

This project has some past. Here is some old stuff I did time ago before sticking to something simpler:

![Old Concept Art](/assets/ghost-posts-images/2018/04/Concept.png)

I get to implement those tiles and the main character and some animations but the thing is that I last too much in finishing this assets and the feeling were of doing slow progress. So I decided to dump all the progress I did and start clean with a simpler idea and very basic mechanics.

### Clean Start

I did a character concept with a small pixel ratio and a few animations, which let me spend less but enough time doing art:

![Player First Animations](https://i.imgur.com/sDojV70.gif)

And then I create a small level concept animated by hand:

![First Game Concept Animation](https://i.imgur.com/0U2gb8F.gif)

With this assets I could make a very very simple game, but was enough for me to keep with the project without losing enthusiasm. What I also did was spamming my friends and teammates with my progress in the game, this helped me a lot since any bit of attention were a pretty good point to continue with the project.

Also at the same time Unity released the [2D Game Kit](https://unity3d.com/es/learn/tutorials/s/2d-game-kit) to help people without code knowledge start developing 2D games. Guess what? I have a small experience with Unity3D and C# programming but I took advantage of this and used some of their scripts to have some things working without losing too much time thinking, like the respawn logic or the scene controller.

### Core Mechanics

I defined in a flowchart the **core mechanics** of the game (movement, jump, camera follow, health, damage and dead) with small descriptions of what I want this mechanics to be like. I also spend some time defining some game history like how the world is, what is going on or some superadvanced mechanics, just for fun and to see a bit of the big picture and not get bored with simpler stuff.

### Results

With my core mechanics defined I started developing the game with some of the core mechanics. I've end up having a small prototype where you can move around with this character (name to be defined) jumping over a bunch of platforms made from the same tileset, testing how the game feels and gathering as much feedback as I can from the people that played it.

Once I had the health, damage and dead mechanics I implemented **fall damage**. If you fall from a great height you'll die:

![Implemented Fall Damage](https://i.imgur.com/u6K4jyV.gif)

Then I implemented level transitions to load new areas:

![Zone Swapping](https://i.imgur.com/cpdLGT6.gif)

And finally a small **Start Menu** to have something that feels more like a game:

![Start Menu](https://i.imgur.com/gXJXsZt.png)

### Now what?

Now I iterate over and over and over until having a game. Next thing to make will probably be:

- Attack
- Health Points
- Destructibles
- Collectables
- A new tileset

### Stay Tuned

You can follow the project progress on:

- [Twitter @GenomaGames](https://twitter.com/GenomaGames)
- [Imgur](https://genomagames.imgur.com/)
- [Tumblr](https://genomagames.tumblr.com)
- [Itch.io](https://genomagames.itch.io/project-p2d)
- [Game Jolt](https://genomagames.gamejolt.io/project-p2d)
