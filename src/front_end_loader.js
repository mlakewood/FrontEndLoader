/*
Front-end Loader javascript library

A simple library to load all your javscript templates upfront and keep them around
for instant access.

Inspired by http://coenraets.org/blog/2012/01/backbone-js-lessons-learned-and-improved-sample-app/

Author: Mark Lakewood
*/

// Top level namespace
var Front = function(config){
    // version of library
    var _version = 0.1;

    var _templates = {};

    var _path = config.path;
    var _extension = config.extension;
    var _eyeCatcherStart = config.eyeCatcherStart;
    var _eyeCatcherTerm = config.eyeCatcherTerm;
    var _trim = config.trim || false;
 
    // Recursively pre-load all the templates for the app.
    // This implementation should be changed in a production environment:
    // All the template files should be concatenated in a single file.
    function loader(names, callback) {
        index = 0;

        var self = this;
        var loadTemplate = function(index) {
            var name = names[index];
            

            var request = $.get(_path + name + _extension)

            request.success(function(data, status, jqXHR) {
                _parseFile(data, name, self);
                index++;
                if (index < names.length) {
                    loadTemplate(index);
                } else {
                    callback();
                }
            });

            request.error(function(jqXHR, textStatus, errorThrown){
            });
        };
 
        loadTemplate(0);
    };

    function _parseFile(text, name, self){
        var template = {};
        var templateStart = 0;
        var templateCount = 0;
        
        // As we have multiple places where the template gets pushing into
        // the data structure, this is the function to call to do that.
        var _saveContents = function(){
            template.contents = text.substring(templateStart, i);
            if(self.trim === true){
                self.templates[template.name] = template.contents.trim(); 
            }else{
                self.templates[template.name] = template.contents;
            }
            templateCount++;
        }

        for(var i = 0; i < text.length; i++){
            // is this the start of the eyeCatcher
            if(text.substr(i, _eyeCatcherStart.length) === _eyeCatcherStart){
                // if this is not the first template we have come across save the template away
                if(template.name != undefined){
                    _saveContents();
                }

                // set up for finding the token
                template.name = undefined;
                template.contents = undefined;
                var tokenStart = i + _eyeCatcherStart.length;
            }

            // is this the end of the eyeCatcher
            if(tokenStart !== undefined && text.substr(i, _eyeCatcherTerm.length) === _eyeCatcherTerm){
                //set up for getting the contents of the following template.
                template.name = text.substring(tokenStart, i);
                template.contents = "";
                templateStart = i + 1;

                tokenStart = undefined;
            }

        }
        // The last template will not be populated because we dont hit the eyeCatcher again,
        // So add the rest of the text to the last known name
        if(template.name != undefined){
            _saveContents();
        }

        if(templateCount === 0){
            throw new Error("No eyeCatcher found in template " + name);
        }
    }

    // Get template by name from hash of preloaded templates
    function get(name) {
        var template = this.templates[name];
        if(template === undefined){
            throw new Error('There is no template called ' + name + ' available to be loaded');
        }
        return template;
    };

    return {
        version: _version,
        templates: _templates,
        path: _path,
        extension: _extension,
        eyeCatcherStart: _eyeCatcherStart,
        eyeCatcherTerm: _eyeCatcherTerm,
        trim: _trim,
        loader: loader,
        get: get
    };

};