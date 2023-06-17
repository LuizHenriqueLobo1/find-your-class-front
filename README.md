<h1 align="center">find-your-class-front</h1>

### Sobre

> Front-end do sistema Find Your Class, que tem como objetivo consumir o [find-your-class-back](https://github.com/LuizHenriqueLobo1/find-your-class-back) para disponibilizar um buscador de disciplinas, ao procurar por uma disciplina é retornado uma tabela com os dados da mesma, indicando os locais e horários das suas aulas.

![find-your-class-front-print](https://github.com/LuizHenriqueLobo1/find-your-class-front/assets/71144276/1ee97615-296c-4035-9677-6bed4a942efd)

### Requisitos

- [Node 18+](https://nodejs.org/en)
- Executar o [find-your-class-back](https://github.com/LuizHenriqueLobo1/find-your-class-back)

### Como fazer funcionar?

1. Clone do repositório `git clone https://github.com/LuizHenriqueLobo1/find-your-class-front.git`
2. Crie o **.env** a partir do **.env.example** utilizando:
   - Windows: `copy .env.example .env`
   - Linux: `cp .env.example .env`
3. Instale as dependências do projeto `npm i`
4. Execute o projeto `npm start`

### Extra

Utilizando formatador de código automático [Prettier](https://prettier.io/) no [VSCode](https://code.visualstudio.com/)

1. Instale a extensão do [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) no seu [VSCode](https://code.visualstudio.com/).
2. Crie a pasta **.vscode** na raiz do projeto.
3. Dentro da pasta **.vscode** crie o arquivo **settings.json** com o conteúdo abaixo.

```JSON
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.sortImports": true,
    "source.fixAll": true,
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

4. Agora ao salvar o arquivo, o mesmo será formatado automaticamente.

---

<p align="center">
  Made by <a href="https://github.com/luizhenriquelobo1/" target="_blank">Luiz Henrique Lobo</a>
</p>
