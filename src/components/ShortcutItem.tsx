import { useContext } from 'react';
import { Shortcut } from '../types';
import { SettingsContext } from '../SettingsContext';

const ShortcutItem = ({url, title} : Shortcut) => {
	const context = useContext(SettingsContext);
	if (!context) {
		return null;
	}
	const { shortcutBarProps } = context;
	const { enableEditMode, openInNewTab } = shortcutBarProps;

	// Normalize URL
	if (!/^https?:\/\//i.test(url)) {
		url = "https://" + url;
	}

	const domain = new URL(url).hostname;
	const favicon = `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;

	return (
		<a
			href={url}
			className="hover:no-underline"
			target={!!openInNewTab? "_blank" : "_self"}
		>
			<div
				className={`
					flex flex-col gap-2 items-center align-middle justify-center bg-white/10 w-20 h-20 rounded-lg border border-white/5 hover:bg-white/20 duration-100 active:scale-90 ${!!enableEditMode ? 'animate-wiggle opacity-80' : 'animate-none'}
					`}
				>
				<img src={favicon} className="h-8 w-8 rounded-full mt-1"/>
				<p className="text-white text-xs truncate w-full text-center px-1">
					{title}
				</p>
			</div>
		</a>
	);
}

export default ShortcutItem;
