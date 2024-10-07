import React, { useEffect, useState } from "react";
import InputWithIcon from "./searchBox";
import debounce from "lodash/debounce";

const SearchField = ({ data, onFilter, searchBy, placeholder ,disabled}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onFilter(data);
  }, [data]);

  const handleSearchDebounced = debounce((term) => {
    const filteredData = data.filter((item) =>
      item[searchBy] && item[searchBy].toLowerCase().includes(term.toLowerCase())
    );
    onFilter(filteredData);
    setLoading(false);
  }, 800);
  
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setLoading(true);
    handleSearchDebounced(term);
  };

  return (
    <div>
      <InputWithIcon
        disabled={disabled}
        placeholder={placeholder}
        onChange={handleSearch}
        value={searchTerm}
        loading={loading}
      />
    </div>
  );
};

export default SearchField;
