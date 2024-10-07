import React, { useState, useCallback, useEffect } from "react";

import debounce from "lodash.debounce";
import InputWithIcon from "./searchBox";

const DebouncedInput = ({ placeholder, onSearch, loading, initialValue,disabled, ...props }) => {
  const [value, setValue] = useState(initialValue || "");
  useEffect(() => {
    setValue(initialValue);
  }, []);

  const handleSearchDebounced = useCallback(
    debounce((term) => {
      onSearch(term);
    }, 800),
    [onSearch]
  );

  const handleChange = (event) => {
    const term = event.target.value;
    setValue(term);
    handleSearchDebounced(term.toLowerCase().replace(/\s+/g, ""));
  };

  return (
    <InputWithIcon
      autofocus={true}
      placeholder={placeholder}
      onChange={handleChange}
      value={value}
      loading={loading}
      disabled={loading || disabled}
      {...props}
    />
  );
};

export default DebouncedInput;
