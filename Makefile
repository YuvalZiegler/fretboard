test:
	@./node_modules/mocha/bin/mocha -R spec

pack-js:
	@echo "---> Creating app.js"
	cat ./license.txt > ./public/javascripts/app.js
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
	cat ./public/javascripts/views/related.js >> ./public/javascripts/app.js
	cat ./public/javascripts/main.js >> ./public/javascripts/app.js
	@echo "---> Creating app.min.js"
	@echo "----> Merging libraries"
	cat ./public/javascripts/libs/jquery.min.js > ./public/javascripts/app.min.js
	cat ./public/javascripts/libs/underscore-min.js >> ./public/javascripts/app.min.js
	cat ./public/javascripts/libs/backbone-min.js >> ./public/javascripts/app.min.js
	cat ./public/javascripts/libs/plugins/jquery.autocomplete-min.js >> ./public/javascripts/app.min.js
	@echo "----> Uglifiying app.js"
	node_modules/uglify-js/bin/uglifyjs --no-seqs ./public/javascripts/app.js >> ./public/javascripts/app.min.js

package:
	make pack-js
	compass compile --force -c compass-production.rb

run:
	make package
	@NODE_ENV=production PORT=8888 node app&
	open http://localhost:8888

.PHONY: run test pack-js package