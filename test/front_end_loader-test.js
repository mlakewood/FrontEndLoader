buster.testCase("My Thing", {
    "test": function(){
        assert.equals(Front.version, 0.1);

        var list  = ["test_templates"];
        Front.loader(list);

    }
})