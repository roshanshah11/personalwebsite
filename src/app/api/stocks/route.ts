import { NextResponse } from 'next/server';
import yahooFinanceDefault from 'yahoo-finance2';

// @ts-ignore
const yahooFinance = new yahooFinanceDefault();

export async function GET() {
    const symbols = ['^GSPC', '^VIX', 'NVDA', 'AAPL', 'BTC-USD', 'MSFT', 'GOOGL', 'META', 'TSLA'];

    try {
        const quotes = await yahooFinance.quote(symbols) as any[]; // Cast to any[] to avoid type issues for now

        if (!Array.isArray(quotes)) {
            throw new Error('Expected array of quotes');
        }

        const data = quotes.map((quote: any) => ({
            symbol: quote.symbol,
            shortName: quote.shortName || quote.symbol,
            price: quote.regularMarketPrice,
            change: quote.regularMarketChange,
            changePercent: quote.regularMarketChangePercent,
        }));

        return NextResponse.json(data);
    } catch (error: any) {
        console.error('Error fetching stock data:', error);
        if (error.errors) {
            console.error('Validation errors:', JSON.stringify(error.errors, null, 2));
        }
        return NextResponse.json({ error: 'Failed to fetch stock data', details: error.message }, { status: 500 });
    }
}
