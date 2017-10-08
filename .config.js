/*
This file contains the default parameters for the API
Below values will be used if they are not provided by the test script!

Please set PERF_API_URL to the correct address of the API!!

*/

module.exports = {
    "PERF_API_URL": "http://localhost/v2/api/cicd/",
    "api_params": {
        "sla": {
            "pageLoadTime": 5000
        },
        "baseline": {
            "days": 7,
            "perc": 75,
            "padding": 1.2
        },
        "flags": {
            "assertBaseline": true,
            "debug": false,
            "esTrace": false,
            "esCreate": false,
            "passOnFailedAssert": false
        },
        "log": {
            "test_info": "Sample test_info-JS",
            "env_tester": "Sample tester",
            "browser": "Sample browser",
            "env_target": "Sample target",
            "team": "SAMPLE TEAM"
        }
    }
};
