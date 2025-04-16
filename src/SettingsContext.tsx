import { createContext, useState, useEffect } from 'react';

import {
	initialClockProps,
	initialSearchBarProps,
	initialShortcuts,
	initialShortcutBarProps
} from './config';

import {
	ClockProps,
	SearchBarProps,
	Shortcut,
	ShortcutBarProps
} from './types';

type SettingsContextType = {
	clockProps: ClockProps;
	setClockProp: React.Dispatch<React.SetStateAction<ClockProps>>;
	searchbarProps: SearchBarProps;
	setSearchbarProp: React.Dispatch<React.SetStateAction<SearchBarProps>>;
	shortcuts: Shortcut[];
	setShortcut: React.Dispatch<React.SetStateAction<Shortcut[]>>;
	shortcutBarProps: ShortcutBarProps;
	setShortcutBarProp: React.Dispatch<React.SetStateAction<ShortcutBarProps>>;
};

function loadFromLocalStorage<T>(key: string, fallback: T) {
	const item = localStorage.getItem(key);
	return item ? JSON.parse(item) : fallback;
}

export const SettingsContext = createContext<SettingsContextType | null>(null);

export const SettingsProvider = ({children} : {children: React.ReactNode}) => {
	const [clockProps, setClockProp] = useState<ClockProps>(() =>
		loadFromLocalStorage('clockProps', initialClockProps));

	const [searchbarProps, setSearchbarProp] = useState<SearchBarProps>(() =>
		loadFromLocalStorage('searchbarProps', initialSearchBarProps));

	const [shortcuts, setShortcut] = useState<Shortcut[]>(() =>
		loadFromLocalStorage('shortcuts', initialShortcuts));

	const [shortcutBarProps, setShortcutBarProp] = useState<ShortcutBarProps>(() =>
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
