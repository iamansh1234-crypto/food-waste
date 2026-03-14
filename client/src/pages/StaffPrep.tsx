import { useState } from 'react';
import { ChefHat, TrendingDown, Scale, Plus } from 'lucide-react';

export default function StaffPrep() {
  const [activeTab, setActiveTab] = useState<'prep' | 'log'>('prep');

  return (
    <div className="space-y-6 pb-20">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-surface-900">Mess Operations</h2>
          <p className="text-surface-500"></p>
        </div>
        <div className="bg-primary-100 text-primary-700 p-2 rounded-xl">
          <ChefHat size={28} />
        </div>
      </header>

      {/* Tabs */}
      <div className="flex p-1 bg-surface-200 rounded-xl">
        <button 
          onClick={() => setActiveTab('prep')}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === 'prep' ? 'bg-white shadow-sm text-surface-900' : 'text-surface-500'}`}
        >
          Prep & Forecast
        </button>
        <button 
          onClick={() => setActiveTab('log')}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === 'log' ? 'bg-white shadow-sm text-surface-900' : 'text-surface-500'}`}
        >
          Log Waste
        </button>
      </div>

      {activeTab === 'prep' ? (
        <div className="space-y-4 shadow-sm border border-surface-200">
          <div className="bg-primary-50 border border-primary-200 p-4 rounded-xl">
            <div className="flex justify-between mb-2 pb-2 border-b border-primary-200">
              <span className="text-sm text-primary-800 font-semibold">Total Opted In</span>
              <span className="font-bold text-primary-900"></span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-sm text-red-600 font-medium">Skipping</span>
              <span className="font-bold text-red-700"></span>
            </div>
          </div>

          <h3 className="font-semibold text-lg pt-2 text-surface-800">Suggested Quantities</h3>
          
          <div className="bg-white rounded-xl border border-surface-200 p-4 shadow-sm space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-surface-100">
              <div>
                <p className="font-medium text-surface-900"></p>
                <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                  <TrendingDown size={12} /> <span className="font-medium"></span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg text-surface-900"></p>
                <p className="text-xs text-surface-500"></p>
              </div>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-surface-100">
              <div>
                <p className="font-medium text-surface-900"></p>
                <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                  <TrendingDown size={12} /> <span className="font-medium"></span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg text-surface-900"></p>
                <p className="text-xs text-surface-500"></p>
              </div>
            </div>
             <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-surface-900"></p>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg text-surface-900"></p>
                <p className="text-xs text-surface-500"></p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-surface-600 text-sm"></p>
          
          <div className="bg-white p-4 rounded-xl border border-surface-200 shadow-sm">
            <h4 className="font-semibold text-surface-900 mb-3 border-b pb-2"></h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-surface-600 mb-1">Leftover Amount (kg)</label>
                <div className="flex relative items-center">
                  <input type="number" defaultValue="" className="w-full bg-surface-50 border border-surface-200 py-2 pl-3 pr-10 rounded-lg focus:ring-2 focus:ring-primary-500" />
                  <Scale size={18} className="absolute right-3 text-surface-400" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-surface-600 mb-2">Type</label>
                <div className="flex gap-2">
                  <button className="flex-1 py-1.5 border-2 border-primary-500 bg-primary-50 text-primary-700 font-medium rounded-lg text-sm">Vessel (Unserved)</button>
                  <button className="flex-1 py-1.5 border border-surface-200 bg-white text-surface-600 rounded-lg text-sm">Plate Waste</button>
                </div>
              </div>

               <div>
                <label className="block text-xs font-semibold text-surface-600 mb-2">Destination</label>
                <select className="w-full text-sm bg-surface-50 border border-surface-200 py-2 px-3 rounded-lg">
                  <option></option>
                  <option></option>
                  <option></option>
                  <option></option>
                </select>
              </div>
            </div>
          </div>

          <button className="w-full py-3 bg-surface-100 text-surface-600 border border-surface-200 border-dashed rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-surface-200 transition-colors">
            <Plus size={18} /> Add another dish
          </button>

          <button className="w-full py-3.5 bg-primary-600 text-white rounded-xl font-bold shadow-md hover:bg-primary-700 transition-colors">
            Save Waste Log
          </button>
        </div>
      )}
    </div>
  );
}
