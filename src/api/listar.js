import api from "./api";

export async function buscarCursos() {
  try {
    const response = await api.get("/curso/listar");
    return response;
  } catch (error) {
    console.error("Erro ao buscar cursos:", error);
    throw error;
  }
}

export async function buscarCursoPorNome(nome) {
  try {
    const response = await api.get(`/curso/listar/${nome}`);
    return response;
  } catch (error) {
    console.error("Erro ao buscar cursos:", error);
    throw error;
  }
}
      
