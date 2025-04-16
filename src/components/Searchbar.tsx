import { useContext } from 'react';
import { Search } from 'lucide-react';
import { SettingsContext } from '../SettingsContext';

const Searchbar = () => {
	const context = useContext(SettingsContext);

	const { searchbarProps } = context;
	const {
		enableSearchBar,
		searchUrl,
		autoComplete,
		autoFocus
	} = searchbarProps;

	const getFaviconUrl = (url: string) => {
		try {
			const domain = new URL(url).hostname;
			const faviconURL = `https://www.google.com/s2/favicons?domain=${domain}&sz=24`;
			return faviconURL;
		} catch {
			console.warn(`${url} is not a valid URL`);
			return '';
		}
	}

	if (!enableSearchBar) {
		return null;
	}

	return (
		<>
			<form action={searchUrl} method="GET">
				<div className="bg-gray-300 focus-within:bg-gray-100 text-gray-700 shadow-lg focus-within:shadow-none duration-100 px-3 py-2.5 rounded-full inline-flex gap-1.5">

					<div className="overflow-hidden drop-shadow">
						<img src={getFaviconUrl(searchUrl)} className="h-6"/>
					</div>

					<input
						name="q"
						type="search"
						aria-label="Search"
						className="w-44 sm:w-64 md:w-80 pl-2.5 pr-1.5"
						autoFocus={autoFocus}
						autoComplete={autoComplete ? 'on' : 'off'}
					/>

					{/* Search Icon */}
					<button className="hover:bg-black/20 rounded-full cursor-pointer">
						<Search size={24} className="text-gray-600 py-1" />
					</button>
				</div>

			</form>
		</>
	);
}

export default Searchbar;
