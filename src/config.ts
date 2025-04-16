import {
	ClockProps,
	SearchBarProps,
	Shortcut,
	ShortcutBarProps
} from './types.ts';

export const initialClockProps: ClockProps = {
	enableClock: true,
	useSeconds: true,
	useAM: false,
};

export const initialSearchBarProps: SearchBarProps = {
	enableSearchBar: true,
	searchUrl: "https://www.google.com/search",
	autoComplete: false,
	autoFocus: true,
};

export const initialShortcuts: Shortcut[] = [
	{ url: "www.reddit.com", title: "Reddit" },
	{ url: "www.wikipedia.com", title: "Wikipedia" },
	{ url: "www.react.dev", title: "React" },
	{ url: "www.tailwindcss.com", title: "Tailwind" },
];

export const initialShortcutBarProps: ShortcutBarProps = {
	enableShortcuts: true,
	enableEdit: false,
	openInNewTab: true,
};
