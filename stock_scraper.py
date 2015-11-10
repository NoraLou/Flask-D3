import csv
import requests

URL = "http://www.nasdaq.com/quotes/nasdaq-100-stocks.aspx?render=download"

def get_data():
    r = requests.get(URL)
    #data is unicode
    data = r.text
    print data
    print ("data*************************")
    RESULTS = {'children': []}
    #str.splitlines([keepends])
    ###Return a list of the lines in the string, breaking at line boundaries. This method uses the universal newlines approach to splitting lines. Line breaks are not included in the resulting list unless keepends is given and true.
    for line in csv.DictReader(data.splitlines(), skipinitialspace=True):
        RESULTS['children'].append({
         'name': line['Name'],
         'symbol':line['Symbol'],
         'price': line['lastsale'],
         'net_change':line['netchange'],
         'percent_change':line['pctchange'],
         'volume':line['share_volume'],
         'value':line['Nasdaq100_points']
        })
    return RESULTS



# def main():
#     # get_data()

# if __name__ == '__main__':
#     main()

