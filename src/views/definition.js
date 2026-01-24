var Fretboard = (function (App) {

    App.DefinitionView = Backbone.View.extend({

        initialize: function(){
            _.bindAll(this, 'render');
            this.template = $('#definitionTemplate').html();
            this.model.bind('change', this.render);
            App.dispatcher.bind('displayToggle', this.render);
        },

        render: function(){
            var json = this.model.toJSON();
            this.$el.html(_.template(this.template)(json));
            return this;
        }
    });
    return App;
})(window.Fretboard || {});

window.Fretboard = Fretboard;
