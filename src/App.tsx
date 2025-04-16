import { useState } from 'react';
import { Bolt, X } from 'lucide-react';
import { SettingsProvider } from './SettingsContext';

import Searchbar from './components/Searchbar';
import Clock from './components/Clock';
import ShortcutBar from './components/Shortcuts';
import SettingsPanel from './components/SettingsPanel';

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <SettingsProvider>

      {/* Body */}
      <div className="bg-neutral-800 h-screen w-screen flex items-center justify-center">

        {/* Settings Panel */}
        <SettingsPanel visible={sidebarOpen} setVisible={setSidebarOpen} />

        {/* Settings button */}
        <button
          type="button"
          aria-label="Toggle Settings Panel"
          className={`fixed top-6 right-6 z-50 text-gray-300 p-2 ${sidebarOpen? 'bg-neutral-600' : 'bg-neutral-700'} border border-white/10 rounded-full hover:bg-neutral-600 duration-100 hover:cursor-pointer active:scale-90`}
          onClick={() => setSidebarOpen(prev => !prev)}
        >
          { sidebarOpen ? <X size={18}/> : <Bolt size={18}/> }
        </button>

        {/* Main */}
        <div className="flex flex-col items-center gap-6 w-11/12 lg:w-[680px]">
          <Clock />
          <Searchbar />
          <ShortcutBar />
        </div>

      </div>

    </SettingsProvider>
  )
}

export default App;
