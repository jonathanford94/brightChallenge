import React, { useState } from "react";

export function Button({
  onClickFunction,
  toggleData,
  buttonText,
  toggleOption1,
  toggleOption2,
}: {
  onClickFunction: any;
  toggleData: boolean;
  buttonText: string;
  toggleOption1: string;
  toggleOption2: string;
}) {
  return (
    <button
      onClick={onClickFunction}
      className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mr-8"
    >
      {`${buttonText} ${toggleData ? toggleOption1 : toggleOption2}`}
    </button>
  );
}
