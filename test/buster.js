var config = module.exports;

config["Front End Loader tests"] = {
    env: "browser",        // or "node"
    rootPath: "../",
    sources: [
        "src/front_end_loader.js",    // Paths are relative to config file
        "test/libs/jquery/1.8.3/jquery.js",
    ],
    tests: [
        "test/*-test.js"
    ],
    resources: ["test/templates/*"]
};