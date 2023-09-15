import { api } from "./api";

export async function getVeiculos() {
    try {
        const response = await api.get("/veiculos");
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function getVeiculoById(id) {
    try {
        const response = await api.get(`/veiculos/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function createVeiculo(veiculoData) {
    try {
        const response = await api.post("/veiculos", veiculoData);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function updateVeiculo(id, veiculoData) {
    try {
        const response = await api.put(`/veiculos/${id}`, veiculoData);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function deleteVeiculo(id) {
    try {
        await api.delete(`/veiculos/${id}`);
    } catch (error) {
        throw error;
    }
}