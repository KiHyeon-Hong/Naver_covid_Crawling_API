from bs4 import BeautifulSoup as bs
from pprint import pprint
import requests
import json

def isNumber(s):
    try:
        int(s)
        return int(s)
    except ValueError:
        return 0

def _main_():
    html = requests.get('https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=%EC%BD%94%EB%A1%9C%EB%82%98&oquery=%EC%BD%94%EB%A1%9C%EB%82%98&tqi=U8hCpwprvmssshHG2eCssssstqw-176766')
    soup = bs(html.text, 'html.parser')
    dustdata_one = soup.find('div',{'class':'status_info'})
    dustdata_two = soup.find('div',{'class':'status_today'})

    now = dustdata_one.findAll('p',{'class':'info_num'})
    add = dustdata_one.findAll('em',{'class':'info_variation'})
    today = dustdata_two.findAll('em',{'class':'info_num'})

    data = {
        "patientNow":isNumber((now[0].text).replace(',','')),
        "examinationNow":isNumber((now[1].text).replace(',','')),
        "releaseNow":isNumber((now[2].text).replace(',','')),
        "deathNow":isNumber((now[3].text).replace(',','')),
        "patientAdd":isNumber((add[0].text).replace(',','')),
        "examinationAdd":isNumber((add[1].text).replace(',','')),
        "releaseAdd":isNumber((add[2].text).replace(',','')),
        "deathAdd":isNumber((add[3].text).replace(',','')),
        "patientIn":isNumber((today[0].text).replace(',','')),
        "patientOut":isNumber((today[1].text).replace(',',''))
    }

    print(data)

    f = open("files/covid.json", 'w')
    f.write(str(data))
    f.close()

_main_()
