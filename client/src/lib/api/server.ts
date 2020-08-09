interface Body<T> {
  query: string;
  variables?: T;
}

interface Error {
  message: string;
}

interface FetchData<T> {
  data: T;
  errors: Error[];
}

export const server = {
  fetch: async <TData = any, TVariables = any>(body: Body<TVariables>): Promise<FetchData<TData>> => {
    const res = await fetch(`/api`, {
      method: `POST`,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error(`Failed to fetch from server!`);

    return res.json();
  },
};
