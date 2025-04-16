import { createContext, useState, useEffect } from 'react';

import {
	initialClockProps,
	initialSearchBarProps,
	initialShortcuts,
	initialShortcutBarProps
} from './config.ts';

import {
	ClockProps,
	SearchBarProps,
	Shortcut,
	ShortcutBarProps
} from './types.ts';

const loadFromLocalStorage = (key: string, fallback: T) => {
	const item = localStorage.getItem(key);
	return item ? JSON.parse(item) : fallback;
}

export const SettingsContext = createContext(null);

export const SettingsProvider = ({ children }) => {
	const [clockProps, setClockProp] = useState(
		loadFromLocalStorage('clockProps', initialClockProps));

	const [searchbarProps, setSearchbarProp] = useState(
		loadFromLocalStorage('searchbarProps', initialSearchBarProps));

	const [shortcuts, setShortcut] = useState(
		loadFromLocalStorage('shortcuts', initialShortcuts));

	const [shortcutBarProps, setShortcutBarProp] = useState(
		loadFromLocalStorage('shortcutBarProps', initialShortcutBarProps));

	useEffect(() => {
		localStorage.setItem('clockProps', JSON.stringify(clockProps));
	}, [clockProps]);

	useEffect(() => {
		localStorage.setItem('searchbarProps', JSON.stringify(searchbarProps));
	}, [searchbarProps]);

	useEffect(() => {
		localStorage.setItem('shortcuts', JSON.stringify(shortcuts));
	}, [shortcuts]);

	useEffect(() => {
		localStorage.setItem('shortcutBarProps', JSON.stringify(shortcutBarProps));
	}, [shortcutBarProps]);

	return (
		<SettingsContext.Provider
			value={{
				clockProps,
				setClockProp,
				searchbarProps,
				setSearchbarProp,
				shortcuts,
				setShortcut,
				shortcutBarProps,
				setShortcutBarProp
			}}
		>
			{children}
		</SettingsContext.Provider>
	);
};
