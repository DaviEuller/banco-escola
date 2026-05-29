import api from "./api";

export async function excluirCursoApi(id) {
    try {
        const response = await api.del(`/curso/deletar/${id}`);
        return response;
    } catch (error) {
        console.error("Erro ao excluir curso:", error);
        throw error;
    }
}   