import { useContext, useState, useEffect } from 'react';
import { SettingsContext } from '../SettingsContext';

const getTime = ({useAM, useSeconds} : {useAM: boolean, useSeconds: boolean}) => {
	const date = new Date();
	let hrs = date.getHours();
	const mins = date.getMinutes();
	const secs = date.getSeconds();

	let ampm = '';
	if (useAM) {
		ampm = (hrs >= 12? 'PM' : 'AM');
		hrs %= 12;
		if (!hrs) {
			hrs = 12;
		}
	}

	// Format with leading zeros
	const hrsStr = hrs.toString().padStart(2, '0');
	const minsStr = mins.toString().padStart(2, '0');
	const secsStr = secs.toString().padStart(2, '0');

	let timeStr = `${hrsStr}:${minsStr}`;
	if (useSeconds) {
		timeStr += `:${secsStr}`;
	}
	if (useAM) {
		timeStr += ` ${ampm}`;
	}
	return timeStr;
}

const Clock = () => {
	const context = useContext(SettingsContext);
	const [time, setTime] = useState('');

	const { clockProps } = context;
	const { enableClock, useSeconds, useAM } = clockProps;

	useEffect(() => {
    const tick = () => setTime(getTime({useAM, useSeconds}));
    tick(); // run once immediately

    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [useSeconds, useAM]);

  if (!enableClock) {
		return null;
	}

	return (
		<>
			<p className="text-gray-100 text-6xl">
				{ time }
			</p>
		</>
	);
}

export default Clock;
