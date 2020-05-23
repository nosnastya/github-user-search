import React from "react";
import { SearchInput } from "./SearchInput";

export const Header: React.FC = () => {
  return (
    <>
      <h1>Github user search</h1>
      <SearchInput />
    </>
  );
};
