#!/usr/bin/env python
# Name: Chris Olberts
# Student number: 6240305
# SCRAPER.PY

import csv

from datetime import timedelta, date
from pattern.web import URL, DOM

OUTPUT_CSV = 'percentages.csv'

def daterange(start_date, end_date):
    for n in range(int ((end_date - start_date).days)):
        yield start_date + timedelta(n)

start_date = date(2012, 7, 20)
end_date = date(2016, 5, 31)
total_list = []

for single_date in daterange(start_date, end_date):
    TARGET_URL = "https://vertraa.gd/all/daggrafiek/" + single_date.strftime("%d%m%Y")
    def extract_percentages(dom):
        file_url = URL(TARGET_URL)
        file_dom = DOM(file_url.download())

        percentage_list = []
        if file_dom.by_class('percentage'):
            for item in file_dom.by_class('percentage'):
                percentage_list.append(item.content.encode('utf-8'))
            return percentage_list[0]
        else:
            return "nodata"

    # Download the HTML file
    url = URL(TARGET_URL)
    html = url.download()

    # Parse the HTML file into a DOM representation
    dom = DOM(html)

    # Extract the percentage (using the function you implemented)
    percentages = extract_percentages(dom)
    print single_date.strftime("%d-%m-%Y") + " " + percentages
    total_list.append(single_date.strftime("%d-%m-%Y") + " " + percentages)

for item in total_list:
    OUTPUT_CSV.write("%s\n" % item)