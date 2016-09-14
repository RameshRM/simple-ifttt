REPORTER = spec
ESLINT = ./node_modules/.bin/eslint
ISTANBUL = ./node_modules/.bin/istanbul
BASE = .

all: lint test

test:
	@NODE_ENV= ./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		--timeout 20s
lint:
	$(ESLINT) ./lib/ ./test/

cover:
	rm -rf ./coverage && \
	$(ISTANBUL) cover ./node_modules/.bin/_mocha -- -u exports -R spec ./test/*.js

coverreport:
	open ./coverage/lcov-report/index.html

.PHONY: test lint
