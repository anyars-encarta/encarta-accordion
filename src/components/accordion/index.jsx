import { useState } from "react";
import data from "./data";
import './styles.css';

const Accordion = () => {
    const [selected, setSelected] = useState(null);
    const [enableMultiSelection, setEnableMultiSelection] = useState(false);
    const [multiple, setMultiple] = useState([]);

    const handleSingleSelection = (getCurrentId) => {
        setSelected(getCurrentId === selected ? null : getCurrentId)
    };

    const handleMultiSelection = (getCurrentId) => {
      let copyMultiple = [...multiple];
      const finIndexOfCurrentId = copyMultiple.indexOf(getCurrentId)
    
      console.log(finIndexOfCurrentId);
      if(finIndexOfCurrentId === -1) copyMultiple.push(getCurrentId)
      else copyMultiple.splice(finIndexOfCurrentId , 1)

      setMultiple(copyMultiple)
    }

    return <div className="wrapper">
        <button
          onClick={
            () => setEnableMultiSelection(!enableMultiSelection)}>
                {enableMultiSelection ? 'Multi Selection Enabled - Click to Disable' : 'Multi Selection Disabled - Click to Enable'}
        </button>

        <div className="accordion">
            {
                data && data.length > 0 ?
                    data.map(dataItem => <div className="item">
                        <div
                          onClick={
                            enableMultiSelection 
                            ? () => handleMultiSelection(dataItem.id) 
                            : () => handleSingleSelection(dataItem.id)
                            }
                            className="title"
                        >
                            <h3>{dataItem.question}</h3>
                            <span>+</span>
                        </div>
                        {
                            enableMultiSelection ? multiple.indexOf(dataItem.id) !== -1 && 
                            <div className="content">{dataItem.answer}</div> :
                            selected === dataItem.id && <div className="content">{dataItem.answer}</div>
                        }
                        {/* {
                            selected === dataItem.id || multiple.indexOf(dataItem.id) !== -1 ?
                                <div className="content">{dataItem.answer}</div>
                                : null
                        } */}
                    </div>)
                    : <div>No data found!</div>
            }
        </div>
    </div>
}

export default Accordion;