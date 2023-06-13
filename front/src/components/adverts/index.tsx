"use client";

import React, { useState } from "react";
import AdvertsFilter from "../advertsFilter";
import AdvertsList from "../advertsList";



interface AdvertsProps {
  filtersAdverts: {
    brands: string[];
    models: string[];
    colors: string[];
    years: number[];
    fuels: string[];
  };
}

const Adverts = ({ filtersAdverts }: AdvertsProps) => {
  const [hidden, setHidden] = useState(true);

  return (
    <div className="flex flex-col-reverse lg:flex-row">
      
      <AdvertsFilter list={filtersAdverts} hidden={hidden} setHidden={setHidden}/>
      <AdvertsList hidden={hidden} setHidden={setHidden}/>
    </div>
  );
};

export default Adverts;
