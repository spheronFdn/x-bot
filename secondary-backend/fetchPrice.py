import requests

def fetch_price(coin_id, currency):
    url = f'https://api.coingecko.com/api/v3/simple/price?ids={coin_id}&vs_currencies={currency}'
    response = requests.get(url)
    price_data = response.json()
    return price_data[coin_id][currency]



