import { useContext, useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { SettingsContext } from '../SettingsContext';
import { Shortcut } from '../types';

import ShortcutEditor from './ShortcutEditor';
import ShortcutItem from './ShortcutItem';

const ShortcutBar = () => {
	const context = useContext(SettingsContext)!;

	const { shortcuts, setShortcut, shortcutBarProps } = context;
	const { enableShortcuts, enableEdit } = shortcutBarProps;
	const [showEditor, setShowEditor] = useState(false);

	if (!enableShortcuts) {
		return null;
	}

	return (
		<>
			<div className="bg-neutral-700 shadow rounded-xl border border-white/10 p-2 flex flex-row gap-2 justify-center flex-wrap">
				{shortcuts.map((shortcut: Shortcut, i: number) => (
					<div key={i} className="relative">
						{ !!enableEdit &&
							<div
								className="absolute z-10 -top-1 -right-1 bg-red-500 hover:bg-red-400 text-gray-100 p-1 rounded-full duration-100 active:scale-90"
								onClick={() => setShortcut((prev: Shortcut[]) => prev.filter((_: Shortcut, idx: number) => idx !== i))}
							>
								<Minus size={16} />
							</div>
						}
  					<ShortcutItem url={shortcut.url} title={shortcut.title} />
  				</div>
				))}

				{/* Edit Button */}
				{ !!enableEdit && 
					<div
						onClick={() => setShowEditor(true)}
						className="flex flex-col gap-1 items-center align-middle justify-center bg-neutral-600 w-12 h-12 m-4 rounded-full border border-white/5 hover:bg-neutral-500 duration-100 active:scale-90"
						>
						<Plus
			 				size={18}
			 				className="text-2xl text-gray-200 duration-100"
			 			/>
					</div>
				}
				<ShortcutEditor showEditor={showEditor} setShowEditor={setShowEditor}/>
			</div>
		</>
	);
}

export default ShortcutBar;
