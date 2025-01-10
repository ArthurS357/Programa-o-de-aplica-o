interface IClientInterface {
    /** Identificador único do cliente (opcional) */
    id?: string;

    /** Nome do cliente (obrigatório) */
    name: string;

    /** Descrição do cliente (opcional) */
    description?: string;

    /** CPF do cliente (obrigatório) - deve seguir o formato padrão de CPF */
    cpf: string;

    /** Endereço do cliente (obrigatório) */
    address: string;

    /** Número de telefone do cliente (obrigatório) - deve seguir o formato padrão de telefone */
    fone: string;
}

export { IClientInterface };
