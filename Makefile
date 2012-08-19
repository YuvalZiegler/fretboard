test:
	@./node_modules/.bin/mocha -R spec

setup-compass:
	compass create --sass-dir "./public/stylesheets/sass" --css-dir "./public/stylesheets" --javascripts-dir "./public/javascripts" --images-dir "./public/images"

less:
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

autosave:
	node /usr/local/lib/node_modules/autosave/bin/autosave

graph:
	madge --image graph.png ./node_modules

pack-js:
	cat ./public/javascripts/underscore.config.js > ./public/javascripts/app.js
	cat ./public/javascripts/note-dictionary.js >> ./public/javascripts/app.js
	cat ./public/javascripts/router/router.js >> ./public/javascripts/app.js
	cat ./public/javascripts/models/note.collection.js >> ./public/javascripts/app.js
	cat ./public/javascripts/models/note.model.js >> ./public/javascripts/app.js
	cat ./public/javascripts/models/string.model.js >> ./public/javascripts/app.js
	cat ./public/javascripts/models/string.collection.js >> ./public/javascripts/app.js
	cat ./public/javascripts/models/definition.model.js >> ./public/javascripts/app.js
	cat ./public/javascripts/views/search.js >> ./public/javascripts/app.js
	cat ./public/javascripts/views/note.js >> ./public/javascripts/app.js
	cat ./public/javascripts/views/string.js >> ./public/javascripts/app.js
	cat ./public/javascripts/views/fretboard.js >> ./public/javascripts/app.js
	cat ./public/javascripts/views/definition.js >> ./public/javascripts/app.js
	cat ./public/javascripts/main.js >> ./public/javascripts/app.js
	uglifyjs -nc -nm --no-seqs ./public/javascripts/app.js > ./public/javascripts/app.min.js
	
		
.PHONY: test css style css-prod bootstrap css-to-stylus autosave compass graph