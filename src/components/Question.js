import React from 'react';

const Question = ({ id, topic, question, options, selectedOptions, onChange }) => {
  return (
    <div className="text-center">
      <h3>{question}</h3>
      <div className="row justify-content-center">
        {options.map((option, index) => (
          <div key={index} className="col-md-6">
            <div>
              <input
                type="checkbox"
                id={`${id}-${index}`}
                checked={selectedOptions.includes(index)}
                onChange={() => onChange(index)}
              />
              <label htmlFor={`${id}-${index}`}>{option}</label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question;
