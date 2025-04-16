export type ClockProps = {
	enableClock: boolean;
	useSeconds: boolean;
	useAM: boolean;
};

export type SearchBarProps = {
	enableSearchBar: boolean;
	searchUrl: string;
	autoComplete: boolean;
	autoFocus: boolean;
};

export type Shortcut = {
	url: string;
	title: string;
};

export type ShortcutBarProps = {
	enableShortcuts: boolean;
	enableEdit: boolean;
	openInNewTab: boolean;
}
