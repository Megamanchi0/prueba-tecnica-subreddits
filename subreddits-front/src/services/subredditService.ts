const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getSubredditsByPage = async (page: number) => {
    const response = await fetch(`${apiUrl}/all/${page}`);
    return response;
}

export const saveSubredditsApi = async () => {
    const response = await fetch(`${apiUrl}/save`);
    return response;
}

export const getTotalPages = async () => {
    const response = await fetch(`${apiUrl}/pages`);
    return response;
}

export const getSubredditById = async (id: string) => {
    const response = await fetch(`${apiUrl}/findone/${id}`);
    return response;
}

export const deleteSubreddits = async () => {
    const response = await fetch(`${apiUrl}/`, {
        method: "DELETE"
    });
    return response;
}