import { Route, Routes } from 'react-router-dom';
import { Topbar, Sidebar } from '@curious-monkey/shared-ui';
import IsoStandards from './pages/IsoStandards/IsoStandards';
import HomePage from './pages/Homepage/HomePage';
import Methodologies from './pages/Methodologies/Methodologies';
import EAFrameworks from './pages/EAFrameworks/EAFrameworks';
import FunctionalPatterns from './pages/FunctionalPatterns/FunctionalPatterns';
import Principles from './pages/Principles/Principles';

export function App() {
  return (
    <div className="antialiased bg-gray">
      <Topbar />
      <Sidebar />

      <main className="p-10 ml-64  mt-14 h-screen">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/iso-standards" element={<IsoStandards />}></Route>
          <Route path="/methodologies" element={<Methodologies />}></Route>
          <Route path="/ea-frameworks" element={<EAFrameworks />}></Route>
          <Route
            path="/functional-patterns"
            element={<FunctionalPatterns />}
          ></Route>
          <Route path="/principles" element={<Principles />}></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
