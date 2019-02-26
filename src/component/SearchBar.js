import React from 'react';
import Downshift from 'downshift';

export const SearchBar = ({
                              data,
                              placeholder,
                              onChange,
                              onClick,
                              inputValue,
                              itemToString,
                                onSubmit,
                              onStateChange,


                          }) => {
    const names = data.map((data) => data.name); // create array from data,
    // this might be redundant but it make code more readably
    //console.log("test ", onClick)
    return (
        <Downshift
            //onChange={onChange}
            //selectedItem={selectedItem}
            itemToString={itemToString}            //inputValue={inputValue}
            onStateChange={onStateChange}
        >
            {({
                  getInputProps, // Props to pass to our input
                  getItemProps,  // Props to pass into each of the suggested items
                  isOpen, // Whether the "suggestions box" is visible or not
                  isActive,
                  inputValue,   // Value that the user typed in the search box
                  selectedItem,  // Item that is currently selected in the list (when hovering)
                  clearSelection,
                  highlightedIndex, // Index of the item currently selected in the list
                  getLabelProps,
                  itemToString,

              }) => (
                <div>
                    <form onSubmit={onSubmit}>
                        <label {...getLabelProps()}>test</label> &nbsp;
                        <input {...getInputProps({
                            isOpen,
                            onChange:onChange,
                            placeholder: placeholder //In DownShift you need to write everything
                            // inside props of downshift
                        })} />
                        <div className={'bt_border'}>
                            <input type={'submit'} className={"bt_country"}/>
                        </div>
                    </form>
                    {!isOpen ? null : (
                        <div style={{border: '1px solid #ccc'}}>
                            {names
                                .filter(
                                    name => !inputValue || name.toLowerCase() //Search name from array
                                .includes(inputValue.toLowerCase()),)
                                .slice(0, 5)//show only limited number of element
                                .map((item, index) => (
                                    <div
                                        key={item}
                                        {...getItemProps({
                                            item, index,
                                            isActive: highlightedIndex === index,
                                            isSelected: selectedItem === item
                                        })}
                                        style={{
                                            backgroundColor:
                                                highlightedIndex === index ? 'gray' : 'white',
                                            fontWeight:
                                                selectedItem === item ? 'bold' : 'normal',
                                        }}>
                                        {itemToString(item)}
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            )}
        </Downshift>
    )
};

//export default SearchBar
