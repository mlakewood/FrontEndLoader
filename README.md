Front End Loader
================

What problem does this library solve?
-------------------------------------

This library allows the easy loading of all front end templates at one time, but asynchronously. Thus it follows the load in once, always have it around performance pattern.
After loading all the templates, its as easy as calling the libraries `get()` method and passing in the template name, and it will be immediatly fetched from memory instead of asynchronously across the wire.
This means your view code (or however you normally get your templates) is much simpler at a slight upfront cost of load time and memory.

The load time is also offset by the library in that you can concatenate all your templates into one file and only load that. The library given the right eye catcher and terminator will then parse out each template as normal. This means in developement you can have all your templates split up, and in production have them all in the same file.

Show me the templates??
-----------------------

So an example.

His is a simple template
```
@@simple_template;
<div>
    <p>Hello World</p>
</div>
```

You'll notice the line "@@simple_template;" at the top of the file. Every template must have a line like this. It determines the name of the template to be used
when retrieving it from the Front End Loader object.

And here is what a simple index.html file would look like
```
<html>
    <head>
        <script src="jquery-1.8.3.js" type="text/javascript"></script>
        <script src="front_end_loader.js" type="text/javascript"></script>
    </head> 
    <body>
        <script type="text/javascript">
            $(document).ready(function(){
                var front = Front({path: 'static/templates/', 
                           extension: ".html",
                           eyeCatcherStart: "@@",
                           eyeCatcherTerm: ";"
                       });)
                front.loader(['home_template', 'nav_template'], function(){
                    app.start();
                    console.log(front.get('simple_template'));
                })
            });

        </script>
    </body>
<html>
```

There is minimal configuration needed. They are

 - path: This is the path where all your templates can be found

 - extension: The extension used by all your templates

 - eyeCatcherStart: The sequence of characters that is used to determine that this is the start of the eyeCatcher. In the Case above it is the characters "@@"

 - eyeCatcherTerm: The sequence of characters that is used to determine that the eyecatcher has finished. In the case above it is ';'

With an optional:
 - trim: defaults to false. Setting to true trims whitespace off the start and end of the template (uses Trim() javascript function, May not be available everywhere)

Once you have loaded all templates you can then get them out of the object by calling the `get()` method as shown above.

