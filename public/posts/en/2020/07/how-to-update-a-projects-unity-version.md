---
date: 2020-07-24
summary:
  Learn how to upgrade your project's Unity Version. We will update a Unity
  project using  Unity 2020.1.0b13 (Beta) to Unity 2020.1.0f1.
tags:
  - unity
  - tutorial
  - beginner
coverImage:
  src: /posts/assets/2020-07-24-how-to-update-a-projects-unity-version/00-Unity_2020.1_Now_available.jpg
  alt: Unity 2020.1 Background
lastmod: 2023-02-06
---

# How to Update a Project's Unity Version

Learn how to upgrade your project's Unity Version. We will update a Unity project using Unity 2020.1.0b13 (Beta) to Unity 2020.1.0f1.

<!--more-->

## Requirements

To follow this Unity tutorial you will need to:

- [Install UnityHub](https://unity3d.com/es/get-unity/download)
- [Install Unity](./how-to-install-unity-2020.md)

## Installing a new Unity Version

We already had a Unity version installed, [Unity 2020.1.0b13 (Beta)](https://blogs.unity3d.com/es/2020/03/17/unity-2020-1-beta-is-now-available-for-feedback/), and a new one has been released, [Unity 2020.1.0f1](https://blogs.unity3d.com/es/2020/07/23/unity-2020-1-is-now-available/).

First, you will need to install Unity's new version, if you used **Unity Hub** to install the previous one, the process is the same, you can follow the steps in [**How to Install Unity 2020 Tutorial**](./how-to-install-unity-2020).

![01-Unity_Hub_Installs_with_new_version_installed](/posts/assets/2020-07-24-how-to-update-a-projects-unity-version/01-Unity_Hub_Installs_with_new_version_installed.png)

## Updating Project's Unity Version

Before upgrading your project's Unity version, checkout Unity Manual's section [**Upgrade Guides**](https://docs.unity3d.com/2020.1/Documentation/Manual/UpgradeGuides.html), this way you can be sure if your project is ready to be upgraded or if you need to make changes in it before attempting to upgrade it.

To update the Unity Version of a project, go to **Projects** section and click on the select input to choose the newly installed version.

![02-Unity_Hub_Project_Unity_version_selection](/posts/assets/2020-07-24-how-to-update-a-projects-unity-version/02-Unity_Hub_Project_Unity_version_selection.png)

After selecting the new Unity version you will need to open the project, Unity Hub will show an alert dialog informing that the project's version is going to be updated and where Unity will place the logs of the upgrade process.

![03-Unity_Hub_Project_Unity_version_upgrade_alert](/posts/assets/2020-07-24-how-to-update-a-projects-unity-version/03-Unity_Hub_Project_Unity_version_upgrade_alert.png)

Press the **CONFIRM** button, and the new Unity editor will proceed to update the project's references and dependencies.

![04-Unity_Project_open_in_progress](/posts/assets/2020-07-24-how-to-update-a-projects-unity-version/04-Unity_Project_open_in_progress.png)

When Unity finishes, you will see the Unity editor with your project again, running in a new version.

![05-Unity_Project_opened](/posts/assets/2020-07-24-how-to-update-a-projects-unity-version/05-Unity_Project_opened.png)

We are done!

Happy Game Dev! :space_invader:
