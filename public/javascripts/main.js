/*global Backbone _ */

var Fretboard = (function (App){
    // MAIN EVENT DISPATCHER
    App.dispatcher = _.clone(Backbone.Events);

    // State settings
    App.DISPLAY_AS_INTERVALS=false;

    App.displayTypeToggle = function(){
        App.DISPLAY_AS_INTERVALS=!App.DISPLAY_AS_INTERVALS;
        App.dispatcher.trigger("change");
    };

    App.start = function(){
        App.router =  new App.Router();
        Backbone.history.start({pushState: true});
    };

    return App;

})(Fretboard||{});


$().ready(Fretboard.start());