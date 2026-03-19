interface Book {
  image: string;
  title: string;
  author: string;
  synopsis: string;
  price: number;
  slug: string;
}

const books: Book[] = [
  {
    image: "/clean-code.jpg",
    title: "Clean Code",
    author: "Robert C. Martin",
    synopsis:
      "Una guía esencial sobre cómo escribir código legible, mantenible y eficiente, enfocada en principios y mejores prácticas.",
    price: 40,
    slug: "clean-code",
  },
  {
    image: "/prag-prog.png",
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt & David Thomas",
    synopsis:
      "Un libro lleno de consejos prácticos sobre la carrera, el proceso de desarrollo y la mentalidad de un programador eficaz.",
    price: 90,
    slug: "pragmatic-prog",
  },
  {
    image: "/intro-algorithms.jpg",
    title: "Introduction to Algorithms",
    author: "Cormen, Leiserson, Rivest & Stein",
    synopsis:
      'Conocido como "el CLRS", es la biblia de los algoritmos y estructuras de datos, cubriendo desde lo básico hasta lo avanzado.',
    price: 90,
    slug: "intro-algorithms",
  },
  {
    image: "/desing-pat.jpg",
    title: "Design Patterns",
    author: "Gamma, Helm, Johnson & Vlissides",
    synopsis:
      'El libro original de la "Banda de los Cuatro" (GoF) que define los patrones de diseño fundamentales en la POO.',
    price: 55,
    slug: "desing-patterns",
  },
  {
    image: "/struct-interp.jpg",
    title: "Structure and Interpretation of Computer Programs",
    author: "Abelson & Sussman",
    synopsis:
      "Un clásico del MIT que enseña los fundamentos de la computación y la abstracción usando el lenguaje Lisp/Scheme.",
    price: 60,
    slug: "structure-interpretation",
  },
  {
    image: "/code-complete.jpg",
    title: "Code Complete",
    author: "Steve McConnell",
    synopsis:
      "Una enciclopedia sobre la construcción de software, cubriendo desde la planificación hasta las pruebas y el estilo de código.",
    price: 48,
    slug: "code-complete",
  },
  {
    image: "/eloquent-js.jpg",
    title: "Eloquent JavaScript",
    author: "Marijn Haverbeke",
    synopsis:
      "Una mirada profunda al lenguaje de la web, combinando teoría, práctica y proyectos para dominar JS de verdad.",
    price: 35,
    slug: "eloquent-js",
  },
];

export const getAllBooks = async (): Promise<Book[]> => {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
  return books;
};

export const getBookBySlug = (slug: string): Book | undefined => {
  return books.find((book) => book.slug === slug);
};

export const addBook = (newBook: Omit<Book, "image"> & { image?: string }) => {
  books.push({
    image: "/default-book.jpg",
    ...newBook,
  });
};