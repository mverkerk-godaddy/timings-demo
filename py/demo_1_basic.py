"""
Simple test to demonstrate Selenium
"""
from selenium import webdriver

CHROMEDRIVER = "/Users/mverkerk/selenium/chromedriver.exe"

BROWSER = webdriver.Chrome(CHROMEDRIVER)
BROWSER.implicitly_wait(10)
BROWSER.get("http://www.seleniumconf.de")

try:
    BROWSER.find_element_by_class_name("section__heading")
    print("SUCCESS! - Page looks good!")
except:
    print("FAIL! - Functional error!")

BROWSER.quit()
