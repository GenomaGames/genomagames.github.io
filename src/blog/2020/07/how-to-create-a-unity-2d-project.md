---
date: 2020-07-16
tags:
  - unity
  - tutorial
  - beginner
cover_image:
  alt: Unity Asset Store Sunny Land by Ansimuz
  src: ../../../../static/assets/2020-07-16-how-to-create-a-unity-2d-project/cover_image.jpg
---

# How To Create a Unity 2D Project

In this article you will **learn how to install create a Unity 2D PRoject** using UnityHub 2.3.2 in order to **start developing 2D games**.

## Requirements

To follow this Unity tutorial you will need to:

- [Install UnityHub](https://unity3d.com/es/get-unity/download)
- [Install Unity](./how-to-install-unity-2020.md)

## New Unity Project

To **start a new Unity 2D project**, open **UnityHub**, go to **Projects** section and then click on the **NEW** button:

![00-UnityHub_2.3.2_New_Project_Button](/assets/2020-07-16-how-to-create-a-unity-2d-project/00-UnityHub_2.3.2_New_Project_Button.png)

UnityHub will show up the new project form with multiple [Project Templates](https://docs.unity3d.com/2020.1/Documentation/Manual/ProjectTemplates.html) to choose.

> Project Templates provide preselected settings based on common best practices for different types of Projects. These settings are optimized for 2D and 3D Projects across the full range of platforms that Unity supports.

> **2D Template** Configures Project settings for 2D apps, including Texture (Image) Import, Sprite Packer, Scene View, Lighting, and Orthographic Camera packages

Choose the **2D** Project Template. You will need to provide a **Project Name** (This value will also be used as the directory name containing the project) and a **Location** to your file system to where the project will be created. In this example we are setting this values to **Genoma Invaders** and **`C:\Users\alber\develop\games`**, next you just need to press the **CREATE** button.

![01-UnityHub_2.3.2_New_Project_Panel_with_2D_selected](/assets/2020-07-16-how-to-create-a-unity-2d-project/01-UnityHub_2.3.2_New_Project_Panel_with_2D_selected.png)

This will create a new directory, in this example **`C:\Users\alber\develop\games\Genoma Invaders`**, containing all the project files.

```bash
Genoma Invaders
├── Assets
│   └── Scenes
│       └── SampleScene.unity
├── Library
├── Logs
├── Packages
├── ProjectSettings
└── UserSettings
```

<small>

_**Note:** Some files and folders have been omitted from the file tree to favor readability._

</small>

UnityHub will open the project with **Unity**:

![02-Unity_2020.1.0b13_(Beta)_blank_2D_project](</assets/2020-07-16-how-to-create-a-unity-2d-project/02-Unity_2020.1.0b13_(Beta)_blank_2D_project.png>)

That will be all, you are ready to start working in your **New Unity 2D Project**.

Checkout [Unity 2020.1 Manual "Starting Unity" Chapter](https://docs.unity3d.com/2020.1/Documentation/Manual/GettingStarted.html) for more info.

Happy Game Dev! :space_invader:
