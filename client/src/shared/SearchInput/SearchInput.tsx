import './styles.scss';
import searchIcon from '../../assets/search.svg';
import {type ChangeEvent, useState} from "react";

interface SearchInputProps {
    onChange: (value: string) => void;
}

export const SearchInput = ({ onChange }: SearchInputProps) => {
    const [searchValue, setSearchValue] = useState<string>('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setSearchValue(newValue);
        onChange(newValue);

    }

	return (
		<label htmlFor="search" className="searchWrapper">
			<div className="iconWrapper search-icon">
				<img src={searchIcon} alt="search" />
			</div>
			<input type="text" placeholder="Search here..." id="search" autoComplete="off" value={searchValue}
                   onChange={handleChange} />
		</label>
	);
};
