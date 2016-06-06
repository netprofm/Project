
# Name: Chris Olberts
# Student number: 6240305
# SCRAPING.PY
'''
This script scrapes IMDB and outputs a CSV file with highest ranking tv series.
'''
# IF YOU WANT TO TEST YOUR ATTEMPT, RUN THE test-tvscraper.py SCRIPT.
import csv

from pattern.web import URL, DOM

TARGET_URL = "https://vertraa.gd/all/daggrafiek/20072012"
OUTPUT_CSV = 'percentages.csv'

percentage_list = []

def extract_percentages(dom):
    
    file_url = URL(TARGET_URL)
    file_dom = DOM(file_url.download())
      
    # retrieve rankings...        
    for rank in file_dom.by_tag("h1.percentage"):
        # ... and store them in a list
        ranking_list.append(rank.content[:-1])
    
def save_csv(f, percentages):
    '''
    Output a CSV file containing highest ranking TV-series.
    '''
    writer = csv.writer(f)
    writer.writerow(['Percentage'])
    
if __name__ == '__main__':
    # Download the HTML file
    url = URL(TARGET_URL)
    html = url.download()

    # Save a copy to disk in the current directory, this serves as an backup
    # of the original HTML, will be used in testing / grading.
    with open(BACKUP_HTML, 'wb') as f:
        f.write(html)

    # Parse the HTML file into a DOM representation
    dom = DOM(html)
    
    # Extract the tv series (using the function you implemented)
    percentages = extract_percentages(dom)

    # Write the CSV file to disk (including a header)
    with open(OUTPUT_CSV, 'wb') as output_file:
        save_csv(output_file, percentages)
