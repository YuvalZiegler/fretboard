REPORTER = spec
test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER)

less-to-css:
	@lessc ./public/stylesheets/less/style.less ./public/stylesheets/style.css -x --yui-compress
	@echo DONE!

css:
	@./node_modules/stylus/bin/stylus -l -w -u nib ./public/stylesheets/stylus/style.styl --out ./public/stylesheets/

css-prod:
	@./node_modules/stylus/bin/stylus -c -u nib ./public/stylesheets/stylus/style.styl --out ./public/stylesheets/

bootstrap:
	@./node_modules/stylus/bin/stylus -c -w -u bootstrap-stylus ./public/stylesheets/stylus/style.styl --out ./public/stylesheets/

css-to-stylus:
	@./node_modules/stylus/bin/stylus --css ./public/stylesheets/style.css ./public/stylesheets/stylus/style.styl
	@echo Converted CSS to Styl

build: 		
.PHONY: test, css, style