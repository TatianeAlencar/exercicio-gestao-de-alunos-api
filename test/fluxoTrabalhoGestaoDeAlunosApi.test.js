import { api } from './helpers/api.js';
import { expect } from 'chai';
import { getTokenAdmin, getTokenAluno } from './helpers/auth.js';
import 'dotenv/config';
import { novoAluno } from './factories/alunosFactory.js';
import { novaDisciplina } from './factories/disciplinasFactory.js';


describe('Trabalho - Gestao de Alunos API', () => {
  //Logar como administrador
  let token;

  beforeEach(async () => {
      token = await getTokenAdmin(process.env.ADMIN_EMAIL, process.env.ADMIN_SENHA);

  });

  it.only('Automatizar testes para logar como administrador, cadastrar um aluno, logar como aluno e registrar a entrega de um trabalho como aluno', async () => {
    
    //cadastra uma disciplina
    const cadastroDisciplinaResposta = await api()
      .post('/api/admin/disciplinas')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(novaDisciplina());

      expect(cadastroDisciplinaResposta.status).to.equal(201);
      expect(cadastroDisciplinaResposta.body).to.have.property('id');
      console.log(cadastroDisciplinaResposta.body); 

      const disciplinaId = cadastroDisciplinaResposta.body.id;
            
    //Cadastrar um aluno
    const aluno = novoAluno();

    const cadastroAlunoResposta = await api()
      .post('/api/admin/alunos')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(aluno);

        expect(cadastroAlunoResposta.status).to.equal(201);
        console.log(cadastroAlunoResposta.body);

    const alunoId = cadastroAlunoResposta.body.id;  

    //Cadastrar aluno em disciplina
    const cadastroAlunoDisciplina = await api()
      .post(`/api/admin/disciplinas/${disciplinaId}/matriculas`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({ 
            alunoId: alunoId
         });

        expect(cadastroAlunoDisciplina.status).to.equal(201);
        console.log(cadastroAlunoDisciplina.body);
     
    //Logar como aluno  
    const tokenAluno = await getTokenAluno(aluno.email, aluno.senha);

    //Registrar a entrega de um trabalho como aluno
    const registrarEntregaTrabalhoAluno = await api()
      .post(`/api/alunos/${alunoId}/trabalhos`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${tokenAluno}`)
      .send({ 
            disciplinaId: disciplinaId,
            titulo: 'Lista de Exercícios 12',
            descricao: 'Resolução dos exercícios - capítulo 12.'
         });

        expect(registrarEntregaTrabalhoAluno.status).to.equal(201);
        expect(registrarEntregaTrabalhoAluno.body.disciplinaId).to.equal(disciplinaId);
        console.log(registrarEntregaTrabalhoAluno.body);
    });  
});