import csv, json
from country_codes import *

data = {}
years = []

# Add happiness rates to json
with open('../data/happiness.csv', 'rb') as infile:
    reader = csv.reader(infile, delimiter=';', quotechar='"')
    headers = reader.next()

    for row in reader:

        if row[2] not in data:
            data[row[2]] = {"gdp": {}, "happiness": {}}
            years.append(row[2])

        elif (row[2] in data) and (row[0] or row[1] in country_codes):
            data[row[2]]["happiness"][row[1]] = row[3]

    # Append countries with unknown data
    for country in country_codes:
        for year in years:
            if country[1] not in data[year]["happiness"]:
                data[year]["happiness"][country[1]] = "unknown"


    infile.close()


# Add gdp values to json
with open('../data/gdp.csv', 'rb') as infile:
    reader = csv.reader(infile, delimiter=';', quotechar='"')
    headers = reader.next()

    for row in reader:

        # Delete space before country name
        row[0] = row[0][1:]

        # Change country name to country code
        for country in country_codes:
            if row[0] == country[2]:
                row[0] = country[1]


        for i in range(1,10):
            if len(row[0]) == 3:
                data[headers[i]]["gdp"][row[0]] = row[i]


    # Append countries with unknown data
    for country in country_codes:

        for year in years:

            if country[1] not in data[year]["gdp"]:
                data[year]["gdp"][country[1]] = "unknown"

    infile.close()


outfile = open('../project/mapData.json', 'w')

json.dump(data, outfile, ensure_ascii=False, indent=4)
outfile.close()










# with open('../data/happiness.csv', 'rb') as happiness_file, open('../data/gdp.csv', 'rb') as gdp_file
#     open('happiness_gdp.json', 'w') as json_file:
#     happiness_reader = csv.reader(happiness_file, delimiter=';', quotechar='"')
#     gdp_reader = csv.reader(gdp_file, delimiter=';', quotechar='"')
#     headers = reader.next()
