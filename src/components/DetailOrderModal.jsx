export default function DetailOrderModal({ order, onClose }) {
  // If no order is provided, don't show the modal
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop - Clickable to close */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
        onClick={onClose}
      ></div>

      {/* Modal Card */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Order Summary</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 gap-y-4 mb-6">
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400 font-bold">Order ID</p>
              <p className="text-sm font-mono text-gray-700">#{order.id}</p>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-wider text-gray-400 font-bold">Placed On</p>
              <p className="text-sm text-gray-700">{order.date}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400 font-bold">Status</p>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                {order.status || 'Processed'}
              </span>
            </div>
          </div>

          {/* Items List */}
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-wider text-gray-400 font-bold border-b border-gray-50 pb-2">Purchased Items</p>
            {order.items?.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-sm">
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-800">{item.name}</span>
                  <span className="text-gray-500 text-xs">Qty: {item.quantity}</span>
                </div>
                <span className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Total & Action */}
        <div className="bg-gray-50 p-6 border-t border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600 font-semibold">Amount Paid</span>
            <span className="text-2xl font-black text-indigo-600">${order.total?.toFixed(2)}</span>
          </div>
          <button 
            onClick={onClose}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98]"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
