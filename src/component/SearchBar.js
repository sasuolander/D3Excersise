import React from 'react';
import Downshift from 'downshift';

export const SearchBar = ({data, placeholder, onChange}) => {
    const names = data.map((data) => data.name);
    return (
        <Downshift
            onChange={onChange}
        >
            {({
                  getInputProps, // Props to pass to our input
                  getItemProps,  // Props to pass into each of the suggested items
                  isOpen,        // Whether the "suggestions box" is visible or not
                  inputValue,    // Value that the user typed in the search box
                  selectedItem,  // Item that is currently selected in the list (when hovering)
                  highlightedIndex, // Index of the item currently selected in the list
                  getLabelProps,
                  resultCount
              }) => (
                <div>
                    <label {...getLabelProps()}>test</label>
                    <input placeholder={placeholder} {...getInputProps()} />
                    {isOpen ? (
                        <div style={{border: '1px solid #ccc'}}>
                            {names.filter(i => !inputValue || i.toLowerCase()
                                .includes(inputValue.toLowerCase()),)
                                .map((name, index) => (
                                    <div{...getItemProps({name})}
                                        key={name}
                                        style={{
                                            backgroundColor:
                                                highlightedIndex === index ? 'gray' : 'white',
                                            fontWeight:
                                                selectedItem === name ? 'bold' : 'normal',
                                        }}>
                                        {name}
                                    </div>
                                ))}
                        </div>
                    ) : null}
                </div>
            )}
        </Downshift>
    )
};

//export default SearchBar
