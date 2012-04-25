/**
 * Author: YZ
 * Date: 4/21/12
 * Time: 11:12 AM
 */
require('should');
_ = require('../public/javascripts/libs/underscore.js');
NoteDictionary = require('../public/javascripts/note-dictionary.js');

describe('NoteDictionary', function(){


    // Parse input string and return a scale or a chord - case-insensitive
    describe('parseQuery',function(){
        describe("parseQuery('c')", function(){
            it("should equal getChord('C')", function(){
                NoteDictionary.parseQuery('c').should.eql(NoteDictionary.getChord('C'));
            })
        }),
        describe("parseQuery('c# major')", function(){
            it("should equal getScale('C#','major')", function(){
                NoteDictionary.parseQuery('c# major').should.eql(NoteDictionary.getScale('C#', 'major'));
            })
        })
    }),

    describe('getChordsOfScale("c major")', function(){

        it("should return all chords in C major", function(){
              NoteDictionary
                  .getChordsOfScale("C major")
                    .should.eql
                  (["C","Dm","Em","F", "G", "Am", "Bdim"])
          })
    }),
    describe('getChordsOfScale("c# major", true)', function(){

            it("should return all chords in C major as objects array", function(){
                NoteDictionary
                    .getChordsOfScale("C# major",true)
                    .should.be.instanceof(Array)
            })
    }),
    describe('getScalesOfChord("Adim")', function(){
        it("should return all the scales the chord apears in", function(){
            NoteDictionary
                .getScalesOfChord("Adim7")
                .should.eql(
            ["A pentatonic", "A diminished", "A Locrian", "A# major", "C diminished", "C dorian", "D phrygian", "D# diminished", "D# lydian", "F mixolydian", "F melodic major", "F# diminished", "G Aeolian", "G harmonic major", "G melodic major", "G minor"]
            )
        })
    })


})


