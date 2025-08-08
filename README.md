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

5. ## Diving into the NodeJS github repo
    - all the code of the module is wrapped inside a function().
    - IIFE - Immediately invoked function expression.
    - Nodejs passes module as a parameter to the IIFE.
    - require("path"). 5 steps.
    - 1. Resolving the module. (.localpath or .json or  node:module)
    - 2. Loading the module. File content is loaded according to file type.
    - 3. wraps inside IIFE. (Compile).
    - 4. Code evaluation. module.exports happens.
    - 5. caching. The code of require will ran only once.

6. ## libuv && async IO
    - Synchronous, Asynchronous
    - libuv talks to OS onbehalf of JS engine(v8). It acts as a middle layer between js engine and OS. Node is async because of libuv.
    - Nodejs is Asynchronous I/O (Non Blocking I/O) because of libuv. It is called non-blocking i/o because it is not blocking the main thread run by V8 JS Engine.

7. ## sync, async, setTimeoutZero - code

8. ## [Deep dive into v8 JS Engine](https://v8.dev/)
    - 1. Lexical Analysis(Tokenization). Code -> Tokens
    - 2. Syntax Analysis(Parsing). Tokens are converted into Abstract Syntax Tree(AST).
    - Syntax error : when the code can't generate a AST we can say that the error is a syntax error.
    - Google's v8 engine interpreter is known as Ignition Interpreter.
    - Compiler name is known as Turbofan Compiler.
    - Hot code(code which runs more times) is given to Turbofan compiler by Ignition interpreter and it is compiled so next time it will run very quickly. This is known as optimization.
    - Inline caching
    - Copy Elision
    - Orinico : garbage collection

9. ## libuv & Event Loop
    - Event Loop, Callback Queue, Thread pool
    - 4 phases in Event Loop. (process.nextTick(), promise callbacks these two will be executed in loop before every phase). Each phase will have a separate queue.
    - 1. timers phase (setTimeout, setInterval)
    - 2. poll phase (I/O Callbacks, incoming connections, data, fs, crypto, http.get)
    - 3. check phase (setImmediate)
    - 4. close callbacks phase (socket.on("close"))