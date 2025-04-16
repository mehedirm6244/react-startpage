import {
	ClockProps,
	SearchBarProps,
	Shortcut,
	ShortcutBarProps
} from './types.ts';

export const initialClockProps: ClockProps = {
	enableClock: 1,
	useSeconds: 1,
	useAM: 0,
};

export const initialSearchBarProps: SearchbarProps = {
	enableSearchBar: 1,
	searchUrl: "https://www.google.com/search",
	autoComplete: 0,
	autoFocus: 1,
};

export const initialShortcuts: Shortcut[] = [
	{ url: "www.reddit.com", title: "Reddit" },
	{ url: "www.wikipedia.com", title: "Wikipedia" },
	{ url: "www.react.dev", title: "React" },
	{ url: "www.tailwindcss.com", title: "Tailwind" },
];

export const initialShortcutBarProps: ShortcutBarProps = {
	enableShortcuts: 1,
	enableEditMode: 0,
	openInNewTab: 1,
};
