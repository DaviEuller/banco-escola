import { Container } from '../../Components/Container'
import { MainForm } from '../../MainForm'
import { ListaCursos, type Curso } from '../../ListarCurso'
import { useState,useEffect } from 'react'
import { buscarCursos, buscarCursoPorNome } from '../../api/listar'
import { criarCurso } from '../../api/Criar_curso'
import { excluirCursoApi } from '../../api/excluir'

export function Home(){
    const [cursos,setCursos]=useState<Curso[]>([]);
    const [filtroNome, setFiltroNome] = useState('');

    const[cursosEmEdicao,setCursoEmEdicao] = useState<Curso|null>(null);
    useEffect(()=>{
        carregarCursos();
    },[])

    useEffect(() => {
        const debounce = setTimeout(() => {
            if (filtroNome.trim() === '') {
                carregarCursos();
            } else {
                buscarPorNome(filtroNome.trim());
            }
        }, 300);

        return () => clearTimeout(debounce);
    }, [filtroNome]);

    async function carregarCursos() {
        try {
            const cursosApi = await buscarCursos();
            const cursosFormatados = cursosApi.map((item:any) => ({
                id: String(item.id),
                nome: item.Nome_Curso ?? item.nome ?? '',
                periodo: item.periodo ?? ''
            }))
            setCursos(cursosFormatados);
        } catch (error) {
            console.error('Erro ao carregar cursos:', error);
        }
    }

    async function buscarPorNome(nome: string) {
        try {
            const curso = await buscarCursoPorNome(nome);
            if (!curso) {
                setCursos([]);
                return;
            }

            setCursos([{ 
                id: String(curso.id),
                nome: curso.Nome_Curso ?? curso.nome ?? '',
                periodo: curso.periodo ?? ''
            }]);
        } catch (error:any) {
            if (error.response?.status === 404) {
                setCursos([]);
            } else {
                console.error('Erro ao buscar curso por nome:', error);
            }
        }
    }


    const adicionarCurso = async (novoCurso:Curso)=>{
        try {
            const cursoCriado = await criarCurso(novoCurso.nome, novoCurso.periodo);
            setCursos((cursosAtuais)=>[
                ...cursosAtuais,
                {
                    id: String(cursoCriado.id),
                    nome: cursoCriado.Nome_Curso ?? novoCurso.nome,
                    periodo: cursoCriado.periodo ?? novoCurso.periodo,
                }
            ])
        } catch (error) {
            console.error('Erro ao adicionar curso:', error);
        }
    }


    
    const excluirCurso = async (id: string) => {
        try {
            await excluirCursoApi(id);

            setCursos((cursosAtuais) =>
                cursosAtuais.filter((curso) => String(curso.id) !== String(id))
            );
        } catch (error) {
            console.error('Erro ao excluir curso:', error);
        }
    };

    const handleBuscaPorNome = (nome: string) => {
        setFiltroNome(nome);
    };

    const editarCurso = (curso:Curso)=>{
        setCursoEmEdicao(curso)
    }

    const atualizarCurso = (cursoAtualizado: Curso) => {
        const cursosAtualizados = cursos.map((curso) =>
            String(curso.id) === String(cursoAtualizado.id)
                ? cursoAtualizado
                : curso
        );
        setCursos(cursosAtualizados);
        setCursoEmEdicao(null);
    }
/**Fim de AtualizarCurso */


    









    return(
        <>
        <Container>
            <MainForm
                aoAdicionar={adicionarCurso}
                aoAtualizar={atualizarCurso}
                cursoEmEdicao={cursosEmEdicao}
            />
        
            <ListaCursos
                cursos={cursos}
                busca={filtroNome}
                aoBuscar={handleBuscaPorNome}
                aoEditar={editarCurso}
                aoExcluir={excluirCurso}
            />
        </Container>

       
  
        
        </>
    )
}