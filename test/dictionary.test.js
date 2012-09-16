/*global describe it _ */
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
        var result = dict.parseQuery('C');
        describe("resulting objects:" , function(){
            it('should have an intervals Array', function(){
                result.intervals.should.be.an.instanceOf(Array);
            });
            it('should have an notes Array', function(){
                result.notes.should.be.an.instanceOf(Array);
            });

        });
        describe('should return a C major chord', function(){
            it('isScale property should be false',function(){
                result.isScale.should.be.false;
            });
            it('"key" property should equal "C"',function(){
                result.should.have.property('key', 'C');
            });
            it('"chord" property should equal "major"',function(){
                result.should.have.property('chord', 'major');
            });


        });
    });

    describe('.parseQuery("C major")', function(){
        var result = dict.parseQuery('C major');
        describe('should return a C major scale', function(){
            it('isScale property should be true',function(){
                result.isScale.should.be.true;
            });
            it('"key" property should equal "C"',function(){
                result.should.have.property('key', 'C');
            });
            it('"scale" property should equal "major"',function(){
                result.should.have.property('scale', 'major');
            });

        });
    });

    describe('.parseQuery("Gb minor")', function(){
        var result = dict.parseQuery('Gb major');
        describe('should return Gb major scale',function(){
            it('isScale property should be true',function(){
                result.isScale.should.be.true;
            });
            it('"key" property should equal "Gb"',function(){
                result.should.have.property('key', 'Gb');
            });
            it('"scale" property should equal "minor"',function(){
                result.should.have.property('key', 'Gb');
            });
            it("should return these notes: 'F#/Gb', 'G#/Ab', 'A#/Bb', 'B', 'C#/Db', 'D#/Eb', 'F'", function(){
                result.notes.should.eql([ 'F#/Gb', 'G#/Ab', 'A#/Bb', 'B', 'C#/Db', 'D#/Eb', 'F' ]);
            });

        });
    });


    describe('.getScalesOfChord("Amaj13")',function(){
        var result = dict.getScalesOfChord("Amaj13");
        describe('should return all scales that have the Amaj13 chord in in them', function(){
            it('should be an array',function(){
                result.should.be.an.instanceOf(Array);
            });
            it('should include the A major scale',function(){
                result.should.include("A major");
            });
        });
    });

});