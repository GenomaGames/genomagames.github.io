# Unity DOTS Tutorial Series

This folder contains planning documents and tracking for a Unity DOTS tutorial series targeting Unity 6.

## File Structure

- `planning.md` - The main planning document with tutorial outlines and progress tracking
- `llm-rules.md` - A file specifically structured to use as context when working with LLMs
- `README.md` - This file, explaining how to use the other documents

## How to Use These Files

### Planning Document

The `planning.md` file contains:

- Series metadata and overview
- Tutorial outlines (T01-T10)
- Progress tracking
- Blog post template
- Technical requirements

When working on the tutorial series:

1. Update the status fields as you progress
2. Add notes to individual tutorials as you develop them
3. Use the blog post template as a starting point for each article

### Working with LLMs

To get assistance from an LLM (like Claude, ChatGPT, etc.):

1. Provide both `planning.md` and `llm-rules.md` as context to the LLM
2. Be specific about which tutorial you need help with by referencing its ID (e.g., T01, T05)
3. Clearly state what kind of assistance you need:
   - Content outlining
   - Code examples
   - Explanations
   - Structure suggestions

Example prompts:

- "Help me develop the outline for tutorial T03 on Components"
- "Create code examples for the Job System in T05"
- "Explain how to demonstrate ECS performance benefits in T01"

### Working with the Planning Document

The planning document serves as your central roadmap for the entire series. As you work on the tutorials:

1. Review the topic outlines to guide your content development
2. Reference the blog post template when creating new articles
3. Consult the technical requirements section for needed Unity packages
4. Use the content as a reference when developing your code repository

You can ask the LLM to help you update the planning document as you progress through the series. For example:

"Update the planning document to mark Tutorial 01 as in progress with today's start date"

## GitHub Repository Structure

The accompanying GitHub repository will use:

- Main branch for the latest complete code
- Tutorial branches (tutorial/01, tutorial/02, etc.) for each lesson's code state

Each tutorial in the planning document corresponds to a specific branch in the repository.

## Additional Tips

- Keep the planning document updated as you progress
- Add detailed notes to each tutorial section as you develop ideas
- Consider adding estimated time requirements for each tutorial
- Link completed tutorials back to the planning document
