const yuescript = require("./yuescript.js");
const { readFileSync, writeFileSync } = require("fs");

const yue_to_lua = function(source) {
    value = yuescript.tolua(source, false, true, true);
    if(value[0]) return value[0];
    throw new Error(value[1]);
}

function retry() {
    // yuescript needs some warmup...
    if(!yuescript.tolua)
        return setTimeout(retry, 100);
    
    for(const file of process.argv.slice(2)) {
        console.log(`Compiling: ${file}`);
        const content = readFileSync(file);
        const as_lua = yue_to_lua(content);
        writeFileSync(file.substring(0, file.length - 4) + ".lua", as_lua);
    };
}

retry();
