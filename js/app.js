
define([
    'jquery',
    'underscore',
    'backbone',
    'router'
], function( $, _, Backbone, Router ){
    var initialize = function(){

        Backbone.View.prototype.close = function(){
            this.onCloseView();
            this.undelegateEvents();
            this.$el.empty();
            this.stopListening();

            return this;
        };

        Backbone.View.prototype.addEvents = function(events) {
            this.delegateEvents( _.extend(_.clone(this.events), events) );
        };

        Backbone.View.prototype.onCloseView = function(){};

        // Pass in our Router module and call it's initialize function
        Router.initialize();
        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});