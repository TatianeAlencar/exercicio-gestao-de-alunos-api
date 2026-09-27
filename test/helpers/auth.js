    import app from '../../src/app.js';
    import request from 'supertest';
    
    export async function getTokenAdmin(emailUser, passUser) {
        const loginResposta = await request(app)
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                email: emailUser,
                senha: passUser
      });

        return loginResposta.body.token;
    }

    export async function getTokenAluno(emailUser, passUser) {
        const loginResposta = await request(app)
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({
            email: emailUser,
            senha: passUser
      });

        return loginResposta.body.token;
}


