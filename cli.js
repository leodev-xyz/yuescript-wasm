const yuescript = require("./yuescript.js");
const { readFileSync, writeFileSync } = require("fs");

const yue_to_lua = function(source) {
    value = yuescript.tolua(source, false, true, true);
    if(value[0]) return value[0];
    throw new Error(value[1]);
}

setTimeout(() => {
    for(const file of process.argv.slice(2)) {
        console.log(`Compiling: ${file}`);
        const content = readFileSync(file);
        const as_lua = yue_to_lua(content);
        writeFileSync(file.substring(0, file.length - 4) + ".lua", as_lua);
    };
}, 100); // 100ms delay is required for yuescript to warmup
