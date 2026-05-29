import api from "./api";

export async function criarCurso(nome_curso, periodo) {
  try {
    const response = await api.post("/curso/criar", {
      Nome_Curso: nome_curso,
      periodo: periodo,
    });

    return response;
  } catch (error) {
    console.error("Erro ao criar curso:", error);
    throw error;
  }
}
       