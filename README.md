# Portfolio

Site pessoal estático publicado com GitHub Pages.

## Editar o conteúdo

Todo o texto fica em **`js/data.js`**. Você só precisa editar esse arquivo e dar `Ctrl+S` — a página atualiza sozinha. Não mexa no `index.html` nem no CSS para trocar textos.

```js
const portfolio = {
  profile: { name, role, initials, bio, location, resumeUrl },
  social:   [{ label, url, icon }],
  skills:   [{ name, level }],   // level de 0 a 100
  projects: [{ title, description, tech: [], url, repo }],
  stats:    [{ value, label }],
};
```

Campos `url` e `repo` vazios escondem o link. Para quebrar a bio em vários parágrafos, separe com uma linha em branco. Os ícones aceitos em `social` são `github`, `linkedin` e `mail`.

## Cores

As cores do site inteiro estão no topo do `css/style.css`, dentro do bloco `:root`. Troque `--accent`, `--accent-2` e `--accent-3` para mudar o tema.

## Rodar localmente

```bash
npx serve . --watch
```

## Publicar

Cada `git push` na branch `main` dispara o deploy automático via GitHub Actions. O site fica em:

```
https://SEU-USUARIO.github.io/SEU-REPO/
```

Se a URL não funcionar, vá em **Settings > Pages** e troque a source para **GitHub Actions**.
