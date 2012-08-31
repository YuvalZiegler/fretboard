\test:
	@./node_modules/mocha/bin/mocha -R spec


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
	
		
.PHONY: test pack-js