# Design

## Data Sources
* [GDP per adult - wid.world](http://wid.world/data/): This data will be retrieved from a csv-file, which is ordered in the following representation: country,2008,2009,... A python script will extract these values and write them into a json file, containing the GDP- and happiness-values.
* [Happiness- and life-satisfaction - ourworldindata.org](https://ourworldindata.org/happiness-and-life-satisfaction/): This data will be retrieved from a csv-file, which is ordered in the the following representation: country,2008,country,2009,... A python script, different from the script that converts the GDP-values, will extract these values and write them into a json file, containing the GDP- and happiness-values.
* [International migration stock - www.un.org](http://www.un.org/en/development/desa/population/migration/data/estimates2/estimates17.shtml): This dataset is a bit complicated. The data is represented in a csv-file, which contains the migration values, along with destinations and origins. The file has the following representation: 2010,origin,destination1,destination2,...,2015,origin,destination1,destination2,... Because the viasualization contains a pie chart of both emigration as immigration, a python script has to read the csv-file in two different ways, as displayed below "Dataformats".

## Data formats
The data will be seperated into three json-files. The first json-file contains the GDP- and happiness-values of each country, the second json-file is created for the immigration pie chart, and the third json-file will be used for the emigration pie chart.

* The GDP- and happiness-values:
{"2008": {"AFG": {"country": "afganistan", "gdp": "...", "happiness": "..."}, {"ALG": {"country": "algeria", "gdp": "...", "happiness": "..."}, ...}, 

  "2010": {...}, ...}

* Emigration pie chart:
{"2010": {"AFG": {"origin": "afganistan", "destination1": {"country": "pakistan", "value": "..."}, "destination2": {"country": "india", "value": "..."}, ...}, {"ALG": {"origin": "algeria", "destination1": {"country": "somalia", "value": "..."}, ...},

  "2015": {"AFG": ...}}

* Immigration pie chart:
{"2010": {"AFG": {"destination": "afganistan", "origin1": {"country": "pakistan", "value": "..."}, "origin2": {"country": "india", "value": "..."}, ...}, {"ALG": {"destination": "algeria", "origin1": {"country": "somalia", "value": "..."}, ...},

  "2015": {"AFG": ...}}
  
## Sketch
![Project sketch](/doc/project_sketch.png)


