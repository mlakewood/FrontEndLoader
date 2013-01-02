/*
Front-end Loader javascript library

A simple library to load all your javscript templates upfront and keep them around
for instant access.

Inspired by http://coenraets.org/blog/2012/01/backbone-js-lessons-learned-and-improved-sample-app/

Author: Mark Lakewood
*/

// Top level namespace
var Front = {
    // version of library
    version: 0.1,

    templates: [],

    prefix: '/templates/',

    extension: '.html',
 
    // Recursively pre-load all the templates for the app.
    // This implementation should be changed in a production environment:
    // All the template files should be concatenated in a single file.
    loader: function(names, callback) {
 
        var self = this;

        var loadTemplate = function(index) {
            var name = names[index];
            console.log('Loading template: ' + name);
            $.get(self.prefix + name + self.extension, function(data) {
                self.templates[name] = data;
                index++;
                if (index < names.length) {
                    loader(index);
                } else {
                    callback();
                }
            });
        };
 
        loader(0);
    },

    // Get template by name from hash of preloaded templates
    get: function(name) {
        var template = this.templates[name];
        if(template === undefined){
            throw new Error('There is no template called ' + name + ' available to be loaded');
        }
        return template;
    }

};