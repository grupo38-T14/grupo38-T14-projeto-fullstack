"use client";

import React, { useState } from "react";
import AdvertsFilter from "../advertsFilter";
import AdvertsList from "../advertsList";

const Adverts = () => {
	const [hidden, setHidden] = useState(true);

	return (
		<div className="flex flex-col-reverse lg:flex-row">
			<AdvertsFilter hidden={hidden} setHidden={setHidden} />
			<AdvertsList hidden={hidden} setHidden={setHidden} />
		</div>
	);
};

export default Adverts;
