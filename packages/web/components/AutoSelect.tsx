import * as React from "react";
import Downshift from "downshift";

const items = [
  { value: "apple" },
  { value: "pear" },
  { value: "orange" },
  { value: "grape" },
  { value: "banana" }
];

interface Props {
  items: any;
  onChange: (item: void) => void;
  itemToString: (item: void) => string;
}

export const AutoSelect = ({ items, onChange, itemToString }: Props) => (
  <Downshift
    onChange={onChange}
    itemToString={itemToString}
    id="autocomplete"
    labelId="autocomplete-label"
    inputId="autocomplete-input"
    menuId="autocomplete-menu"
    // onChange={selection => alert(`You selected ${selection.value}`)}
    // itemToString={item => (item ? item.value : "")}
  >
    {({
      getInputProps,
      getItemProps,
      getLabelProps,
      getMenuProps,
      isOpen,
      inputValue,
      highlightedIndex,
      selectedItem
    }) => (
      <div>
        <label {...getLabelProps()}>Enter a fruit</label>
        <input {...getInputProps()} />
        <ul {...getMenuProps()}>
          {isOpen
            ? items
                .filter(
                  (item: any) =>
                    !inputValue || itemToString(item).includes(inputValue)
                )
                .map((item: any, index: number) => (
                  <li
                    {...getItemProps({
                      key: itemToString(item),
                      index,
                      item,
                      style: {
                        backgroundColor:
                          highlightedIndex === index ? "lightgray" : "white",
                        fontWeight: selectedItem === item ? "bold" : "normal"
                      }
                    })}
                  >
                    {itemToString(item)}
                  </li>
                ))
            : null}
        </ul>
      </div>
    )}
  </Downshift>
);
