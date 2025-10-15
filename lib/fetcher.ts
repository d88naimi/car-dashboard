export const fetcher = async (url: string) => {
  const res = await fetch(url, {
    headers: {
      'X-Api-Key': process.env.NEXT_PUBLIC_CAR_API_KEY || '',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch');
  }

  return res.json();
};