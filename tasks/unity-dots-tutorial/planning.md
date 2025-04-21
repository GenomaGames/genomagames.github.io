---
DOCUMENT_TYPE: Tutorial planning document
PURPOSE: Track progress and content for Unity DOTS tutorial series
LAST_MODIFIED_BY: Human author
AGENT_INSTRUCTIONS: This document should be updated to reflect current tutorial status and content plans
---

# Unity DOTS Tutorial Series Planning

## Metadata

- **Project**: Unity DOTS Tutorial Series
- **Platform**: Unity 6
- **Target Site**: NextJS blog at genomagames.com
- **Repository**: https://github.com/GenomaGames/genomagames.github.io
- **Example Code Repo**: [To be created]
- **Last Updated**: 2025-04-21

## Project Overview

<!--
PROJECT_OVERVIEW: This section defines the overall scope and goals of the tutorial series.
AGENT_TASK: Expand or refine this description when the project scope changes.
-->

A comprehensive tutorial series exploring Unity DOTS (Data-Oriented Technology Stack) in Unity 6, with accompanying code repository using branch-based progression. The series will guide developers from DOTS basics to advanced implementation techniques.

## Repository Structure

<!--
REPOSITORY_INFO: Description of the GitHub repository organization.
AGENT_TASK: Update if repository structure changes.
-->

- **Main Branch**: Contains the latest complete code with all features implemented
- **Tutorial Branches**: One branch per lesson following pattern `tutorial/XX` where XX is the lesson number

## Target Audience

<!--
AUDIENCE_INFO: Description of who this tutorial series is intended for.
AGENT_TASK: Refine based on feedback and evolving tutorial content.
-->

- Intermediate Unity developers familiar with C#
- Game developers interested in performance optimization
- Developers transitioning from traditional GameObject architecture to DOTS

## Progress Tracking

<!--
PROGRESS_SECTION: Track overall series completion.
AGENT_TASK: Update this section whenever tutorial status changes.
-->

- **Total Tutorials Planned**: 10
- **Tutorials Completed**: 0
- **Current Focus**: Tutorial 01
- **Overall Completion**: 5%

## Content Outline

<!--
CONTENT_SECTION: Detailed tutorial outlines with status tracking.
AGENT_TASK: Update status, dates, and notes as tutorials progress.
-->

### Tutorial 01: Introduction to DOTS

<!-- TUTORIAL: T01 -->

**ID**: `T01`  
**Branch**: `tutorial/01`  
**Status**: `IN_PROGRESS`  
**Started**: `2025-04-21`  
**Completed**: `YYYY-MM-DD`  
**Topics**:

- What is DOTS and why it matters
- Core components: ECS, Job System, Burst Compiler
- Setting up a Unity 6 project with DOTS packages
- Project overview and goals

<!-- NOTES: T01 -->
<!-- Add any planning notes or ideas for this tutorial here -->

### Tutorial 02: ECS Fundamentals

<!-- TUTORIAL: T02 -->

**ID**: `T02`  
**Branch**: `tutorial/02`  
**Status**: `NOT_STARTED`  
**Started**: `YYYY-MM-DD`  
**Completed**: `YYYY-MM-DD`  
**Topics**:

- Entities, Components, and Systems explained
- GameObject vs Entity paradigm
- Creating your first entities
- Basic system implementation

<!-- NOTES: T02 -->
<!-- Add any planning notes or ideas for this tutorial here -->

### Tutorial 03: Working with Components

<!-- TUTORIAL: T03 -->

**ID**: `T03`  
**Branch**: `tutorial/03`  
**Status**: `NOT_STARTED`  
**Started**: `YYYY-MM-DD`  
**Completed**: `YYYY-MM-DD`  
**Topics**:

- Component design principles
- IComponentData vs ISharedComponentData
- Tag components
- Enableable components

<!-- NOTES: T03 -->
<!-- Add any planning notes or ideas for this tutorial here -->

### Tutorial 04: Systems and Queries

<!-- TUTORIAL: T04 -->

**ID**: `T04`  
**Branch**: `tutorial/04`  
**Status**: `NOT_STARTED`  
**Started**: `YYYY-MM-DD`  
**Completed**: `YYYY-MM-DD`  
**Topics**:

- Different system types (SystemBase, ISystem)
- Entity queries and filters
- System update order
- Scheduling and dependencies

<!-- NOTES: T04 -->
<!-- Add any planning notes or ideas for this tutorial here -->

### Tutorial 05: The Job System

<!-- TUTORIAL: T05 -->

**ID**: `T05`  
**Branch**: `tutorial/05`  
**Status**: `NOT_STARTED`  
**Started**: `YYYY-MM-DD`  
**Completed**: `YYYY-MM-DD`  
**Topics**:

- Parallel processing concepts
- IJobEntity and job types
- Writing thread-safe code
- Common pitfalls and solutions

<!-- NOTES: T05 -->
<!-- Add any planning notes or ideas for this tutorial here -->

### Tutorial 06: Burst Compiler

<!-- TUTORIAL: T06 -->

**ID**: `T06`  
**Branch**: `tutorial/06`  
**Status**: `NOT_STARTED`  
**Started**: `YYYY-MM-DD`  
**Completed**: `YYYY-MM-DD`  
**Topics**:

- Writing Burst-compatible code
- Performance optimization techniques
- Debugging with Burst
- Measuring performance improvements

<!-- NOTES: T06 -->
<!-- Add any planning notes or ideas for this tutorial here -->

### Tutorial 07: Practical Game Implementation

<!-- TUTORIAL: T07 -->

**ID**: `T07`  
**Branch**: `tutorial/07`  
**Status**: `NOT_STARTED`  
**Started**: `YYYY-MM-DD`  
**Completed**: `YYYY-MM-DD`  
**Topics**:

- Movement systems
- Simple physics with DOTS
- Input handling
- Basic game mechanics

<!-- NOTES: T07 -->
<!-- Add any planning notes or ideas for this tutorial here -->

### Tutorial 08: Advanced DOTS Features

<!-- TUTORIAL: T08 -->

**ID**: `T08`  
**Branch**: `tutorial/08`  
**Status**: `NOT_STARTED`  
**Started**: `YYYY-MM-DD`  
**Completed**: `YYYY-MM-DD`  
**Topics**:

- Authoring components
- Hybrid rendering
- Aspect-oriented design
- Entity conversion workflows

<!-- NOTES: T08 -->
<!-- Add any planning notes or ideas for this tutorial here -->

### Tutorial 09: Optimization Techniques

<!-- TUTORIAL: T09 -->

**ID**: `T09`  
**Branch**: `tutorial/09`  
**Status**: `NOT_STARTED`  
**Started**: `YYYY-MM-DD`  
**Completed**: `YYYY-MM-DD`  
**Topics**:

- Profiling DOTS applications
- Memory layout optimization
- System optimization strategies
- Scaling with large entity counts

<!-- NOTES: T09 -->
<!-- Add any planning notes or ideas for this tutorial here -->

### Tutorial 10: Project Conclusion

<!-- TUTORIAL: T10 -->

**ID**: `T10`  
**Branch**: `tutorial/10`  
**Status**: `NOT_STARTED`  
**Started**: `YYYY-MM-DD`  
**Completed**: `YYYY-MM-DD`  
**Topics**:

- Putting it all together
- Future learning resources
- Community engagement
- Final project demonstration

<!-- NOTES: T10 -->
<!-- Add any planning notes or ideas for this tutorial here -->

## Blog Post Template

<!--
TEMPLATE_SECTION: Standard format for blog posts.
AGENT_TASK: Provide this template when asked about blog post structure.
-->

````markdown
---
title: "Unity DOTS Tutorial Part X: [Topic]"
date: YYYY-MM-DD
author: Your Name
series: unity-dots-tutorial
seriesOrder: X
---

## Introduction

[Brief introduction to this tutorial's focus]

**Prerequisites:**

- [Previous tutorials or knowledge needed]
- Unity 6 with DOTS packages installed

**GitHub Branch:** [Link to tutorial/0X branch]

```bash
git checkout tutorial/0X
```

## What You'll Learn

- [Key learning point 1]
- [Key learning point 2]
- [Key learning point 3]

## Step 1: [First Step]

[Detailed instructions with code examples]

```csharp
// Code example
```

## Step 2: [Second Step]

[Detailed instructions with code examples]

## Step 3: [Third Step]

[Detailed instructions with code examples]

## Results

[Screenshots or GIFs of expected results]

## Next Steps

Continue to [Part X+1: Next Topic](link-to-next-tutorial) where we'll explore...

## Additional Resources

- [Link to relevant Unity documentation]
- [Link to helpful community resources]
````

## Technical Requirements

<!--
REQUIREMENTS_SECTION: Technical needs for the project.
AGENT_TASK: Update as technical requirements evolve.
-->

- Unity 6 (latest version)
- DOTS packages (com.unity.entities, com.unity.jobs, com.unity.burst)
- Sample assets (to be determined)
- Performance measurement tools

<!--
AGENT_CAPABILITIES:
- Update tutorial status, dates, and completion percentage
- Add notes to tutorial sections
- Suggest content for specific tutorials
- Provide code examples for tutorial topics
- Update the "Last Updated" field in Metadata
- Calculate overall completion percentage
- Maintain document structure when making changes
-->
