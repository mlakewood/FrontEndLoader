buster.testCase("Front End Loader success", {
    "test_success": function(done){
        var front = Front({pref: buster.env.contextPath + '/test/templates/', 
                           extension: ".html",
                           eyeCatcherStart: "@@",
                           eyeCatcherTerm: ";"
                       });

        assert.equals(front.version, 0.1);

        var list  = ["test_template", "test_template2"];
        front.prefix = buster.env.contextPath + '/test/templates/';



        front.loader(list, function(){
            assert.equals(front.get("test_temp1"), "\n<div><p>test template<p></div>");
            assert.equals(front.get("test_temp2"), "\n<div><p>test template2<p></div>\n");
            assert.equals(front.get("test_temp3"), "\n<div><p>test template3<p></div>");
            done();
        });

    },

    "test_success_trim": function(done){
        var front = Front({pref: buster.env.contextPath + '/test/templates/', 
                           extension: ".html",
                           eyeCatcherStart: "@@",
                           eyeCatcherTerm: ";",
                           trim: true
                       });

        assert.equals(front.version, 0.1);

        var list  = ["test_template", "test_template2"];
        front.prefix = buster.env.contextPath + '/test/templates/';



        front.loader(list, function(){
            assert.equals(front.get("test_temp1"), "<div><p>test template<p></div>");
            assert.equals(front.get("test_temp2"), "<div><p>test template2<p></div>");
            assert.equals(front.get("test_temp3"), "<div><p>test template3<p></div>");
            done();
        });

    }
})