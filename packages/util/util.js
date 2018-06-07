const fs = require('fs');
const path = require('path');

const logSomething = something => {
    console.log(something);
    return something;
}

module.exports = {
    logSomething
}