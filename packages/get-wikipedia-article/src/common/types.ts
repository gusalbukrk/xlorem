export type termsType = Partial<{
  alias: string[];
  description: string[];
  label: string[];
}>;

export type articleType = Partial<
  {
    title: string;
    body: string;
    categories: string[];
    links: string[];
    related: string[];
    summary: string;
  } & termsType
>;

export type includeType = Array<keyof articleType>;

export type optionsType = {
  bodyFormat: 'html' | 'plaintext';
};

export type queriesType = {
  [key: string]: string | number | boolean | undefined;
};
