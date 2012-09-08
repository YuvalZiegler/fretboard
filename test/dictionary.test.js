require('should');
_ = require('../public/javascripts/libs/underscore.js');
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
