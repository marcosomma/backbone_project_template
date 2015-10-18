/**
 * Created by iMak on 18/05/15.
 */
define([
    'jquery',
    'backbone',
    'text!templates/goodview.html'
], function( $, Backbone, Template ){

    var GoodView = Backbone.View.extend({

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

    return GoodView;
});