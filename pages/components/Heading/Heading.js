import React from 'react'; // Importa a biblioteca React
import { getFontSizeForHeading, getTextAlign } from "../../../utils/fonts"; // Importa as funções getFontSizeForHeading e getTextAlign

export const Heading = ({ textAlign, content, level = 2 }) => { // Define uma constante chamada Heading que é uma função de componente de React
  const tag = React.createElement( // Cria um elemento React usando React.createElement
    `h${level}`, // O tipo do elemento é uma tag HTML com o nível do cabeçalho (por exemplo, "h1", "h2", etc.)
    {
      dangerouslySetInnerHTML: { // As propriedades do elemento incluem a propriedade dangerouslySetInnerHTML que permite renderizar conteúdo HTML interno
        __html: content, // O conteúdo do cabeçalho é renderizado como uma string HTML
      },
      className: `font-heading max-w-5xl mx-auto my-5 ${getFontSizeForHeading(level)} ${getTextAlign(textAlign)}`, // As classes CSS são concatenadas usando template strings
    }
  );
  return tag; // Retorna o elemento React criado: `h${level}`, que representa um cabeçalho HTML h1, h2, etc.
  // corresponderia a usar return <h1 className="font-heading max-w-5xl mx-auto my-5 text-6xl text-left">{content}</h1>;
};