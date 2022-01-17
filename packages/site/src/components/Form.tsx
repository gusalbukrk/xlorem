import React from 'react';
import xlorem from 'xlorem';

function Form(): JSX.Element {
  // input
  const [input, setInput] = React.useState('');

  // options
  const [quantity, setQuantity] = React.useState(5);
  const [unit, setUnit] = React.useState('paragraphs');
  const [format, setFormat] = React.useState('plain');

  // output
  const [output, setOutputBase] = React.useState({ title: '', body: '' });
  const setOutput = async () => {
    const filler = await xlorem(input, {
      unit: unit as 'paragraphs' | 'words',
      quantity,
      format: format as 'plain' | 'html',
    });

    const newOutput = {
      title: filler.title,
      body:
        format === 'plain'
          ? filler.body.replace(/\n/g, '\n\n')
          : filler.body.replace(/<\/p>(?!$)/g, '</p>\n\n'),
    };

    setOutputBase(newOutput);
  };

  const submit = async (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();

    const textarea = document.getElementById('output');
    (textarea as HTMLTextAreaElement).value = 'Loading...';

    await setOutput();
  };

  return (
    <form>
      {/* input */}
      <section>
        <input
          type="text"
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <label htmlFor="input">input: </label>
      </section>

      {/* options.quantity */}
      <section>
        <input
          type="number"
          name="quantity"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
        <label htmlFor="quantity">quantity: </label>
      </section>

      {/* options.unit */}
      <fieldset id="unit">
        <legend>unit</legend>

        <input
          type="radio"
          name="unit"
          id="unit-p"
          value="paragraphs"
          checked={unit === 'paragraphs'}
          onChange={() => setUnit('paragraphs')}
        />
        <label htmlFor="unit-p">paragraphs</label>

        <input
          type="radio"
          name="unit"
          id="unit-w"
          value="words"
          checked={unit === 'words'}
          onChange={() => setUnit('words')}
        />
        <label htmlFor="unit-w">words</label>
      </fieldset>

      {/* options.format */}
      <fieldset id="format">
        <legend>format</legend>

        <input
          type="radio"
          name="format"
          id="format-p"
          value="plain"
          checked={format === 'plain'}
          onChange={() => setFormat('plain')}
        />
        <label htmlFor="format-p">plain</label>

        <input
          type="radio"
          name="format"
          id="format-h"
          value="html"
          checked={format === 'html'}
          onChange={() => setFormat('html')}
        />
        <label htmlFor="format-h">html</label>
      </fieldset>

      {/* output */}
      <textarea id="output" rows={10} cols={50} value={output.body} readOnly />
      <label htmlFor="output"></label>

      <input type="submit" onClick={submit} value="Generate" />
    </form>
  );
}

export default Form;
