import csv, json

data = {"2010": {}, "2015": {}}

with open("../data/migration_cleandata.csv") as infile:
    reader = csv.reader(infile, delimiter=';', quotechar='"')
    headers = reader.next()

    # Create dictionary structure
    for i in range(6, 238):
        data["2010"][headers[i]] = {"immigration": {}, "emigration": {}}
        data["2015"][headers[i]] = {"immigration": {}, "emigration": {}}

    for row in reader:

        if row[0] == "2010":

            if row[2] in data["2010"]:

                for i in range(6, 238):
                    if row[i] != "..":

                        # Append immigration data
                        data["2010"][row[2]]["immigration"][headers[i]] = row[i]

                        # Append emigration data
                        data["2010"][headers[i]]["emigration"][row[2]] = row[i]

        if row[0] == "2015":

            if row[2] in data["2015"]:

                for i in range(6, 238):
                    if row[i] != "..":

                        # Append immigration data
                        data["2015"][row[2]]["immigration"][headers[i]] = row[i]

                        # Append emigration data
                        data["2015"][headers[i]]["emigration"][row[2]] = row[i]



    infile.close()




outfile = open('../project/migrationData.json', 'w')

json.dump(data, outfile, ensure_ascii=False, indent=4)
outfile.close()
