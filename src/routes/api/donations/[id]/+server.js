import { error, json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ params, request, fetch }) {
    const { id } = params;
    try {
        const body = await request.json();
        const response = await fetch(`https://backend.saweria.co/donations/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...request.headers
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            console.error(response);
            throw error(response.status, 'Failed to post data to Saweria');
        }

        const data = await response.json();
        return json(data);
    } catch (err) {
        console.error('Error posting to Saweria:', err);
        throw error(500, 'Internal Server Error');
    }
}