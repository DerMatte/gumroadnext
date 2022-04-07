
// get Products from gumroad
// export const getProducts = async (): Promise<Product[]> => {
export const getProducts = async (): Promise<any> => {
    const response = await fetch(
        "https://gumroad.com/api/v2/products",
        {
            headers: {
                Authorization: `Bearer ${process.env.GUMROAD_API_KEY}`,
                // "X-Gumroad-Api-Key": process.env.GUMROAD_API_KEY,
                'Content-Type': 'application/json'
            },
            method: 'GET',
        }
    );
    // console.log(response);

    const data = await response.json();
    return data;
    // const { products } = await response.json();
    // return products;
}


// get Product variant from gumroad
// export const getProductVariant = async (productId: string): Promise<ProductVariant> => {
export const getProductVariant = async (productId: string): Promise<any> => {
    const response = await fetch(
        `https://gumroad.com/api/v2/products/${productId}/variants`,
        {
            headers: {
                Authorization: `Bearer ${process.env.GUMROAD_API_KEY}`,
                'Content-Type': 'application/json'
            },
            method: 'GET',
        }
    );
    const data = await response.json();
    return data;
}


// get custom fields from gumroad
// export const getCustomFields = async (productId: string): Promise<CustomField[]> => {
export const getCustomFields = async (productId: string): Promise<any> => {
    const response = await fetch(
        `https://gumroad.com/api/v2/products/${productId}/custom_fields`,
        {
            headers: {
                Authorization: `Bearer ${process.env.GUMROAD_API_KEY}`,
                'Content-Type': 'application/json'
            },
            method: 'GET',
        }
    );
    const data = await response.json();
    return data;
}