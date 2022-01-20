import { faCopy, faFileAlt } from '@fortawesome/free-regular-svg-icons';
import { faCheck, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

  const submitRef = React.useRef<HTMLButtonElement>(null);
  const submitElement = submitRef.current as HTMLButtonElement;

  const outerLoadingIconRef = React.useRef<HTMLDivElement>(null);
  const outerLoadingIconElement = outerLoadingIconRef.current as HTMLDivElement;

  const copyButtonRef = React.useRef<HTMLButtonElement>(null);
  const copyButtonElement = copyButtonRef.current as HTMLButtonElement;

  const [justCopied, setJustCopied] = React.useState(false); // has output been copied in the past few seconds

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    submitElement.disabled = true;

    copyButtonElement.style.display = 'none';
    setJustCopied(false);

    outerLoadingIconElement.style.display = 'flex';

    await setOutput();

    // spinner animation is freezing while fetching
    // it looks weird to suddenly go from freezed spinner to output filled with text
    // solution: after fetch is done and animation unfreezes, keep the spinner visible for a bit
    setTimeout(() => {
      outerLoadingIconElement.style.display = 'none';

      copyButtonElement.style.display = 'inline-block';

      // 1 or 2 seconds after the submit button is clicked
      // site becomes unresponsive and after 1 or 2 seconds comes back to normal
      // if submit is clicked while site is unresponsive
      // click(s) will take effect when site become responsive
      // thus, restarting the fetch process
      // solution: wait a bit to enable submit (use `setTimeout` [it can be just with 0 seconds), so
      // when delayed clicks come in, submit would still be disabled
      submitElement.disabled = false;
    }, 1500);
  };

  const handleCopyButton = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (justCopied) return;

    try {
      await navigator.clipboard.writeText(output.body);

      setJustCopied(true);

      setTimeout(() => {
        setJustCopied(false);
      }, 5000);
    } catch (error) {
      console.error("Could'n copy filler text to clipboard."); // eslint-disable-line no-console
    }
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
      <div id="outer-textarea">
        <textarea
          id="output"
          rows={12}
          cols={50}
          value={output.body}
          readOnly
        />

        <div ref={outerLoadingIconRef} id="outer-loading-icon">
          <FontAwesomeIcon id="loading-icon" icon={faSpinner} spin />
        </div>
      </div>

      {/** when you have multiple buttons inside form, only the first one is invoked at `enter` key press */}
      <div id="outer-buttons">
        <button id="generate-button" ref={submitRef} onClick={handleSubmit}>
          Generate
          <FontAwesomeIcon id="generate-icon" icon={faFileAlt} />
        </button>

        <button id="copy-button" ref={copyButtonRef} onClick={handleCopyButton}>
          {justCopied ? 'Copied' : 'Copy'}
          <FontAwesomeIcon
            id="copy-icon"
            icon={justCopied ? faCheck : faCopy}
          />
        </button>
      </div>
    </form>
  );
}

export default Form;
