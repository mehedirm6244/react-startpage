type ToggleButtonProps = {
	id: string;
	label?: string;
	checked: boolean;
	onChange: (checked: boolean) => void;
};

const ToggleButton = ({ id, label, checked, onChange } : ToggleButtonProps) => {
	return (
		<div className="flex items-center space-x-2">
			<button
				id={id}
				role="switch"
				aria-checked={checked}
				onClick={() => onChange(!checked)}
				className={`relative inline-flex h-5 w-9 items-center rounded-full duration-200 ${checked ? 'bg-blue-500' : 'bg-gray-400'}`}
				>
				<span className={`h-3 w-3 rounded-full bg-white duration-200 ${checked ? 'translate-x-5' : 'translate-x-1'}`} />
			</button>

			{ label &&
				<label htmlFor={id} className="text-sm">{label}</label>
			}
		</div>
	);
}

export default ToggleButton;
