require('should');
//var app = require('../app')
_ = require('underscore');
Backbone = require('backbone');
var dict = require('../public/javascripts/note-dictionary.js');

describe('NoteDictionary', function(){
  
  it('should be an object', function(){
      dict.should.be.a('object');
  });
  
  describe('.getAllDefinitions()', function(){
    it('should be an Array', function(){
        dict.getAllDefinitions().should.be.an.instanceOf(Array);
    });
  });

  describe('.parseQuery("C")', function(){    
    it('should return a C major chord', function(){        
        //console.log(dict.parseQuery('C'));
        dict.parseQuery('C').should.have.property('chord', 'major');
    });
  });


});


/* FUNCTIONS
• getAllDefinitions: 
    a list of all the chord and scale names used to populate the autocomplete plugin
• parseQuery
    parses a plain english text and calls the appropriate getter (getScale / getChord)
• getScale
• getChord
• getChordsOfScale
    return all chords in particular scale
• isChordInScale
• getScalesOfChord
    returns all the scale a chord apears in
*/