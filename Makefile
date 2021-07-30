
refresh: clean download

clean:
	rm -rf yuescript.js yuescript.wasm

download:
	wget http://yuescript.org/js/yuescript.js
	wget http://yuescript.org/js/yuescript.wasm
