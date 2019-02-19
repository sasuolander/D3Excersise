import React from 'react'
import Downshift from 'downshift'
import PropTypes from "prop-types";

 const SearchBar = ({items, placeholder, onChange}) => {
    console.log(items)
    return (
        <Downshift
            onChange={onChange}
            render={({
                         getInputProps, // Props to pass to our input
                         getItemProps,  // Props to pass into each of the suggested items
                         isOpen,        // Whether the "suggestions box" is visible or not
                         inputValue,    // Value that the user typed in the search box
                         selectedItem,  // Item that is currently selected in the list (when hovering)
                         highlightedIndex, // Index of the item currently selected in the list
                         getLabelProps
                     }) => (
                <div>
                    <label {...getLabelProps()}>test</label>
                    <input placeholder={placeholder} {...getInputProps()} />
                    {isOpen ? (
                        <div style={{border: '1px solid #ccc'}}>
                            {items.filter(i =>
                                !inputValue || i.toLowerCase()
                                    .includes(inputValue.toLowerCase()))
                                .map((item, index) => (
                                    <div
                                        {...getItemProps({item})}
                                        key={item}
                                        style={{
                                            backgroundColor:
                                                highlightedIndex === index ? 'gray' : 'white',
                                            fontWeight:
                                                selectedItem === item ? 'bold' : 'normal',
                                        }}>
                                        {item.value}
                                    </div>
                                ))}
                        </div>
                    ) : null}
                </div>
            )
            }/>
    )
};

export default SearchBar
SearchBar.PropsTypes = {
    items:PropTypes.array,
    placeholder:PropTypes.string,
};
