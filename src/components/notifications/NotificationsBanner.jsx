function NotificationsBanner() {
  return (
    <div className="notifications-banner">
      <svg
        className="notifications-banner-svg"
        viewBox="0 0 800 220"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="bannerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
        </defs>

        <rect width="800" height="220" fill="url(#bannerGrad)" />

        {/* soft decorative circles */}
        <circle cx="90" cy="40" r="70" fill="#ffffff" opacity="0.07" />
        <circle cx="720" cy="180" r="100" fill="#ffffff" opacity="0.07" />
        <circle cx="650" cy="40" r="30" fill="#ffffff" opacity="0.1" />

        {/* dotted ring pulses (bell "ping") */}
        <circle cx="400" cy="110" r="55" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.25" />
        <circle cx="400" cy="110" r="75" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.15" />

        {/* bell body */}
        <g transform="translate(400 110)">
          <path
            d="M0 -50c-22 0-38 18-38 40v18c0 10-4 19-12 26h100c-8-7-12-16-12-26v-18c0-22-16-40-38-40z"
            fill="#ffffff"
          />
          <path d="M-16 34a16 16 0 0 0 32 0z" fill="#ffffff" />
          <circle cx="0" cy="-54" r="6" fill="#ffffff" />
        </g>

        {/* notification dot */}
        <circle cx="432" cy="70" r="10" fill="#ef4444" stroke="#ffffff" strokeWidth="3" />

        {/* small envelope, offset */}
        <g transform="translate(240 130)" opacity="0.9">
          <rect x="-30" y="-20" width="60" height="42" rx="6" fill="#ffffff" />
          <path d="M-30 -20l30 22 30 -22" fill="none" stroke="#ec4899" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* small check badge, offset */}
        <g transform="translate(560 150)" opacity="0.9">
          <circle r="22" fill="#ffffff" />
          <path d="M-9 0l6 6 12 -13" fill="none" stroke="#10b981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

export default NotificationsBanner;