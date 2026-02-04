/**
 * Composant pour injecter les données structurées JSON-LD dans le head.
 * Utilisé pour le SEO (rich snippets Google).
 */

import React from 'react';

interface JsonLdProps {
  data: object | object[];
}

const JsonLd: React.FC<JsonLdProps> = ({ data }) => {
  const jsonLdArray = Array.isArray(data) ? data : [data];
  
  return (
    <>
      {jsonLdArray.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
};

export default JsonLd;
