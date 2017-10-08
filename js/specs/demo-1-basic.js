//”./js/specs/demo-1-basic.js”

describe("Basic Selenium JS example test", function() {    
    it("should navigate to the SeleniumHQ homepage", function(){
        return browser
            .url("http://www.seleniumhq.org/")
            .isVisible('#header');
    });
}) ;
