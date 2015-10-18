/**
 * Created by iMak on 18/05/15.
 */
define([
    'jquery',
    'backbone',
    'text!templates/errorview.html'
], function( $, Backbone, Template ){

    var ErrorView = Backbone.View.extend({

        events: {
        },

        initialize: function() {
            this.render();
        },

        render: function() {
            var model = this.model;
            var t = _.template( Template, model);
            this.$el.html(t);
        }

    });

    return ErrorView;
});