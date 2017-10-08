"""
Selenium Grid with Hub and Node test
"""
import os
from selenium import webdriver
from timingsclient import Perf

# Setup custom config
CONFIG_FILE = os.path.join(
    os.path.abspath(os.path.dirname(__file__)),
    '', 'config.yaml')

PERF = Perf(CONFIG_FILE)

INJECT_CODE = PERF.injectjs('navtiming')
API_PARAMS = PERF.getapiparams(es_create=False, days=14)

CHROMEDRIVER = "/Users/mverkerk/selenium/chromedriver.exe"

BROWSER = webdriver.Chrome(CHROMEDRIVER)
BROWSER.implicitly_wait(10)
BROWSER.get('http://www.seleniumconf.de')

try:
    BROWSER.find_element_by_class_name('section__heading')
    print("SUCCESS! - Page looks good!")
except:
    print("FAIL! - Functional error!")

if INJECT_CODE is not False:
    TIMING = BROWSER.execute_script(INJECT_CODE)
    NAV_RESP = PERF.navtiming(TIMING, API_PARAMS)

    if NAV_RESP is not False:
        print(
            'PERF was below threshold: ' + str(NAV_RESP['assert']) + ' ',
            str(NAV_RESP['export']['perf']['measured']),
            '/' + str(NAV_RESP['export']['perf']['threshold'])
        )

BROWSER.quit()
