import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, CheckCircle2, XCircle, Calendar, UtensilsCrossed } from 'lucide-react';

export default function QRCodePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const date = searchParams.get('date') || '';
  const attending = searchParams.get('attending') === 'true';
  const portion = searchParams.get('portion') || 'None';

  // Human-readable date
  const formattedDate = date
    ? new Date(date + 'T00:00:00').toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '—';

  // Encode meal info into QR
  const qrData = encodeURIComponent(
    JSON.stringify({ date, attending, portion, app: 'HostelFoodSaver' })
  );
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${qrData}&color=166534&bgcolor=f0fdf4&qzone=2`;

  const handleDownload = async () => {
    const response = await fetch(qrUrl);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `meal-qr-${date}.png`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <header className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl bg-surface-100 hover:bg-surface-200 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft size={20} className="text-surface-700" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-surface-900">Meal QR Code</h2>
          <p className="text-surface-500 text-sm">Show this at the dining hall</p>
        </div>
      </header>

      {/* Status Banner */}
      <div
        className={`rounded-2xl p-4 flex items-center gap-3 ${
          attending
            ? 'bg-primary-50 border border-primary-200'
            : 'bg-red-50 border border-red-200'
        }`}
      >
        {attending ? (
          <CheckCircle2 size={22} className="text-primary-600 shrink-0" />
        ) : (
          <XCircle size={22} className="text-red-500 shrink-0" />
        )}
        <div>
          <p className={`font-semibold text-sm ${attending ? 'text-primary-700' : 'text-red-700'}`}>
            {attending ? 'Meal Confirmed' : 'Skipping Meal'}
          </p>
          <p className={`text-xs ${attending ? 'text-primary-500' : 'text-red-400'}`}>
            {attending ? `Portion: ${portion}` : 'No meal reserved for this date'}
          </p>
        </div>
      </div>

      {/* QR Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-surface-100 flex flex-col items-center gap-5">
        {/* QR Image */}
        <div className="p-3 bg-green-50 rounded-2xl border-2 border-primary-100 shadow-inner">
          <img
            src={qrUrl}
            alt="Meal QR Code"
            className="w-52 h-52 rounded-lg"
          />
        </div>

        {/* Meal Detail Pills */}
        <div className="flex flex-wrap gap-2 justify-center">
          <span className="flex items-center gap-1.5 text-xs font-medium bg-surface-100 text-surface-700 px-3 py-1.5 rounded-full">
            <Calendar size={13} />
            {formattedDate}
          </span>
          {attending && (
            <span className="flex items-center gap-1.5 text-xs font-medium bg-primary-50 text-primary-700 px-3 py-1.5 rounded-full">
              <UtensilsCrossed size={13} />
              {portion}
            </span>
          )}
        </div>

        <p className="text-xs text-surface-400 text-center">
          Scan this QR at the dining counter to confirm your meal reservation.
        </p>

        {/* Download Button */}
        <button
          onClick={handleDownload}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-surface-100 hover:bg-surface-200 active:scale-95 text-surface-700 font-semibold text-sm transition-all"
        >
          <Download size={18} />
          Download QR Code
        </button>
      </div>

      {/* Back to Home */}
      <button
        onClick={() => navigate('/')}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-primary-300 text-primary-600 hover:bg-primary-50 active:scale-95 font-semibold text-sm transition-all"
      >
        Back to Home
      </button>
    </div>
  );
}