<h1>Desafio Técnico - Gerenciamento de Usuários</h1>
<p>Este projeto é um desafio técnico desenvolvido para o processo seletivo da empresa sync360. Trata-se de uma aplicação web para gerenciamento de usuários, permitindo a visualização, adição, edição e exclusão de registros de usuários.</p>

<hr>

<p><strong>🔗 O site está hospedado e pode ser acessado em: <a href="https://desafio-sync360-pojc523tf-eduardo-silvas-projects-0cfe293e.vercel.app/">https://desafio-sync360-pojc523tf-eduardo-silvas-projects-0cfe293e.vercel.app/</a></strong></p>

<hr>

<h2>🚀 Visão Geral do Projeto</h2>
<p>A aplicação oferece uma interface intuitiva para gerenciar informações de usuários, incluindo dados pessoais e de endereço. A funcionalidade principal é a tabela de usuários, que permite busca global e ordenação por colunas, além de modais para criação e edição de usuários.</p>

<h2>✨ Funcionalidades</h2>
<ul>
    <li><strong>Visualização de Usuários:</strong> Exibe uma lista paginada de usuários com seus detalhes.</li>
    <li><strong>Adicionar Novo Usuário:</strong> Formulário modal para cadastrar novos usuários.</li>
    <li><strong>Editar Usuário:</strong> Formulário modal para atualizar informações de usuários existentes.</li>
    <li><strong>Excluir Usuário:</strong> Funcionalidade para remover usuários da base de dados.</li>
    <li><strong>Filtro Global:</strong> Permite buscar usuários por qualquer termo na tabela.</li>
    <li><strong>Ordenação de Colunas:</strong> A tabela pode ser ordenada por nome, sobrenome, idade, cidade e estado.</li>
    <li><strong>Cálculo de Idade:</strong> A idade dos usuários é calculada dinamicamente a partir da data de nascimento.</li>
    <li><strong>Imagem de Perfil:</strong> Exibe a imagem de perfil do usuário ou um placeholder com a inicial do nome.</li>
</ul>

<h2>🛠️ Tecnologias Utilizadas</h2>
<ul>
    <li><strong>Next.js 15:</strong> Framework React para construção de aplicações web full-stack.</li>
    <li><strong>React:</strong> Biblioteca JavaScript para construção de interfaces de usuário.</li>
    <li><strong>Tailwind CSS:</strong> Framework CSS para estilização rápida e responsiva.</li>
    <li><strong>Shadcn/ui:</strong> Componentes de UI reutilizáveis e acessíveis, construídos com Tailwind CSS e Radix UI.</li>
    <li><strong>MySQL:</strong> Sistema de gerenciamento de banco de dados relacional.</li>
    <li><strong><code>mysql2/promise</code>:</strong> Driver MySQL para Node.js com suporte a Promises.</li>
    <li><strong><code>@tanstack/react-table</code>:</strong> Biblioteca para construção de tabelas complexas e performáticas no React.</li>
    <li><strong>Lucide React:</strong> Biblioteca de ícones.</li>
</ul>

<h2>🗄️ Configuração do Banco de Dados</h2>
<p>O banco de dados utiliza MySQL e possui uma tabela principal chamada <code>users</code> com a seguinte estrutura:</p>
<pre><code>CREATE TABLE users (
    id INT UNSIGNED PRIMARY KEY,
    profile_image_url VARCHAR(255) DEFAULT 'https://wallpapers.com/images/hd/user-profile-placeholder-icon-8uxbdj1myl7rm20u.png' COMMENT 'URL da imagem de perfil',
    first_name VARCHAR(32) NOT NULL COMMENT 'Nome do usuário',
    last_name VARCHAR(80) NOT NULL COMMENT 'Sobrenome do usuário',
    birth_date DATE NOT NULL COMMENT 'Data de nascimento para cálculo da idade',
    street VARCHAR(48) NOT NULL COMMENT 'Nome da rua',
    neighborhood VARCHAR(32) NOT NULL COMMENT 'Bairro',
    city VARCHAR(32) NOT NULL COMMENT 'Cidade',
    state CHAR(2) NOT NULL COMMENT 'Estado em formato de sigla (ex: SP, RJ)',
    biography TEXT DEFAULT NULL COMMENT 'Descrição pessoal do usuário',
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Data de criação do registro',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Data da última atualização'
);
</code></pre>

<h3>Detalhes da Tabela <code>users</code>:</h3>
<ul>
    <li><strong><code>id</code>:</strong> <code>INT UNSIGNED PRIMARY KEY</code>. Identificador único para cada usuário. Embora não explicitamente <code>AUTO_INCREMENT</code> no SQL fornecido, o uso na API sugere que o banco de dados é configurado para gerar IDs automaticamente.</li>
    <li><strong><code>profile_image_url</code>:</strong> <code>VARCHAR(255)</code>. URL da imagem de perfil do usuário. Possui um valor padrão de placeholder.</li>
    <li><strong><code>first_name</code>:</strong> <code>VARCHAR(32) NOT NULL</code>. O primeiro nome do usuário. Campo obrigatório.</li>
    <li><strong><code>last_name</code>:</strong> <code>VARCHAR(80) NOT NULL</code>. O sobrenome do usuário. Campo obrigatório.</li>
    <li><strong><code>birth_date</code>:</strong> <code>DATE NOT NULL</code>. Data de nascimento do usuário, utilizada para calcular a idade. Campo obrigatório.</li>
    <li><strong><code>street</code>:</strong> <code>VARCHAR(48) NOT NULL</code>. Nome da rua do endereço do usuário. Campo obrigatório.</li>
    <li><strong><code>neighborhood</code>:</strong> <code>VARCHAR(32) NOT NULL</code>. Bairro do endereço do usuário. Campo obrigatório.</li>
    <li><strong><code>city</code>:</strong> <code>VARCHAR(32) NOT NULL</code>. Cidade do endereço do usuário. Campo obrigatório.</li>
    <li><strong><code>state</code>:</strong> <code>CHAR(2) NOT NULL</code>. Estado do endereço do usuário, no formato de sigla (ex: SP, RJ). Campo obrigatório.</li>
    <li><strong><code>biography</code>:</strong> <code>TEXT DEFAULT NULL</code>. Uma descrição pessoal do usuário. Campo opcional.</li>
    <li><strong><code>created_at</code>:</strong> <code>TIMESTAMP DEFAULT CURRENT_TIMESTAMP</code>. Timestamp da criação do registro, preenchido automaticamente.</li>
    <li><strong><code>updated_at</code>:</strong> <code>TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP</code>. Timestamp da última atualização do registro, atualizado automaticamente.</li>
</ul>

<h2>📂 Estrutura do Projeto</h2>
<ul>
    <li><strong><code>/app/page.js</code>:</strong> O componente principal da aplicação. Gerencia o estado dos usuários, modais de criação/edição e o filtro global. Orquestra a exibição da tabela e dos modais.</li>
    <li><strong><code>/app/api/users/route.js</code>:</strong> Define os endpoints da API REST para operações CRUD (Create, Read, Update, Delete) na tabela de usuários.
        <ul>
            <li><code>GET /api/users</code>: Retorna todos os usuários.</li>
            <li><code>POST /api/users</code>: Cria um novo usuário.</li>
            <li><code>PUT /api/users?id={id}</code>: Atualiza um usuário existente pelo ID.</li>
            <li><code>DELETE /api/users?id={id}</code>: Exclui um usuário pelo ID.</li>
        </ul>
    </li>
    <li><strong><code>/lib/database.js</code>:</strong> Contém a função <code>createConnection</code> responsável por estabelecer a conexão com o banco de dados MySQL, utilizando variáveis de ambiente para as credenciais.</li>
    <li><strong><code>/components/create-user-modal.jsx</code>:</strong> Componente React que renderiza o modal e o formulário para adicionar um novo usuário.</li>
    <li><strong><code>/components/edit-user-modal.jsx</code>:</strong> Componente React que renderiza o modal e o formulário para editar um usuário existente.</li>
    <li><strong><code>/components/users-table.jsx</code>:</strong> Componente React que exibe a tabela de usuários. Utiliza <code>@tanstack/react-table</code> para funcionalidades avançadas como ordenação e filtragem. Inclui lógica para exibir imagens de perfil ou placeholders e calcular a idade.</li>
    <li><strong><code>/components/ui/*</code>:</strong> Contém os componentes de UI do Shadcn/ui (Button, Input, Dialog, Label, Select, Textarea, Table).</li>
</ul>

<h2>⚙️ Como Rodar o Projeto Localmente</h2>
<p>Siga os passos abaixo para configurar e executar o projeto em sua máquina local.</p>

<h3>Pré-requisitos</h3>
<ul>
    <li>Node.js (versão 18 ou superior)</li>
    <li>npm ou Yarn</li>
    <li>Um servidor MySQL em execução</li>
</ul>

<h3>1. Clonar o Repositório</h3>
<pre><code>git clone &lt;URL_DO_SEU_REPOSITORIO&gt;
cd desafio-sync360
</code></pre>

<h3>2. Configurar Variáveis de Ambiente</h3>
<p>Crie um arquivo <code>.env.local</code> na raiz do projeto e adicione suas credenciais do banco de dados MySQL:</p>
<pre><code>DATABASE_HOST=localhost
DATABASE_USER=your_mysql_user
DATABASE_PASSWORD=your_mysql_password
DATABASE_DATABASE=your_database_name
</code></pre>
<p>Substitua <code>your_mysql_user</code>, <code>your_mysql_password</code> e <code>your_database_name</code> pelas suas credenciais e nome do banco de dados.</p>

<h3>3. Criar o Banco de Dados e a Tabela</h3>
<p>Conecte-se ao seu servidor MySQL (via terminal, MySQL Workbench, DBeaver, etc.) e execute o SQL fornecido para criar a tabela <code>users</code>:</p>
<pre><code>-- Crie o banco de dados se ainda não existir
CREATE DATABASE IF NOT EXISTS your_database_name;

-- Use o banco de dados
USE your_database_name;

-- Crie a tabela users
CREATE TABLE users (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT, -- Adicionado AUTO_INCREMENT para conveniência
    profile_image_url VARCHAR(255) DEFAULT 'https://wallpapers.com/images/hd/user-profile-placeholder-icon-8uxbdj1myl7rm20u.png' COMMENT 'URL da imagem de perfil',
    first_name VARCHAR(32) NOT NULL COMMENT 'Nome do usuário',
    last_name VARCHAR(80) NOT NULL COMMENT 'Sobrenome do usuário',
    birth_date DATE NOT NULL COMMENT 'Data de nascimento para cálculo da idade',
    street VARCHAR(48) NOT NULL COMMENT 'Nome da rua',
    neighborhood VARCHAR(32) NOT NULL COMMENT 'Bairro',
    city VARCHAR(32) NOT NULL COMMENT 'Cidade',
    state CHAR(2) NOT NULL COMMENT 'Estado em formato de sigla (ex: SP, RJ)',
    biography TEXT DEFAULT NULL COMMENT 'Descrição pessoal do usuário',
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Data de criação do registro',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Data da última atualização'
);
</code></pre>
<p><strong>Nota:</strong> Adicionei <code>AUTO_INCREMENT</code> à definição da coluna <code>id</code> no SQL acima para garantir que o banco de dados gerencie automaticamente os IDs, o que é uma prática comum e alinhada com o comportamento esperado pela aplicação (que espera que o <code>id</code> seja gerado pelo banco de dados na inserção).</p>

<h3>4. Instalar Dependências</h3>
<pre><code>npm install
# ou
yarn install
</code></pre>

<h3>5. Rodar a Aplicação</h3>
<pre><code>npm run dev
# ou
yarn dev
</code></pre>
<p>A aplicação estará disponível em <code>http://localhost:3000</code>.</p>

<h2>🤝 Contribuição</h2>
<p>Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.</p>
