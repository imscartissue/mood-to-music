import React, { useState } from 'react';

interface InputSliderParams {
    text: string,
    maxValue: number,
}

const InputSlider = ({text, maxValue}: InputSliderParams) => {
	const [value, setValue] = useState(maxValue);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(Number(event.target.value));
	};

	return (
		<div className="p-4 max-w-md mx-auto">
			<label className="block mb-2 font-medium text-white">
				{text}: {value}
			</label>
			<input
				type="range"
				min="1"
				max={String(maxValue)}
				value={value}
				onChange={handleChange}
				className="w-full accent-yellow-500"
			/>
		</div>
	);
};

export default InputSlider;
