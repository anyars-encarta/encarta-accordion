import { useState } from 'react';
import data from './data';
import './styles.css';

const Accordion = () => {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);

  const handleSingleSelection = (getCurrentId) => {
    setSelected(getCurrentId === selected ? null : getCurrentId);
  };

  const handleMultiSelection = (getCurrentId) => {
    const copyMultiple = [...multiple];
    const finIndexOfCurrentId = copyMultiple.indexOf(getCurrentId);

    if (finIndexOfCurrentId === -1) copyMultiple.push(getCurrentId);
    else copyMultiple.splice(finIndexOfCurrentId, 1);

    setMultiple(copyMultiple);
  };

  return (
    <div className="wrapper">
      <button
        type="button"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            setEnableMultiSelection(!enableMultiSelection);
          }
        }}
        onClick={
            () => setEnableMultiSelection(!enableMultiSelection)
        }
      >
        {enableMultiSelection ? 'Multi Selection Enabled - Click to Disable' : 'Multi Selection Disabled - Click to Enable'}
      </button>

      <div className="accordion">
        {
                data && data.length > 0
                  ? data.map((dataItem) => (
                    <div key={dataItem.id} className="item">
                      <div
                        onClick={
                            enableMultiSelection
                              ? () => handleMultiSelection(dataItem.id)
                              : () => handleSingleSelection(dataItem.id)
                            }
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            if (enableMultiSelection()) {
                              handleMultiSelection(dataItem.id);
                            } else {
                              handleSingleSelection(dataItem.id);
                            }
                          }
                        }}
                        className="title"
                        role="button"
                        tabIndex="0"
                      >
                        <h3>{dataItem.question}</h3>
                        <span>+</span>
                      </div>
                      {
                            enableMultiSelection ? multiple.indexOf(dataItem.id) !== -1
                            && <div className="content">{dataItem.answer}</div>
                              : selected === dataItem.id && <div className="content">{dataItem.answer}</div>
                        }
                      {/* {
                            selected === dataItem.id || multiple.indexOf(dataItem.id) !== -1 ?
                                <div className="content">{dataItem.answer}</div>
                                : null
                        } */}
                    </div>
                  ))
                  : <div>No data found!</div>
            }
      </div>
    </div>
  );
};

export default Accordion;
