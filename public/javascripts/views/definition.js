/*global Backbone, _, NoteDictionary */
var Fretboard = (function (App) {

    App.DefinitionView = Backbone.View.extend({

        template: $('#definitionTemplate').html(),

        initialize: function(){
            _.bindAll(this, 'render');
            this.model.bind('change', this.render);
            App.dispatcher.bind('displayToggle', this.render);
        },

        render: function(){

            var json = this.model.toJSON();
            this.$el.html(_.template(this.template, json));
            return this;
        }
    });
    return App;
})(Fretboard || {});