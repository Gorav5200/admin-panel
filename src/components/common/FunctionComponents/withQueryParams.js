import React from "react";
import { useLocation } from "react-router-dom";

const withQueryParams = (WrappedComponent) => {
  return (props) => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const queryParams = {};

    searchParams.forEach((value, key) => {
      queryParams[key] = value;
    });

    const sortedParams = Array.from(searchParams.keys())
      .sort()
      .reduce((acc, key) => {
        acc.append(key, searchParams.get(key));
        return acc;
      }, new URLSearchParams());

    const queryString = sortedParams.toString();

    return (
      <WrappedComponent
        {...props}
        queryParams={queryParams}
        queryString={queryString}
      />
    );
  };
};

export default withQueryParams;
