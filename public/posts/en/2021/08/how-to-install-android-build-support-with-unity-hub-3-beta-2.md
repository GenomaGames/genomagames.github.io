---
date: 2021-08-23
summary: Install Android Build Support on Unity 2020.3.16f1 using Unity Hub 3.0.0-beta.2
tags:
  - tip
  - unity
  - unity-hub
coverImage:
  src: /posts/assets/2020-07-02-how-to-install-unity-2020/unity_2020_background.jpg
  alt: Unity 2020 Background
lastmod: 2022-12-18
---

# How to install Android build support with Unity Hub 3-beta

Recently I had to install Unity 2020.3.16f1 to update an old game developed with Unity 2017. This game was made for Android, and since I'm using Unity Hub 3.0.0-beta.2 (I'm only using it because it has a black theme), I had to install the required modules for "Android Build Support" to be able to compile the game and see if it worked with the new Unity version. It turns out that the installation of that modules is a bit buggy.

If you are trying to do the same (or close enough) and you are receiving the following message:

```
Failed to delete old Unity Android Support Installation files. Maybe Unity or some of its tools are still running?
```

Follow the next steps.

1. Quit all Unity instances
1. Quit Unity Hub (Ensure it is not still running on the system tray)
1. Remove the next folder `Unity/Hub/Editor/2020.3.16f1/Editor/Data/PlaybackEngines/AndroidPlayer` in your Unity Hub's installation files
1. Edit `Unity/Hub/Editor/2020.3.16f1/modules.json` (you'll need admin privileges)(you can [format the json file here](https://jsonformatter.curiousconcept.com/)) and update all related "android" items to has its property `"selected"` to `false`
1. Copy `Unity/Hub/Editor/2020.3.16f1/modules.json` to `Unity/Hub/Editor/2020.3.16f1/modules.json.bk` (This is your backup)
1. Edit the file `Unity/Hub/Editor/2020.3.16f1/modules.json` and replace all the "android" related file paths using the following rule:
   - Rename `AndroidPlayer` to `AndroidPlayerTmp` and the folder next to `AndroidPlayer` (SDK, NDK, OpenJDK) to be the item's `"id"` value
   - Example with item with `"id"` `"android-ndk"`:
     - `"{UNITY_PATH}/Editor/Data/PlaybackEngines/AndroidPlayer/NDK"` -> `"{UNITY_PATH}/Editor/Data/PlaybackEngines/AndroidPlayerTmp/android-ndk"`
     - `"renameFrom": "{UNITY_PATH}/Editor/Data/PlaybackEngines/AndroidPlayer/NDK/android-ndk-r19"` -> `"renameFrom": "{UNITY_PATH}/Editor/Data/PlaybackEngines/AndroidPlayerTmp/android-ndk/android-ndk-r19"`
1. Start Unity Hub and install all "Android Build Support" related items
1. Once it is finished, you should found a `{UNITY_PATH}/Editor/Data/PlaybackEngines/AndroidPlayerTmp` folder with all the folders with the "id" names. If not, you can download the content from the property "downloadUrl" of the item (I had to do this with "android-sdk-platform-tools")
1. Copy each item folder content back to its "AndroidPlayer" original destination (You have this info in your `modules.json.bk` file)
1. Edit `Unity/Hub/Editor/2020.3.16f1/modules.json` android items file paths to their original value (You have this info in your `modules.json.bk` file)
1. Unity should be able to compile your project for Android by now

Happy Game Dev! :space_invader:
