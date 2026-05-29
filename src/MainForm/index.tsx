import styles from './style.module.css'
import { Container } from '../Components/Container'
import { InputPadrao } from '../Components/InputPadrao'
import { BotaoPadrao } from '../Components/BotaoPadrao'
import {useState, useEffect} from 'react'

interface DadosCurso{
    nomecurso: string;
    periodo: string;

}
interface MainFromProps{
    aoAdicionar: (curso:any)=>void;
    aoAtualizar: (curso:any)=> void;
    cursoEmEdicao:any|null;
}

export function MainForm({aoAdicionar,aoAtualizar,cursoEmEdicao}:MainFromProps){
    const[dadosCurso,setDadosCurso]=useState<DadosCurso>({nomecurso:'',periodo:''})
    useEffect(()=>{
        if(cursoEmEdicao){
            setDadosCurso({
                nomecurso: cursoEmEdicao.nome,
                periodo: cursoEmEdicao.periodo
            })
        }else{
            setDadosCurso({nomecurso:'',periodo:''})
        }
    },[cursoEmEdicao])
    const lidarComMudanca = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
        setDadosCurso({
            ...dadosCurso,
            [e.target.name]: e.target.value
        });
    };


    const cadastrarCurso = (e:any) =>{
        e.preventDefault();
        if(cursoEmEdicao){
            const cursoAtualizado={
                id: cursoEmEdicao.id,
                nome:dadosCurso.nomecurso,
                periodo:dadosCurso.periodo,
            }
            console.log("Alteração em formato JSON :/n",
            JSON.stringify(cursoAtualizado,null,2));
            aoAtualizar(cursoAtualizado)
        }else{
            const cursoNovo ={
                id:'',
                nome: dadosCurso.nomecurso,
                periodo:dadosCurso.periodo
            }//fim do cursoNovo
            console.log("inclusão em formato JSON:/n",
                JSON.stringify(cursoNovo,null,2));// fim do console log
                aoAdicionar(cursoNovo)

        }//fim do else
            setDadosCurso({nomecurso:'',periodo:''})
    }//fim do cadastrarCurso






    return(

        <>
        <Container> 
            <section className={styles.formularioContainer}>
                <h2 className={styles.titulo}>
                    {cursoEmEdicao? 'Editar Curso': 'Cadastrar Novo Curso'}
                </h2>
                <form onSubmit={cadastrarCurso}
                >
                     <div className={styles.pularLinha}>

                    <label htmlFor="nomecurso" className={styles.label}>
                        Nome Curso
                    </label>
                   
                    <InputPadrao
                    type = "text"
                    id = "nomecurso"
                    name = "nomecurso"
                    placeholder='Ex: DevOps'
                    value = {dadosCurso.nomecurso}
                    onChange = {lidarComMudanca} 
                    required
                    />


                    </div>{/**Fim da div do botão padrão */}


                    <div className={styles.pularLinha}>

                        <label htmlFor="periodo" className={styles.label}>Período</label>
                        <select
                            name="periodo"
                            id="periodo"
                            className={styles.estiloTabela}
                            value={dadosCurso.periodo}
                            onChange={lidarComMudanca}
                            required
                        >
                            <option value="">Selecione um período</option>
                            <option value="Matutino">Matutino</option>
                            <option value="Vespertino">Vespertino</option>
                            <option value="Noturno">Noturno</option>
                            <option value="Integral">Integral</option>
                        </select> {/**Fim do selcet */}



                        
                    </div>{/**Fim da div do delect */}

                    <div>

                        <BotaoPadrao type = 'submit'>

                            {cursoEmEdicao? 'Salvar Alteração': 'Inserir Curso'}

                        </BotaoPadrao>

                    </div>{/**Fim da div do botao */}


                </form> {/**Fim do forms */}
            </section>{/**Fim do section */}
        </Container>
      
        </>
    )
}