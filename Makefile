test:
	@./node_modules/mocha/bin/mocha -R spec

pack-js:
	@echo "---> Creating app.js"
	cat ./public/javascripts/note-dictionary.js > ./public/javascripts/app.js
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
	cat ./public/javascripts/views/related.js >> ./public/javascripts/app.js
	cat ./public/javascripts/main.js >> ./public/javascripts/app.js
	@echo "---> Creating app.min.js"
	@echo "----> Merging libraries"
	cat ./public/javascripts/libs/jquery-1.8.1.min.js > ./public/javascripts/app.min.js
	cat ./public/javascripts/libs/underscore-min.js >> ./public/javascripts/app.min.js
	cat ./public/javascripts/libs/backbone-min.js >> ./public/javascripts/app.min.js
	cat ./public/javascripts/libs/jquery.autocomplete-min.js >> ./public/javascripts/app.min.js
	@echo "----> Uglifiying app.js"
	uglifyjs -nc --no-seqs ./public/javascripts/app.js >> ./public/javascripts/app.min.js

package:
	make pack-js
	compass

.PHONY: test pack-js package