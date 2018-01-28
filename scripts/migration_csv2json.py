import csv, json
from country_codes import *

data = {"2010": {}, "2015": {}}
total_emigrations_2010 = {}
total_emigrations_2015 = {}

emigration_dict = {"2010": {}, "2015": {}}


# Function saves all immigration and emigration data from a row
def read_row(year, data, total_emigrations):
    country_code = None
    total = 0
    total_other_immigration = 0
    total_other_emigration = 0
    emigration_others = []
    immigration_others = []

    if row[0] == year:

        # Change country names to country codes
        for country in country_codes:
            if row[2] == country[2]:
                country_code = country[1]
                country_name = country[2]

        # Add existing data to dictionary
        if country_code in data[year]:

            for i in range(6, 238):
                total_emigration = total_emigrations.get(headers[i], "none")
                if row[i] != "..":

                    # Append immigration data if value is more than 10 percent of total
                    if int(row[i]) > (0.05 * int(row[3])):
                        data[year][country_code]["immigration"].append({"country": headers[i], "value": row[i], "name": headernames[i]})

                    else:
                        total_other_immigration += int(row[i])
                        immigration_others.append({"country": headers[i], "value": row[i], "name": headernames[i]})

                    # Append emigration data if value is more than 10 percent of total
                    if int(row[i]) > (0.05 * int(total_emigration)):
                        data[year][headers[i]]["emigration"].append({"country": country_code, "value": row[i], "name": country_name})

                    else:
                        if headers[i] not in emigration_dict[year]:
                            emigration_dict[year][headers[i]] = {"list": [], "total": 0}

                        emigration_dict[year][headers[i]]["list"].append({"country": country_code, "value": row[i], "name": country_name})
                        emigration_dict[year][headers[i]]["total"] += int(row[i])


            # Append dictionary of other countries
            data[year][country_code]["immigration"].append({"country": "Others", "value": total_other_immigration, "info": immigration_others})


def insert_emigration(year):
        value = emigration_dict[year][headers[i]]["total"]
        info = emigration_dict[year][headers[i]]["list"]
        data[year][headers[i]]["emigration"].append({"country": "Others", "value": value, "info": info})


with open("../data/migration_cleandata.csv") as infile:
    reader = csv.reader(infile, delimiter=';', quotechar='"')
    headers = reader.next()
    headernames = list(headers)


    # Change country names in headers to country codes
    for i in range(len(headers)):
        for country in country_codes:
            if headers[i] == country[2]:
                headers[i] = country[1]

    # Create dictionary structure
    for i in range(6, 238):
        data["2010"][headers[i]] = {"immigration": [], "emigration": [], "name": headernames[i]}
        data["2015"][headers[i]] = {"immigration": [], "emigration": [], "name": headernames[i]}

    # Read data of 2010 and 2015
    for row in reader:
        if row[0] == "2010_total" and row[2] == "total_emigration":
            for i in range(6, 238):
                total_emigrations_2010[headers[i]] = row[i]

        if row[0] == "2015_total" and row[2] == "total_emigration":
            for i in range(6, 238):
                total_emigrations_2015[headers[i]] = row[i]

        read_row("2010", data, total_emigrations_2010)

        read_row("2015", data, total_emigrations_2015)

    for i in range(6, 237):
        if headers[i] in emigration_dict["2010"]:
            insert_emigration("2010")

        if headers[i] in emigration_dict["2015"]:
            insert_emigration("2015")

    # Close infile
    infile.close()


# Store in outfile and close outfile
outfile = open('../project/migrationData.json', 'w')
json.dump(data, outfile, ensure_ascii=False, indent=4)
outfile.close()
