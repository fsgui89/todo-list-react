# TaskFlow

[English](#english) | [Português](#portugues)

[Live Demo](https://fsgui89.github.io/todo-list-react/) · [Repository](https://github.com/fsgui89/todo-list-react)

<a id="english"></a>

## English

A personal task manager with a customizable list, status filters and browser persistence.

### Overview

TaskFlow brings daily tasks and completion counts into one interface. It helps users organize pending work and keep their list available after reloading the page.

### Tech Stack

React • TypeScript • Vite • CSS • localStorage

### Features

- Add tasks, mark them complete or pending, and delete individual tasks.
- Filter all, pending or completed tasks and clear completed items.
- Rename the task list, with save and cancel actions.
- Display total, pending and completed task counts.
- Persist tasks and the list title in localStorage.
- Responsive layout, descriptive control labels and contextual empty states.

### Technical Highlights

- GenericList owns list state and persistence; TaskInput and TaskList handle input and rendering.
- Task and TaskFilter types describe the data and allowed filter values.
- Saved tasks are parsed with a type guard; malformed JSON falls back to an empty list.
- useMemo derives filtered tasks and useEffect synchronizes changes with browser storage.
- Task input is trimmed, rejects empty values and is limited to 100 characters.

### Getting Started

Prerequisites: Git, Node.js 22.12 or later compatible with the dependencies, and npm.

```bash
git clone https://github.com/fsgui89/todo-list-react.git
cd todo-list-react
npm ci
npm run dev
```

Open [http://localhost:5173/todo-list-react/](http://localhost:5173/todo-list-react/) (or the port reported by Vite).

Available commands:

```bash
npm run build
npm run lint
npm run preview
```

The build produces `dist/`; `preview` serves that build locally. The existing workflow publishes `dist/` to GitHub Pages.

### Project Structure

- `src/components/GenericList.tsx`: list state, filters, counters and persistence.
- `src/components/TaskInput.tsx`: controlled task form.
- `src/components/TaskList.tsx`: task controls and rendering.
- `src/types/Task.ts`: task and filter types.

### Implementation Scope

Data stays in the current browser and origin. The application does not include accounts, a server database or cross-device synchronization.

### Preview

Existing project preview maintained in the portfolio repository.

![TaskFlow preview](https://raw.githubusercontent.com/fsgui89/portfolio-guilherme-ferreira/main/public/images/projects/taskflow-react.png)

### Author

**Guilherme Ferreira**  
Full Stack Developer

[GitHub](https://github.com/fsgui89) · [LinkedIn](https://linkedin.com/in/guilhermefsdev) · [Portfolio](https://fsgui89.github.io/portfolio-guilherme-ferreira/)

---

<a id="portugues"></a>

## Português

Gerenciador de tarefas pessoais com lista personalizável, filtros por status e persistência no navegador.

### Visão geral

O TaskFlow reúne tarefas diárias e contadores de conclusão em uma única interface. Ajuda a organizar pendências e manter a lista disponível após recarregar a página.

### Tecnologias

React • TypeScript • Vite • CSS • localStorage

### Funcionalidades

- Adicionar tarefas, marcar como concluídas ou pendentes e excluir itens.
- Filtrar todas, pendentes ou concluídas e limpar as concluídas.
- Renomear a lista, com ações de salvar e cancelar.
- Exibir contadores de tarefas totais, pendentes e concluídas.
- Persistir tarefas e nome da lista no localStorage.
- Layout responsivo, controles com rótulos descritivos e estados vazios contextuais.

### Destaques técnicos

- GenericList concentra estado e persistência; TaskInput e TaskList cuidam da entrada e da renderização.
- Os tipos Task e TaskFilter descrevem os dados e os filtros permitidos.
- As tarefas salvas passam por uma verificação de tipos; JSON inválido resulta em uma lista vazia.
- useMemo calcula a lista filtrada e useEffect sincroniza as alterações com o armazenamento do navegador.
- A entrada remove espaços das extremidades, rejeita valores vazios e limita o texto a 100 caracteres.

### Como executar

Pré-requisitos: Git, Node.js 22.12 ou superior compatível com as dependências, e npm.

```bash
git clone https://github.com/fsgui89/todo-list-react.git
cd todo-list-react
npm ci
npm run dev
```

Abra [http://localhost:5173/todo-list-react/](http://localhost:5173/todo-list-react/) (ou a porta indicada pelo Vite).

Comandos disponíveis:

```bash
npm run build
npm run lint
npm run preview
```

O build gera `dist/`; `preview` serve o build localmente. O workflow existente publica `dist/` no GitHub Pages.

### Estrutura do projeto

- `src/components/GenericList.tsx`: estado, filtros, contadores e persistência.
- `src/components/TaskInput.tsx`: formulário controlado de tarefas.
- `src/components/TaskList.tsx`: controles e renderização dos itens.
- `src/types/Task.ts`: tipos de tarefa e filtro.

### Escopo da implementação

Os dados ficam no navegador e na origem atuais. A aplicação não inclui contas, banco de dados no servidor ou sincronização entre dispositivos.

### Prévia

A imagem existente na seção Preview acima é mantida no repositório do portfólio. A versão interativa está no link Live Demo no início deste README.

### Autor

**Guilherme Ferreira**  
Full Stack Developer

[GitHub](https://github.com/fsgui89) · [LinkedIn](https://linkedin.com/in/guilhermefsdev) · [Portfolio](https://fsgui89.github.io/portfolio-guilherme-ferreira/)

