
//CREATE ORDER
export const createOrder = async (product,token) => {
    try {
        const response = await fetch('http://localhost:8000/api/order/create', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(product)
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
};

//ORDER VERIFICATION
export const orderVerify = (fuck,token) => {
    return fetch('http://localhost:8000/api/order/verify', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(fuck)
    })
        .then(response => {
            console.log('order verify succesfull')
            console.log(response)
            return response.json();
        })
        .catch(err => console.log(err));
};