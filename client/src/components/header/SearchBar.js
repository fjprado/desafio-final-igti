import React from "react";

export default function SearchBar({ filter, onFilterChange }) {
  const handleInputChange = (event) => {
    onFilterChange(event.target.value);
  };

  return (
    <div>
      <input
        placeholder="Busque a transação pela descrição"
        type="text"
        value={filter}
        onChange={handleInputChange}
      />
    </div>
  );
}
