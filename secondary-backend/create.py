import os
import requests
import tweepy
import time
from fetchPrice import fetch_price
import config

# Twitter authentication
client = tweepy.Client(consumer_key=config.API_KEY,
                       consumer_secret=config.API_SECRET,
                       access_token=config.ACCESS_TOKEN,
                       access_token_secret=config.ACCESS_TOKEN_SECRET)

print("✅ Authentication successful.")

while True:
    try:
        # Fetching the price of the cryptocurrency
        coin_id = 'ethereum'
        currency = 'usd'
        price = fetch_price(coin_id, currency)
        print(f"💲 Price of {coin_id} fetched: {price} {currency.upper()}.")

        # Creating and posting the tweet
        tweet = f"The current price of {coin_id.capitalize()} is {price} {currency.upper()}. 🚀"
        print("📝 Tweet created:", tweet)

        # Sending the tweet
        response = client.create_tweet(text=tweet)
        print("🐦 Tweet posted successfully!")
        print("🔍 Twitter Response:\n", response)

        break  # Exit the loop if tweet is successful

    except tweepy.errors.Forbidden as e:
        print("Duplicate tweet detected. Waiting 1 minute before retrying...")
        time.sleep(60)  # Wait for 1 minute

# Notify the primary backend
primary_backend_url = os.getenv('PRIMARY_BACKEND_URL', 'http://localhost:8000')
notify_url = f"{primary_backend_url}/task-completed"

try:
    notify_response = requests.post(notify_url)
    print("✅ Notification sent to primary backend. Response:", notify_response.text)
except Exception as e:
    print("⚠️ Error sending notification to primary backend:", e)
