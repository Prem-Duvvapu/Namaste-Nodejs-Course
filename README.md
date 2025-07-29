# Namaste NodeJS Course

1. ## Introduction to NodeJS
    - Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.
    - Node.js has an event-driven architecture capable of asynchronous I/O (non-blocking IO).
    - Ryan Dahl developed Node.js in 2009.
    - Wherever there is JS there will always be a JS engine.

2. ## JS on Server
    - V8 can be embedded into any C++ application.
    - Node JS is a C++ application with V8 embedded into it.
    - ECMA script - standards/ rules. JS engines follow these standards.

3. ## Let's write code
    - Node REPL(Read, Evaluate, Print, Loop)
    - globalThis (common global object)

4. ## module.export & require
    - require()
    - modules protect their variables and functions from leaking
    - module.exports
    - Common JS modules (cjs). Here we use module.exports, require(). By default used in Node JS. This is older way.
    - ES modules (mjs). Here we use import, export. By default used in React, Angular. This is newer way.