require('dotenv').config();
const getDownTrendingStock = require('./lib/getDownTrendingStock');
const getBars = require('./lib/getBars');
const getAccountValue = require('./lib/getAccountValue');
const { buyMarket, sellStop, sellLimit } = require('./lib/order');

const init = async () => {
    // recognize bullish engulfing pattern
    // find downtrending stock
    const symbol = await getDownTrendingStock();
    // Check every minute
    const checkAndOrder = async () => {
        // look at last 2 interval candles before the current minute, for example if the time is 9:32am, 9:30am is bar1, 9:31am is bar2
        const oneMinuteMS = 60000;
        const now = new Date();
        const start = new Date(now - (2 * oneMinuteMS)).toISOString();
        const end = new Date(now - oneMinuteMS).toISOString();
        console.log('Checking bars', end, start);
        const bars = await getBars({symbol, start, end});
        // if:
        // - bar1 closes < bar1 open
        // - bar2 closes > bar2 opening
        // - bar2 closes > bar1 open
        // - bar2 opens < bar1 close
        // - bar2 volume > bar1 volume
        const bar1 = bars[symbol][0];
        const bar2 = bars[symbol][1];
        if (
            (bar1 && bar2) &&
            (bar1.c < bar1.o) &&
            (bar2.c > bar2.o) &&
            (bar2.c > bar1.o) &&
            (bar2.o < bar1.c) &&
            (bar2.v > bar1.v)
        ) {
            // Get 10% of account value
            const willingToSpend = getAccountValue() * .1;
            // Find how many shares we can buy with 10% of account value
            const amt = Math.floor(willingToSpend / bar2.c);
            // Buy this stock
            const purchase = await buyMarket({symbol, amt});
            // set stop at bar1 low price
            sellStop({symbol, price: bar1.l, amt});
            // set 100% limit sell at 2:1 profit ratio, which comes out to ((purchase price - stop price) * 2) + purchase price
            const profitTarget = ((purchase.price - bar1.l) * 2) + purchase.price;
            sellLimit({symbol, price: profitTarget, amt});
        }
    }
    checkAndOrder();
    setInterval(checkAndOrder, 60 * 1000);
}
init();
