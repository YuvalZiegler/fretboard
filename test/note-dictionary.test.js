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
    describe('parseIn',function(){
        describe("parseIn('c')", function(){
            it("should equal getChord('C')", function(){
                NoteDictionary.parseIn('c').should.eql(NoteDictionary.getChord('C'));
            })
        }),
        describe("parseIn('c major')", function(){
            it("should equal getScale('C','major')", function(){
                NoteDictionary.parseIn('c major').should.eql(NoteDictionary.getScale('C', 'major'));
            })
        })
    })


})


