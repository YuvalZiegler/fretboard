REPORTER = spec
test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER)

css:
	lessc ./public/less/style.less ./public/stylesheets/style.css -x

.PHONY: test, css