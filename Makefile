#
# Makefile for keycomb.js
#
# @author Olof Kihlberg <olof.kihlberg@gmail.com>
#

GCC := build-tools/gcc.jar
OBJECTS := dist/keycomb.js

build: $(OBJECTS)

test:
	@./node_modules/mocha/bin/mocha --reporter spec

clean:
	@rm -rf dist/*

dist/%.js: src/%.js
	@cp $< $@
	@java -jar $(GCC) --js $< --js_output_file dist/$*.min.js

.PHONY: build test clean
