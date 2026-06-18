'use client';

export default function UpgradeButton() {
  const handleUpgrade = async () => {
    const res = await fetch('/api/checkout', { method: 'POST' });
    const data = await res.json();
    window.location.href = data.url;
  };

  return (
    <button
      onClick={handleUpgrade}
      className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-400 transition text-sm"
    >
      Upgrade to Pro · $5/mo
    </button>
  );
}
