require.config({
    // The shim config allows us to configure dependencies for
    // scripts that do not call define() to register a module
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        }
    },
    kinetic: {
        deps: [
            'jquery'
        ],
        exports: 'kineticJS'
    },
    paths: {
        jquery: 'libs/jquery',
        underscore: 'libs/underscore',
        backbone: 'libs/backbone',
        localstorage: 'libs/backbone.localStorage',
        text: 'libs/require/text',
        kinetic: 'libs/kinetic',
        templates: '../templates'
    }
});

require([
    // Load our app module and pass it to our definition function
    'app',

], function(App){
    // The "app" dependency is passed in as "App"
    // Again, the other dependencies passed in are not "AMD" therefore don't pass a parameter to this function
    App.initialize();
});