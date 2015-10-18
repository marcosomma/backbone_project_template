define([
    'jquery',
    'underscore',
    'backbone',
    'views/GoodView',
    'views/ErrorView',
    'models/model'
], function( $, _, Backbone, GoodView, ErrorView, GenericModel) {

    var AppRouter = Backbone.Router.extend({

        routes: {
            '':             'init',
            'good':         'get_good_model',
            'search':       'get_search_model',
            'error':        'get_error_model'
        },

        init: function() {
            $('#good').on('click', _.bind(this.on_click, this));
            $('#error').on('click', _.bind(this.on_click, this));
            $('#search').on('click', _.bind(this.on_click, this));
            this.clear_local_storage();
            this.previus = '';
        },

        on_click: function(e) {
            e.preventDefault();
            var myUrl = window.location.origin;
            switch(e.currentTarget.id){
                case 'good':
                    myUrl += "/#" + e.currentTarget.id;
                    this.previus = 'good';
                    break;
                case 'error':
                    myUrl += "/#" + e.currentTarget.id;
                    this.previus = 'error';
                    break;
                case 'search':
                    myUrl += "/#" + e.currentTarget.id;
                    if(this.previus === 'search'){Backbone.history.loadUrl(Backbone.history.fragment);}
                    this.previus = 'search';
                    break;
            }

            window.location.replace(myUrl);
        },

        get_good_model: function() {
            var that = this;
            this.model = new GenericModel();
            this.model.url = 'https://athena-7.herokuapp.com/ancients.json';
            this.model.fetch({

                success: function() {

                    var model = {gods: {}};
                    for(var obj in that.model.toJSON()){
                        var god = that.model.toJSON()[obj];
                        model.gods[obj] = that.capitalize_result(god);
                    }

                    return that.show_good_view(model);
                }
            });
        },

        get_search_model: function() {
            var that = this;
            var search_txt = $( "#search-txt").val();
            if (search_txt.length === 0){ return this.show_error_view("No one God found with this name ' " + search_txt + " ' !")}

            var ls_value = this.check_local_storage('search='+ search_txt);
            if (ls_value != null){ return this.show_good_view(ls_value)}

            this.model = new GenericModel();
            this.model.url = 'https://athena-7.herokuapp.com/ancients.json?search='+ search_txt;
            this.model.fetch({

                success: function() {

                    if(that.model.toJSON()['ancients'].length === 0) { return that.show_error_view("No one God found with this name '" + search_txt + "' !")}

                    var model = {gods: {}};
                    for (var obj in that.model.toJSON()['ancients']) {
                        var god = that.model.toJSON()['ancients'][obj];
                        model.gods[obj] = that.capitalize_result(god);
                    }

                    window.localStorage.setItem('search='+ search_txt, JSON.stringify(model));

                    return that.show_good_view(model);
                }
            });
        },

        get_error_model: function() {
            var that = this;
            this.model = new GenericModel();
            this.model.url = 'https://athena-7.herokuapp.com/ancients.json?error=true';
            this.model.fetch({

                success: function() {

                    console.log(that.model)
                },

                error: function(err) {
                    var xhr = that.model.save();
                    xhr.fail(function () {
                        try {
                            // Assuming you are returning json error response like ["Error desc 01","Error desc 02"]
                            //errors = JSON.parse(xhr.responseText);
                            return that.show_error_view(xhr.statusText)
                            alert(errors.join("\n"));
                        } catch(e) {
                            // Unknown error cause
                            alert("The server failed to respond, please try again later.");
                        }
                    });
                    //return that.show_error_view(that.model.error)
                }
            });
        },

        show_good_view: function(model) {
            new GoodView({ el: '#content-wrapper', model: model });
        },

        show_error_view: function(message) {
            this.model = new GenericModel();
            this.model = {"error":message};

            new ErrorView({ el: '#content-wrapper', model: this.model });
        },

        check_local_storage: function(key) {
            var string_in_storage = window.localStorage.getItem(key);

            if(string_in_storage != null){
                var stored_model = JSON.parse(string_in_storage);
                return stored_model
            } else {
                return null
            }
        },

        capitalize_result:function(obj){
            var god = {}
            for(var elem in obj){
                god[elem] = obj[elem].toUpperCase()
            }
            return god
        },

        clear_local_storage:function(obj){
            window.localStorage.clear();
        }

    });

    var initialize = function(){
        app_router = new AppRouter;
    };

    return {
        initialize: initialize
    };
});