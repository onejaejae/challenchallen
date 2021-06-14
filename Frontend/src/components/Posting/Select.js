import React from 'react';

function Select({options, onChange, defaultValue}) {
    return (
        <select onChange={onChange} defaultValue={defaultValue}>
            {options.map((option) => {
                    if(option.value === 'select') {
                        return <option key={option.value} value={option.value}
                                       label={option.label}>{option.label}</option>
                    }
                      return  <option key={option.value} value={option.value} label={option.label}>{option.label}</option>
                }
            )}
        </select>
    );
}

export default Select;