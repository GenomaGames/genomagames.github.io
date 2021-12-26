---
date: 2018-09-23
tags:
  - devlog
  - project-p2d
  - games
---

# P2D Devlog v0.3.0 Enemies and New Location

This is the third devlog of the project P2D (Name to be defined). The change of this version compared to [the previous one](http://genomagames.com/p2d-devlog-v0-2-0-polishing-and-destructibles/) are very interesting. There has been new features and mechanics with more polishing over actuals things.

### TL;DR;

- The player can now look up and down making the camera tilts
- New countryish location
- The game now has **enemies** each with different logics:
  - Bats (caves)
  - Boars (caves and country)
- Add and improve particles among the game
- More decoration on levels
- Improve custom Physics logic
- Improve camera system
- Improve levels sprites (switch from 16 tiles tilesets to 47 tiles tilesets)
- The player will not move when attacking
- When the player suffers damage will be thrown away

**Keep reading to see some GIFs!**

### Details

This version has been focused on adding 2 different types of enemies and a state logic that manages their behavior. Also, there has been several improves to the player mechanics and in the environment including a new location.

#### Enemies

The game now has some hostile NPCs, **bats and boars** , each one with a different logic, movements and attacks.

The enemies include a **state system** that could be used in the future for more types of NPCs ( **N** on **P** layable **C** haracters). This system manages the state of the NPCs in the game. A **state** is like when an enemy has detected the player, it passes from **neutral state** to **hostile state** and starts attacking the player.

The player now will encounter **boars** on some locations that will charge against if they see him.

![Boar Enemy](https://i.imgur.com/gNdcpHy.gif)

Now the caves are inhabited by bats, they will be sleeping hanging in the ceiling until the player gets closer, then they will chase the player until losing him.

![Bat Enemy](https://i.imgur.com/sSccgWz.gif)

![Enemies](https://media.giphy.com/media/4GY3obDxCho9HlJSRY/giphy.gif)

#### Player Moves Improvements

The player mechanics have been improved for a more pleasant the gameplay and to make some things feel more natural according to the game.

Now the player can look up and down (without moving) to see what is above or under him.

![Player Looking Up and Down](https://media.giphy.com/media/4QEQxY4U8eiI37TtJG/giphy.gif)

Controls while jumping has changed, when the player is in the air can move and change his direction, slower than if he where in the ground, and the jump height can be altered depending on how long the jump button is pressed. This could change in the future but at this moment it feels pretty good.

![Player Jumping](https://media.giphy.com/media/OPwxxuiO1icr69DJsR/giphy.gif)

If the player attacks while moving he will stop moving to land the attack.

![Player Moving and Attacking](https://media.giphy.com/media/1itJg84KaGIU3ANiGr/giphy.gif)

If the player takes damage he will be thrown away at the incoming attack direction.

![Player Taking Damage](https://media.giphy.com/media/9DcC8MtQxbg9LNEvrc/giphy.gif)

#### Improves in Camera System

Now the camera switch side when the player alters his looking direction.

![Player Changing Camera Direction](https://media.giphy.com/media/p43W9QFKQxsPyyIUeh/giphy.gif)

#### New Game Country Location

Now there is a new set of sprites to create countryish locations!

![Country Location](https://media.giphy.com/media/ozjF8ZMxh17T5JMy2n/giphy.gif)

### What's Next?

- First history based levels
- Public **Alpha Game Release**
- More enemies
- Attack while jumping
- Polishing

### Stay Tuned

You can follow the project progress on [@GenomaGames](https://twitter.com/GenomaGames)

<!--kg-card-end: markdown-->
