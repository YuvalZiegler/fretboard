/*global Backbone _ NoteDictionary */
var App = (function (App) {

    App.ChordDefinitionView = Backbone.View.extend({

        el: '#chord-definition',
        template: $('#definitionTemplate').html(),

        initialize: function(){
            _.bindAll(this, 'render');
            this.model.bind('change', this.render);
            //$('#definitionTemplate').remove();
        },

        render: function(){
            var json = this.model.toJSON();
            $(this.el).html(_.template(this.template, json));
            return this;
        }
    });
    return App;
})(App || {});