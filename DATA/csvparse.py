import csv
with open('Book1.csv', 'rb') as f:
    reader = csv.reader(f)
    lijstje = map(tuple, reader)

    list_total = []
    for row in lijstje:
        list_total.append(row)

print set(list_total)
