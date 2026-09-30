/* ===================================================================
   EDITE AQUI O CONTEUDO DO SEU PORTFOLIO
   Salve (Ctrl+S) e a pagina atualiza sozinha.
   =================================================================== */

const portfolio = {
  profile: {
    name: "Seu Nome",
    role: "Desenvolvedor Full Stack",
    initials: "SN",
    bio: "Escreva aqui um paragrafo curto sobre voce. Quem sao as empresas que voce ajudou, o que voce constroi, o que te motiva. Duas ou tres frases bastam.",
    location: "Brasil",
    resumeUrl: "", // link do seu PDF de curriculo (opcional)
  },

  social: [
    { label: "GitHub",   url: "https://github.com/lugxoo", icon: "github" },
    { label: "LinkedIn", url: "", icon: "linkedin" },
    { label: "E-mail",   url: "mailto:seuemail@exemplo.com", icon: "mail" },
  ],

  skills: [
    { name: "JavaScript", level: 90 },
    { name: "HTML & CSS", level: 95 },
    { name: "Node.js",    level: 75 },
    { name: "React",      level: 80 },
    { name: "Git",        level: 85 },
  ],

  projects: [
    {
      title: "Nome do Projeto 1",
      description: "Descreva o que o projeto faz e que problema ele resolve.",
      tech: ["React", "Node.js"],
      url: "",
      repo: "",
    },
    {
      title: "Nome do Projeto 2",
      description: "Descreva o que o projeto faz e que problema ele resolve.",
      tech: ["Python", "PostgreSQL"],
      url: "",
      repo: "",
    },
    {
      title: "Nome do Projeto 3",
      description: "Descreva o que o projeto faz e que problema ele resolve.",
      tech: ["TypeScript", "Vite"],
      url: "",
      repo: "",
    },
  ],

  stats: [
    { value: "3+",  label: "Anos de experiencia" },
    { value: "20+", label: "Projetos entregues" },
    { value: "10+", label: "Tecnologias" },
  ],
};
