import { error, json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ params, request, fetch }) {
    const { id } = params;
    try {
        const body = await request.json();
        console.log(body)
        console.log(`https://backend.saweria.co/donations/${id}`)
        const response = await fetch(`https://backend.saweria.co/donations/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjdXJyZW5jeSI6IklEUiIsImlkIjoiMzdiOTg2NTgtNGY0Yy00MGE3LTg0NmEtZjc2YjIxMGU2NDRiIiwiZW1haWwiOiJhbm5hc3NkYW5AZ21haWwuY29tIiwidXNlcm5hbWUiOiJNTkFubmFzIiwidGllcl9rZXkiOiJCQVNJQyIsImlzcyI6InNhd2VyaWEtbG9naW4iLCJpYXQiOjE3Mjg3OTAzNzAsImV4cCI6MTcyOTA0OTU3MCwianRpIjoiZTZlYzI5YWUtMDU5NS00MTNmLThjMWQtZWQ5NzAyNjA4MDNlIn0.viXPJa9OFoyNx7tV-VSupQm3DJgPS5t9BRy8z6a-9Ss',
                // Forward any authorization headers if needed
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