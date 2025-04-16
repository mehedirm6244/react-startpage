import { useState, useContext, useEffect } from 'react';
import { SettingsContext } from '../SettingsContext';
import { Shortcut } from '../types';

type ShortcutEditorProps = {
	showEditor: boolean;
	setShowEditor: (visible: boolean) => void;
};

const ShortcutEditor = ({ showEditor, setShowEditor }: ShortcutEditorProps) => {
	const context = useContext(SettingsContext);
	if (!context) {
		return null;
	}

	const { setShortcut } = context;

	const [title, setTitle] = useState('');
	const [url, setUrl] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!title || !url) {
			return;
		}

		setShortcut((prev: Shortcut[]) => [...prev, { title, url }]);
		setTitle('');
		setUrl('');
		setShowEditor(false);
	};

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setShowEditor(false);
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [setShowEditor]);

	if (!showEditor) {
		return null;
	}

	return (
		<div
			className="fixed top-0 left-0 flex items-center justify-center h-screen w-screen bg-black/30 z-40"
			onClick={() => setShowEditor(false)}
		>
			<div
				className="h-auto w-80 rounded-xl p-6 bg-neutral-700 text-gray-100 border border-white/10 shadow-xl space-y-4 z-50 overflow-auto select-none duration-300 ease-in-out"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="text-gray-100 flex justify-self-stretch items-center">
					<p className="font-medium text-xl">Add Shortcut</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="text-sm px-3 py-1 space-y-3">
						<div className="flex flex-row items-center">
							<label htmlFor="title" className="font-medium w-12">Title</label>
							<input
								id="title"
								type="text"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								className="text-gray-100 w-full px-2 py-1 bg-white/10 border border-white/5 rounded duration-100 focus:bg-white/20 focus:border-white/20"
							/>
						</div>

						<div className="flex flex-row items-center">
							<label htmlFor="url" className="font-medium w-12">URL</label>
							<input
								id="url"
								type="url"
								value={url}
								onChange={(e) => setUrl(e.target.value)}
								className="text-gray-100 w-full px-2 py-1 bg-white/10 border border-white/5 rounded duration-100 focus:bg-white/20 focus:border-white/20"
							/>
						</div>
					</div>

					<div className="flex justify-end gap-2">
						<button
							className="px-3 py-1.5 rounded-full bg-white/10 border border-white/5 text-white hover:bg-white/20 text-sm font-medium"
							onClick={() => setShowEditor(false)}
						>
							Cancel
						</button>
						<button
							type="submit"
							className="px-3 py-1.5 rounded-full bg-blue-500 border border-white/5 text-gray-100 hover:bg-blue-400 text-sm font-medium"
						>
							Add
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ShortcutEditor;
