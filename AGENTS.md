```markdown
# AGENTS.md - AI Coding Agent Guidelines

These guidelines are designed to ensure high-quality, maintainable, and testable AI coding agents. Adherence to these principles is mandatory for all development activities within this repository.

## 1. DRY (Don't Repeat Yourself)

*   All functions, classes, and modules should have single, well-defined purposes.
*   Avoid duplicating code. If functionality is reused, create a well-documented abstraction.
*   Use interfaces or abstract classes as appropriate to decouple components.

## 2. KISS (Keep It Simple, Stupid)

*   Strive for clarity and readability in code.
*   Avoid unnecessary complexity.
*   Prioritize essential features over clever solutions.
*   Keep code concise and easy to understand.

## 3. SOLID Principles

*   **Single Responsibility Principle:** Each class/module should have one primary responsibility.
*   **Open/Closed Principle:**  The system should be extensible without modifying existing code.
*   **Liskov Substitution Principle:**  Subclasses must be substitutable for their base classes without altering the correctness of the program.
*   **Interface Segregation Principle:**  Clients should not be forced to depend on methods they do not use.
*   **Dependency Inversion Principle:**  High-level modules should not depend on low-level modules.

## 4. YAGNI (You Aren't Gonna Need It)

*   Only implement features that are currently required.
*   Avoid premature optimization.
*   Refactor only when necessary to improve maintainability and performance, not because there’s a need to add new functionality.

## 5. Code Structure & Best Practices

*   **File Size:** Each file must be no more than 180 lines of code.
*   **Naming Conventions:**  Use descriptive and consistent naming conventions.  Follow the standard naming guidelines provided in the README.md.
*   **Comments:**  Provide clear and concise comments explaining complex logic, assumptions, and potential edge cases.  Comments should explain *why* not *what*.
*   **Error Handling:**  Implement robust error handling with informative error messages.  Avoid silent failures.
*   **Data Structures:** Use appropriate data structures to represent data effectively.  Consider performance implications.
*   **Memory Management:**  Use memory efficiently and avoid leaks. Prefer smart pointers where appropriate.
*   **Logging:** Implement logging for debugging and monitoring.  Don't overuse logging.

## 6. Testability & Coverage

*   **Unit Tests:** All functions, classes, and modules must have comprehensive unit tests.
*   **Test Cases:**  Each test case should cover all critical paths and edge cases.
*   **Test Driven Development (TDD):**  Consider adopting a TDD approach where you write tests *before* writing the code.
*   **Coverage Report:**  Generate a coverage report (e.g., using Coverage.py) to measure code coverage.  Aim for 80% or higher.
*   **Test Isolation:**  Tests should be completely isolated and independent of each other.

## 7.  AI Agent Specific Considerations

*   **State Management:**  State should be managed in a safe and predictable manner. Consider immutability principles.
*   **Debugging:**  Include debugging statements where appropriate.
*   **Output Formatting:** Provide consistent and formatted output for debugging and reporting.
*   **Abstraction Layers:** Design abstraction layers to isolate components and make them easier to modify.

## 8.  Version Control

*   Use Git for version control.
*   Commit frequently with clear commit messages explaining the changes.
*   Branching strategy: Implement a well-defined branching strategy.
*   Code Reviews:  Mandatory code reviews for all changes.

## 9.  Documentation

*    README.md: Provide a detailed README with installation instructions, usage examples, and documentation.
*   API Documentation (if applicable):  Document API endpoints and data structures using a tool like Swagger.

## 10.  Future Considerations

*   Explore the use of automated testing tools.
*   Refactor for performance improvements.
*   Add support for asynchronous operations.

These guidelines are subject to change as the project evolves.  Regular review and updates are crucial to maintain the quality and stability of the AGENTS.md file.
```