//”./js/specs/demo-2-perf.js”
const timings = require('timings-client-js');
const perf = new timings.PUtils('perftimings.js');

describe('Demo timings-client', function() {
    it('page performance should be within SLA', function() {
        const perf_params = perf.getApiParams({sla:{pageLoadTime: 3000}, debug: true});
        return perf.getInjectJS('navtiming', 'visual_complete')
            .then((response) => {
                if (response && response.data && response.data.inject_code) {
                    inject_code = response.data.inject_code || '';
                    console.log("Encoded INJECT code: " + JSON.stringify(inject_code, null, 4));
                    return browser
                        .url('http://seleniumhq.org/')
                        .isVisible('#header')
                        .execute('window.performance.mark("visual_complete");')
                        .execute(decodeURIComponent(inject_code))
                        .then((response) => {
                            // Grab the browser's response - has the performance data!
                            if (response.value) {
                                const browser_response = response.value || {};
                                console.log("BROWSER response: " + JSON.stringify(browser_response, null, 4));
                                return perf.navtiming(browser_response, perf_params, null)
                                .then((response) => {
                                        // Grab the API's response - has the assert field!
                                        if (response.data) {
                                            const api_response = response.data || {};
                                            console.log("PERF-API response: " + JSON.stringify(api_response.export.perf, null, 4));
                                            expect(api_response.assert, 'Performance failed! assert field is False').to.be.true;
                                        }
                                    });
                            }
                        })
                }
            });
    });
});
