import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items: initialItems }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [items, setItems] = useState(Array.isArray(initialItems) ? initialItems : []); // Ensure items is an array

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function handleSearchChange(text) {
    setSearchText(text);
  }

  function handleItemFormSubmit(newItem) {
    setItems([...items, newItem]);
  }

  const itemsToDisplay = Array.isArray(items)
    ? items.filter((item) => {
        if (selectedCategory === "All" && !searchText) return true;

        const isCategoryMatch = selectedCategory === "All" || item.category === selectedCategory;
        const isNameMatch = item.name.toLowerCase().includes(searchText.toLowerCase());

        return isCategoryMatch && isNameMatch;
      })
    : []; // Ensure itemsToDisplay is an array

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={handleItemFormSubmit} />
      <Filter onCategoryChange={handleCategoryChange} onSearchChange={handleSearchChange} />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
