import React from 'react';

const SearchPanel = () => {
    const searchStyle = {
      fontSize: "20px"
    }
    const searchText = "Type your subject here..."
    return <input style={searchStyle} placeholder={searchText} />;
  };

  export default SearchPanel;