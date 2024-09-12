import React from "react";

export default function PaginationDiv({
  pageNo,
  incrementPage,
  decrementPage,
  totalPages,
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "15rem",
      }}
    >
      <button
        style={{ width: "5rem", margin: 5, height: 40 }}
        disabled={pageNo === 1}
        onClick={decrementPage}
      >
        Previous
      </button>
      <button style={{ width: "5rem", margin: 5, height: 40 }}>{pageNo}</button>
      <button
        style={{ width: "5rem", margin: 5, height: 40 }}
        onClick={incrementPage}
        disabled={pageNo === totalPages}
      >
        Next
      </button>
    </div>
  );
}
