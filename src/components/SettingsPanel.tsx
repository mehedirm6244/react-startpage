import { useContext, useEffect } from 'react';
import { SettingsContext } from '../SettingsContext';
import ToggleSwitch from './ToggleSwitch';

import { SearchBarProps } from '../types';

type SettingsPanelProps = {
	visible: boolean,
	setVisible: (visible : boolean) => void;
};

const SettingsPanel = ({visible, setVisible} : SettingsPanelProps) => {
	const context = useContext(SettingsContext);
	if (!context) {
		return null;
	}

	const {
		clockProps,
		setClockProp,
		searchbarProps,
		setSearchbarProp,
		shortcutBarProps,
		setShortcutBarProp
	} = context;

	const handleToggle = (setter: Function, prop: string) => (value: boolean) => {
		setter((prev: any) => ({
			...prev,
			[prop]: value ? 1 : 0
		}))
	};

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setVisible(false)
			};
		};

		if (visible) {
			window.addEventListener('keydown', handleKeyDown);
		}

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [visible]);

	return (<>
		{/* Backdrop */}
		{visible && (
			<div
				className="fixed inset-0 bg-black/30 z-40"
				onClick={() => setVisible(false)}
			></div>
		)}

		{/* Settings Panel */}
		<div className={`fixed right-0 top-0 h-screen w-80 p-6 bg-neutral-700 text-gray-100 shadow-xl space-y-6 z-50 overflow-auto select-none duration-300 ease-in-out ${visible ? 'translate-x-0' : 'translate-x-full'}`}>
			<p className="text-3xl">Settings</p>

			{/* Clock */}
			<div className="bg-white/5 border border-white/5 px-4 py-3 rounded-lg space-y-2 text-sm">
				<div className="font-medium text-lg flex justify-between items-center align-middle">
					<p>Clock</p>
					<ToggleSwitch
						id="enableClock"
						checked={clockProps.enableClock}
						onChange={handleToggle(setClockProp, 'enableClock')}
					/>
				</div>

				{!!clockProps.enableClock && <>
					<ToggleSwitch
						id="useSeconds"
						label="Show Seconds"
						checked={!!clockProps.useSeconds}
						onChange={handleToggle(setClockProp, 'useSeconds')}
					/>

					<ToggleSwitch
						id="useAM"
						label="Use 12H Clock"
						checked={!!clockProps.useAM}
						onChange={handleToggle(setClockProp, 'useAM')}
					/>
				</>}		
			</div>

			{/* Searchbar */}
			<div className="bg-white/5 border border-white/5 px-4 py-3 rounded-lg space-y-2 text-sm">
				<div className="font-medium text-lg flex justify-between items-center align-middle">
					<p>Search</p>
					<ToggleSwitch
						id="enableSearchBar"
						checked={!!searchbarProps.enableSearchBar}
						onChange={handleToggle(setSearchbarProp, 'enableSearchBar')}
					/>
				</div>

				{!!searchbarProps.enableSearchBar && <>
					<ToggleSwitch
						id="autocomplete"
						label="Enable Autocomplete"
						checked={!!searchbarProps.autoComplete}
						onChange={handleToggle(setSearchbarProp, 'autoComplete')}
					/>

					<ToggleSwitch
						id="autoFocus"
						label="Autofocus on Load"
						checked={!!searchbarProps.autoFocus}
						onChange={handleToggle(setSearchbarProp, 'autoFocus')}
					/>

					<div className="mt-3">
						<label htmlFor="searchUrl" className="text-sm font-medium">Search URL</label>
						<input
							id="searchUrl"
							type="url"
							value={searchbarProps.searchUrl}
							onChange={e => setSearchbarProp((prev: SearchBarProps) => ({
								...prev,
								searchUrl: e.target.value
							}))}
							className="text-gray-100 w-full px-2 py-1 bg-white/10 border border-white/5 rounded duration-100 focus:bg-white/20 focus:border-white/20"
						/>
					</div>
				</>}
	     </div>

	    {/* Shortcut Bar */}
			<div className="bg-white/5 border border-white/5 px-4 py-3 rounded-lg space-y-2 text-sm">
				<div className="font-medium text-lg flex justify-between items-center align-middle">
					<p>Shortcut Bar</p>
					<ToggleSwitch
						id="enableShortcuts"
						checked={!!shortcutBarProps.enableShortcuts}
						onChange={handleToggle(setShortcutBarProp, 'enableShortcuts')}
					/>
				</div>
					
				{!!shortcutBarProps.enableShortcuts && <>
					<ToggleSwitch
						id="enableEdit"
						label="Edit Mode"
						checked={!!shortcutBarProps.enableEdit}
						onChange={handleToggle(setShortcutBarProp, 'enableEdit')}
					/>

					<ToggleSwitch
						id="openInNewTab"
						label="Open in New Tab"
						checked={!!shortcutBarProps.openInNewTab}
						onChange={handleToggle(setShortcutBarProp, 'openInNewTab')}
					/>
				</>}		
			</div>

		</div>
	</>);
}

export default SettingsPanel;
