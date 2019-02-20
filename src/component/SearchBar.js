import React from 'react';
import Downshift from 'downshift';

export const SearchBar = ({
                  data,
                  placeholder,
                  DownshifOnChange,
                  onChange,
                  onClick,
                  inputValue,
            }) => {
    const names = data.map((data) => data.name); // create array from data,
                                                // this might be redundant but it make code more readably
    return (
        <Downshift
            onChange={onChange}
            itemToString={names=>(names ? names.name:'')}
            //inputValue={inputValue}
        >
            {({
                  getInputProps, // Props to pass to our input
                  getItemProps,  // Props to pass into each of the suggested items
                  isOpen,        // Whether the "suggestions box" is visible or not
                  inputValue,   // Value that the user typed in the search box
                  selectedItem,  // Item that is currently selected in the list (when hovering)
                  highlightedIndex, // Index of the item currently selected in the list
                  getLabelProps,
              }) => (
                <div>
                    <label {...getLabelProps()}>test</label> &nbsp;
                    <input onChange={onChange} placeholder={placeholder} {...getInputProps()} />
                    <div className={'bt_border'}>
                        <input type={'submit'} className={"bt_country"} onSubmit={onClick} />
                    </div>
                    {isOpen ? (
                        <div style={{border: '1px solid #ccc'}}>
                            {names.filter(i => !inputValue || i.toLowerCase() //Search name from array
                                .includes(inputValue.toLowerCase()),)
                                .slice(0,5)//show only limited number of element
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
