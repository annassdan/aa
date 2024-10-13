import { error, json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params, fetch }) {
    const { id } = params;
    try {
        console.log(`https://saweria.co/_next/data/Ex4V53ujGcOFUWVi-kuRU/id/qris/${id}.json`);
        const response = await fetch(`https://saweria.co/_next/data/Ex4V53ujGcOFUWVi-kuRU/id/qris/${id}.json`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw error(response.status, 'Failed to fetch data from Saweria');
        }

        const data = await response.json();
        return json(data);
    } catch (err) {
        console.error('Error fetching from Saweria:', err);
        throw error(500, 'Internal Server Error');
    }
}