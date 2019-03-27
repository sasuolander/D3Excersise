import React from 'react';
import Downshift from 'downshift';
//import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
//import Label from '@material-ui/core/'
import connect from "react-redux/es/connect/connect";

const mapStateToProps = state => ({
    data :state.data.CO2DataSet

});
 const SearchBar = ({
                                data,//Redux
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
    return (
        <Downshift
            //onChange={onChange}
            //selectedItem={selectedItem}
            itemToString={itemToString}
            onStateChange={onStateChange}>
            {({
                  getInputProps,
                  getItemProps,
                  isOpen,
                  isActive,
                  inputValue,
                  selectedItem,
                  clearSelection,
                  highlightedIndex,
                  getLabelProps,
                  itemToString,
              }) => (
                <div>
                    <form onSubmit={onSubmit} className={'form_country'}>
                        <label {...getLabelProps()}>Search the country</label> &nbsp;
                        <Input {...getInputProps({
                            isOpen,
                            onChange: onChange,
                            placeholder: placeholder //In DownShift you need to write everything
                            // inside props of downshift
                        })} />
                        <div className={'bt_border'}>
                            <Input type={'submit'} className={"bt_country"}/>
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
export default connect(mapStateToProps)(SearchBar);