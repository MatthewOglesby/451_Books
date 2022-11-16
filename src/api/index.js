const baseURL = 'http://localhost:3001/api'

export const getAllProducts = async () => {
    try {
        const response = await fetch(`${baseURL}/products`, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const results = await response.json();

        return results;
    } catch(ex) {
        console.error('Error getting all products', ex)
    }
}