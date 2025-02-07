__version__ = '1.1.2'

import requests

def main():
  resp = requests.head('https://www.google.como')
  date = resp.headers.get('date', 'Unknown')
  print(f'Hello world, it is {date}')

if __name__ == '__main__':
  main()
