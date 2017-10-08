//”./js/specs/demo-2-perf.js”
const perf = require('timings-client-js');

describe('Demo cicd-perf-api', function() {
    it('page performance should be within SLA', function() {
        const perf_params = perf.getApiParams({sla:{pageLoadTime: 3000}, debug: true});
        return perf.getInjectJS('navtiming', 'visual_complete')
            .then((response) => {
                console.log('getInjectJS: ' + JSON.stringify(response.data));
                injectCode = response.data.inject_code;
                return browser
                    .url('http://seleniumhq.org/')
                    .isVisible('#header')
                    .execute('window.performance.mark("visual_complete");')
                    .execute(decodeURIComponent(injectCode))
                    .then((response) => {
                        // Grab the browser's response - has the performance data!
                        // console.log('timing: ' + JSON.stringify(response));
                        console.log('params: ' + JSON.stringify(perf_params));
                        var injectResponse = response.value;
                        return perf.navtiming(injectResponse, perf_params)
                        .then((response) => {
                                // Grab the API's response - has the assert field!
                                console.log('navtiming: ' + JSON.stringify(response.data));
                                var apiResponse = response.data;
                                expect(apiResponse.assert).to.be.true;
                            });
                    })
            });
    });
});