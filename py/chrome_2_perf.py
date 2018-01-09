"""
Selenium Grid with Hub and Node test
"""
import os
import platform
from selenium import webdriver
from timingsclient import Perf

BROWSER = webdriver.Chrome('/Users/mverkerk/selenium/chromedriver_2.34.exe')
BROWSER.get('http://www.seleniumconf.de/test?test=strip_this')

try:
    BROWSER.find_element_by_class_name('section__heading')
    print("FUNCTIONAL: Page looks good!")
except:
    print("FUNCTIONAL: Page not working!")

# Setup custom config for PERF
CONFIG_FILE = os.path.join(os.path.abspath(os.path.dirname(__file__)), '', 'config.yaml')
# Initiate client
PERF = Perf(CONFIG_FILE)

# Get inject code from API
INJECT_CODE = PERF.injectjs(inject_type="navtiming", mark="visual_complete", strip_qs=True)

# Get parameters for navtiming call
API_PARAMS = PERF.getapiparams(es_create=False, log={
    'browser': BROWSER.name, 'env_tester': platform.system()})

if INJECT_CODE is not False:
    # Get perf data from browser object
    TIMING = BROWSER.execute_script(INJECT_CODE)
    # Send perf data with parameters to API
    NAV_RESP = PERF.navtiming(TIMING, API_PARAMS)

    # Assert perf result
    if NAV_RESP is not False:
        print(
            'PERFORMANCE of [' + NAV_RESP["export"]["dl"] + '] was ',
            ('GOOD' if NAV_RESP['assert'] is True else "BAD") + '! - ',
            str(NAV_RESP['export']['perf']['measured']),
            '/ ' + str(NAV_RESP['export']['perf']['threshold'])
        )
    else:
        print("NAV_RESP problem!")
else:
    print("INJECT_CODE problem!")

BROWSER.close()
