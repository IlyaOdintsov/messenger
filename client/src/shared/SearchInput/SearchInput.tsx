import './styles.scss';
import searchIcon from '../../assets/search.svg';

export const SearchInput = () => {
	return (
		<label htmlFor="search" className="searchWrapper">
			<div className="iconWrapper search-icon">
				<img src={searchIcon} alt="search" />
			</div>
			<input type="text" placeholder="Search here..." id="search" autoComplete="false" />
		</label>
	);
};
