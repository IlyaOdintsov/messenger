import './styles.scss';
import searchIcon from '../../assets/icons/search.svg';
import { type ChangeEvent, useState } from 'react';

interface SearchInputProps {
	onChange: (value: string) => void;
}

export const SearchInput = ({ onChange }: SearchInputProps) => {
	const [searchValue, setSearchValue] = useState<string>('');

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		setSearchValue(newValue);
		onChange(newValue);
	};

	return (
		<label htmlFor="search" className="element searchWrapper p-3">
			<img className="avatar-sm p-1" src={searchIcon} alt="search" />

			<input type="text" placeholder="Search here..." id="search" autoComplete="off" value={searchValue} onChange={handleChange} />
		</label>
	);
};
