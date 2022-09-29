"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("./index.js");
const app = (0, index_js_1.fastify)();
app.listen({ port: 8000, host: '0.0.0.0' }, (err) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
});
