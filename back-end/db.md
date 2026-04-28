-- T_USUARIO
CREATE TABLE t_usuario (
    idt_usuario SERIAL PRIMARY KEY,
    des_email VARCHAR(255) NOT NULL,
    des_senha VARCHAR(255) NOT NULL
);

-- T_TAREFA
CREATE TABLE t_tarefa (
    idt_tarefa SERIAL PRIMARY KEY,
    nom_tarefa VARCHAR(255) NOT NULL,
    des_tarefa TEXT,
    ind_ativo BOOLEAN DEFAULT TRUE
);

-- T_STATUS
CREATE TABLE t_status (
    idt_status SERIAL PRIMARY KEY,
    ind_status VARCHAR(255) NOT NULL
);

-- T_HISTORICO
CREATE TABLE t_historico (
    idt_historico SERIAL PRIMARY KEY,
    idt_status INT NOT NULL,
    idt_tarefa INT NOT NULL,
    
    CONSTRAINT fk_status
        FOREIGN KEY (idt_status)
        REFERENCES t_status(idt_status)
        ON DELETE CASCADE,

    CONSTRAINT fk_tarefa
        FOREIGN KEY (idt_tarefa)
        REFERENCES t_tarefa(idt_tarefa)
        ON DELETE CASCADE
);

-- T_COMENTARIO
CREATE TABLE t_comentario (
    idt_comentario SERIAL PRIMARY KEY,
    idt_tarefa INT NOT NULL,
    des_comentario TEXT,

    CONSTRAINT fk_tarefa_comentario
        FOREIGN KEY (idt_tarefa)
        REFERENCES t_tarefa(idt_tarefa)
        ON DELETE CASCADE
);