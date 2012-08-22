/*global Backbone  */
/**
 * Author: YZ
 * Date: 4/5/12
 * Time: 2:09 PM
 */

var App = (function (App){

    App.start = function(){
        App.router =  new App.Router();
        Backbone.history.start({pushState: true});
    };

    return App;

})(App||{});

App.start();