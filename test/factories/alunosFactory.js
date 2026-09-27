import { faker } from '@faker-js/faker';

export function novoAluno() {
    const timestamp = Date.now();

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    
    return { 
            nome: `${firstName} ${lastName}`,
            email: `${firstName}.toLowerCase().${lastName}.toLowerCase()${timestamp}@escola.com`,
            matricula: `${timestamp}`,
            senha: faker.string.alpha(6)
    };
}