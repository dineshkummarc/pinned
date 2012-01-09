(function(){

  // Set blank object
  window.Pinned = {};

  // Set session default to false
  Pinned.status = false;

  // Set template helper
  Pinned.template = function(){
    var element = $("#" + arguments[0] + "-template"),
        data = typeof arguments[1] === "object" ? arguments[1] : {},
        onComplete = typeof arguments[2] === "function" ? arguments[2] : null,
        results = element.html(),
        i;

    for(i in data) {
      results = results.replace("{{" + (arguments[0] || "item") + "." + i + "}}", data[i]);
    };

    // return onComplete function with element, data, and markup
    return onComplete(results);
  };

  // Set initializer
  Pinned.init = function(){
    head.ready(function(){
      
      var body = $("body"), 
          content = body.find("#wrap .content");

      // Login
      if (!Pinned.status) {
        Pinned.template("login", {}, function(res){
          content.append(res);
        });
      };
      
      // Home
      if (Pinned.status) {
        $.ajax({
          url : "/keys",
          dataType : "json",
          success : function(res){
            var len = res.length,
                i = 0;
            for ( ; i < len; i++) {

              var title = res[i].split("/")[res[i].split("/").length - 1] || res[i],
                  sub = res[i].split("/")[2].replace(".com", ""),
                  url = res[i];

              Pinned.template("pin", { 
                  sub : sub, 
                  title : title == "#" ? url.replace("/#", "") : title, 
                  href : url, 
                  image : "http://www.gametab.it/wp-content/uploads/2010/10/starwars_hero-300x144.jpg" 
                }, function(html){
                  content.append(html)
              });
            };
          }
        })
      };

    });
  };

  // Run app
  Pinned.init();

})();
