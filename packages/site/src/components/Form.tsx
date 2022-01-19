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

    setOutputBase({
      title: filler.title,
      body:
        format === 'plain'
          ? filler.body.replace(/\n/g, '\n\n')
          : filler.body.replace(/<\/p>(?!$)/g, '</p>\n\n'),
    });
  };

  const submitRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = async (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    e.preventDefault();

    const submitElement = submitRef.current as HTMLInputElement;

    submitElement.disabled = true;

    const textarea = document.getElementById('output');
    (textarea as HTMLTextAreaElement).value = 'Loading...';

    await setOutput();

    // 1 or 2 seconds after the submit button is clicked
    // site becomes unresponsive and after 1 or 2 seconds comes back to normal
    // if submit is clicked while site is unresponsive
    // click(s) will take effect when site become responsive
    // thus, restarting the fetch process
    // solution: wait a bit to enable submit, so
    // when delayed clicks come in, submit would still be disabled
    setTimeout(() => {
      submitElement.disabled = false;
    }, 0);
  };

  return (
    <form>
      <div className="row" id="first-row">
        {/* input */}
        <div id="outer-input">
          <input
            type="text"
            id="input"
            placeholder={`input (e.g. "harry potter")`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        {/* options.quantity */}
        <div id="outer-quantity">
          <input
            type="number"
            name="quantity"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="row" id="second-row">
        {/* options.unit */}
        <fieldset>
          <legend>unit</legend>

          <div className="option">
            <input
              type="radio"
              name="unit"
              id="unit-p"
              value="paragraphs"
              checked={unit === 'paragraphs'}
              onChange={() => setUnit('paragraphs')}
            />
            <label htmlFor="unit-p">paragraphs</label>
          </div>

          <div className="option">
            <input
              type="radio"
              name="unit"
              id="unit-w"
              value="words"
              checked={unit === 'words'}
              onChange={() => setUnit('words')}
            />
            <label htmlFor="unit-w">words</label>
          </div>
        </fieldset>

        {/* options.format */}
        <fieldset>
          <legend>format</legend>

          <div className="option">
            <input
              type="radio"
              name="format"
              id="format-p"
              value="plain"
              checked={format === 'plain'}
              onChange={() => setFormat('plain')}
            />
            <label htmlFor="format-p">plain</label>
          </div>

          <div className="option">
            <input
              type="radio"
              name="format"
              id="format-h"
              value="html"
              checked={format === 'html'}
              onChange={() => setFormat('html')}
            />
            <label htmlFor="format-h">html</label>
          </div>
        </fieldset>
      </div>

      {/* output */}
      <textarea id="output" rows={10} cols={50} value={output.body} readOnly />
      <label htmlFor="output"></label>

      <input
        ref={submitRef}
        type="submit"
        onClick={handleSubmit}
        value="Generate"
      />
    </form>
  );
}

export default Form;
