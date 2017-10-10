"""
Simple test to demonstrate Selenium
"""
from selenium import webdriver

BROWSER = webdriver.Chrome(
    '/Users/mverkerk/selenium/chromedriver.exe')
BROWSER.get('http://www.seleniumconf.de')

try:
    BROWSER.find_element_by_class_name('section__heading')
    print("FUNCTIONAL: Page looks good!")
except:
    print("FUNCTIONAL: Page sucks!")

BROWSER.close()
