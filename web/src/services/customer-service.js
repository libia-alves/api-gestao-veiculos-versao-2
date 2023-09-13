import { api } from "./api";

export async function getCustomers() {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get('/customer', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function deleteCustomer(id) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.delete(`/customer/${id}`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function updateCustomer(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.put(`/customer/${data.id}`, {
        Name: data.nameCustomer,
        Email: data.email
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function createCustomer(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.post('/customer', {
        Name: data.nameCustomer,
        Email: data.email
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}
