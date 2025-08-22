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
    - Event loop waits at poll phase if the call stack is empty and callback queue is empty.
    - Event loop in browser and this event loop is different.

10. ## Thread pool in libuv
    - Tick : one full cycle of event loop is known as Tick.
    - Thread pool
    - process.env.THREADPOOL_SIZE
    - scalable I/O event Notification mechanism. epoll(Linux), kqueue(MacOS)

11. ## Creating a Server
    - Server(Hardware, Software)
    - Client
    - IP address
    - Protocol
    - Port number
    - Path
    - sockets vs web sockets

12. ## Databases - SQL & NoSQL
    - Types of databases
    - MySQL, PostgreSQL
    - DBMS
    - MongoDB
    - RDBMS(MySQL) vs NoSQL(MongoDB)

13. ## Creating a database & mongodb
    - [mongodb docs](https://mongodb.github.io/node-mongodb-native/6.18/)

14. ## Introduction to Project
    - DevTinder

15. ## Microservices vs Monolith - How to Build a Project
    - Waterfall Model (SDLC)
    - 1. Requirements -> Product Manager + Designer
    - 2. Design -> Senior Engineers / Engineering Manager
    - 3. Development -> SDE-1, SDE-2
    - 4. Testing -> SDET
    - 5. Deployment -> DevOps Engineer
    - 6. Maintainance (same lifecycle follows again)
    - Monolith vs Microservices
    - Dev Speed, Code Repo, Scalability, Deployment, Tech Stack,
        Infra Cost, Complexity, Fault Isolation, Testing, Ownership,
        Maintainence, Rewamps, Debugging, Dev Experience

16. ## Features, HLD, LLD & Planning
    - 1. Requirements
        - 1.1. Create an account
        - 1.2. Login
        - 1.3. Update your profile
        - 1.4. Feed Page - explore
        - 1.5. Send connection request
        - 1.6. See our matches
        - 1.7. See the requests we've sent/received
    - 2. Tech planning
        - 2.1. 2 microservices, 1 FE(react), 1 BE(nodeJS, MongoDB)
        - 2.2. DB design, required APIs
        - 2.3. User(firstname, lastname, email Id, password, age, gender,...)
        - 2.4. ConnectionRequest(from userId, to userId, status)
        - 2.5. HTTP methods (get, post, put, patch, delete)
        - 2.6. REST APIs, CRUD operations
            - POST /signup
            - POST /login
            - GET /profile
            - POST /profile
            - DELETE /profile
            - POST /sendRequest
            - POST /reviewRequest
            - GET /requests
            - GET /connections

16. ## Creating our Express Server
    - expressjs - open source framework of nodejs
    - node_modules, package.json, package-lock.json
    - nodemon package

17. ## Routing and Request Handlers
    - app.use(path)
    - app.get(path), app.post(path)
    - ?, +, (), *, regex in path

18. ## Middlewares & Error Handlers
    - next()
    - What is a middleware? Why do we need it?
    - How expressJS handles requests behind the scenes?
    - app.use() vs app.all()
    - (req, res), (req, res, next), (err, req, res, next)

19. ## Database, Schema & Models | Mongoose
    1. mongoose package
    2. first connect to database, then start listening
    3. Mongoose User Schema, User Model

20. ## Diving into the APIs
    1. diff b/w json object and js object
    2. Model.find({}), Model.findOne({ attribute: value}), Model.find({attribute: value}), Model.findByIdAndDelete(id), Model.findByIdAndUpdated(id, newData)
    3. Explore options

21. ## Data Sanitization & Schema Validations
    - required, default, unique, lowercase, trim, minLength, maxLength, validate, runValidators option, timestamps
    - validator package
    - NEVER TRUST THE req.body

22. ## Encrypting Passwords
    - Always create helper functions
    - validate signUp data
    - encrypt password using bcrypt package
    - send only required fields to database
