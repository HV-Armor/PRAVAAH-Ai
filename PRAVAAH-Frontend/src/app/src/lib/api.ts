const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000/api';

export async function initializeAgent(focusAreas: string[], threshold: number) {
    const res = await fetch(`${BASE_URL}/init`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ focusAreas, threshold }),
    });
    return res.json();
}

export async function getFeed() {
    const res = await fetch(`${BASE_URL}/feed`);
    if (!res.ok) throw new Error('Failed to fetch feed');
    return res.json();
}

export async function getEditorialLog() {
    const res = await fetch(`${BASE_URL}/editorial`);
    if (!res.ok) throw new Error('Failed to fetch editorial log');
    return res.json();
}