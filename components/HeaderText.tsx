import React from 'react';

interface Props {
  title: string;
  description: string;
  ctaText?: string;
  ctaUrl?: string;
}

const HeaderText = ({ title, description }: Props) => {
  return (
    <header className="mb-6 flex items-center justify-between">
      <article>
        <h1 className="text-2xl font-semibold tracking-tight text-dark-100">
          {title}
        </h1>

        <p className="mt-1 text-sm font-normal text-dark-200">
          {description}
        </p>
      </article>
    </header>
  );
};

export default HeaderText;
