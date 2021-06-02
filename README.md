# Stock Tracker

Stock Tracker is an app that allows users to track stock performance of the companies, ETFs and indexes they choose.

## Usage

You will need to disable CORS in your browser before it will work.  
A plugin is required if using Chrome or Firefox. See [here](https://chrome.google.com/webstore/detail/cors-unblock/lfhmikememgdcahcdlaciloancbhjino?hl=en) for Chrome and [here](https://addons.mozilla.org/en-US/firefox/addon/access-control-allow-origin/) for Firefox.
If using Safari, you can disable CORS directly in the Develop menu. See here for instructions how.

## Initial Setup

By default, you will have AAPL and SPY in your watchlist. To delete it, or any ticker you choose to add, simply click on the trash can icon next to it.

![Gif showing initial setup and how to delete a ticker](./assets/gifs/deleting_tickers.gif)

## Adding Tickers

To add a ticker, just enter the symbol in the upper-left input line and press the enter key or click on the green '+' sign. Do not worry about adding invalid tickers, it will not allow you to do that.

![Gif showing how to add ticker to watchlist](./assets/gifs/adding_tickers.gif)

## Viewing Data

To view details of a ticker in your watchlist, just click on the ticker you would like to view. At the top of the screen, you can select moving averages which will be displayed as a single horizontal line across the chart. 50-day and 200-day moving averages are the current options. You can also select a timeframe of price history to view.

![Gif showing data viewing functionality](./assets/gifs/viewing_data.gif)

The current day's price activity as well as some other fundamental information about the company you have selected is displayed in a card at the bottom.

## Saving Your Watchlist

Your watchlist is automatically saved to your browser's local storage everytime you add or remove a ticker from your watchlist. As long as you are using the same browser, you will always be able to pick back up whereever you left off.

[Live link!](https://watchlistkab.netlify.app)
