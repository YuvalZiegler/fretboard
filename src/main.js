// Import dependencies
import jQuery from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

// Make dependencies globally available (legacy code expects globals)
window.$ = window.jQuery = jQuery;
window._ = _;
window.Backbone = Backbone;

// Set jQuery on Backbone
Backbone.$ = jQuery;

// Import the autocomplete plugin
import './plugins/jquery.autocomplete.js';

// Initialize global Fretboard namespace
window.Fretboard = {};
window.NoteDictionary = {};

// Import app modules in order
import './note-dictionary.js';
import './router/router.js';
import './models/note.collection.js';
import './models/note.model.js';
import './models/string.model.js';
import './models/string.collection.js';
import './models/definition.model.js';
import './views/search.js';
import './views/note.js';
import './views/string.js';
import './views/fretboard.js';
import './views/definition.js';
import './views/related.js';
import './app.js';

// Start the app when DOM is ready
jQuery(document).ready(function() {
  Fretboard.start();
});
