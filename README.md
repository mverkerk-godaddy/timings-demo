# cicd-perf-api-demo
Sample Selenium tests to demonstrate the `cicd-perf-api` solution

## Installation
To install, you can clone the repo using `git clone` and install JavaScript dependencies with `npm i` (**run this from the `js` sub-folder!**) and the Python dependencies with `pip`:

```bash
$ git clone git@github.secureserver.net:mverkerk/cicd-perf-api-demo.git
$ cd {rootFolder}/js
$ npm i
```
```bash
$ pip install cicdperfclient selenium
```

## Configuration for JavaScript tests
Before running tests, you have to configure the default parameters by editing the config file `{rootFolder}/.cicdperfjs`. The most important settings to change are:
|key|description|example|
|-|-|-|
|`PERF_API_URL`|Full URL of the API|`"http://my_api_server:3000/v2/api/cicd/"`|
|`api_params.flags.esCreate`|Save results to ElasticSearch|`true`|
|`api_params.log.test_info`|Save results to ElasticSearch|`My test`|
|`api_params.log.env_tester`|Save results to ElasticSearch|`local`|
|`api_params.log.browser`|Save results to ElasticSearch|`Chrome`|
|`api_params.log.env_target`|Save results to ElasticSearch|`prod`|
|`api_params.log.team`|The name of your team/product|`MY_PRODUCT`|

## Running JavaScript tests (uses webdriverIO)

To run the all of the JS tests, run the following command:

```bash
$ cd {rootFolder}/js
$ node_modules/webdriverio/bin/wdio wdio.conf.js
```

Or, to run indivisual JS tests, you can run this command:

```bash
$ cd {rootFolder}/js
$ node_modules/webdriverio/bin/wdio --spec ./specs/{spec file}.js wdio.conf.js
```

## Configuration for Python tests
Before running tests, you have to configure the default parameters by editing the config file `{rootFolder}/py/config.yaml`. The most important settings to change are:
|key|description|example|
|-|-|-|
|`PERF_API_URL`|Full URL of the API|`"http://my_api_server:3000/v2/api/cicd/"`|
|`api_params.flags.esCreate`|Save results to ElasticSearch|`true`|
|`api_params.log.test_info`|Information about the test|`My test`|
|`api_params.log.env_tester`|Environment of the test machine|`local`|
|`api_params.log.browser`|The browser being used for the test|`Chrome`|
|`api_params.log.env_target`|Environment of the target (usually dev|test|prod)|`prod`|
|`api_params.log.team`|The name of your team/product|`MY_PRODUCT`|

## Running Python test
Then, to run the Python tests, simply run:

```bash
$ cd {rootFolder}/py
$ python demo_2_perf.py
```
