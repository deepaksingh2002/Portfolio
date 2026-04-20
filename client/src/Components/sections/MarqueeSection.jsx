import React from 'react';

export const MarqueeSection = () => {
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        <span className="marquee-item"><span>✦</span> React</span>
        <span className="marquee-item"><span>✦</span> Node.js</span>
        <span className="marquee-item"><span>✦</span> TypeScript</span>
        <span className="marquee-item"><span>✦</span> Next.js</span>
        <span className="marquee-item"><span>✦</span> PostgreSQL</span>
        <span className="marquee-item"><span>✦</span> MongoDB</span>
        <span className="marquee-item"><span>✦</span> Docker</span>
        <span className="marquee-item"><span>✦</span> AWS</span>
        <span className="marquee-item"><span>✦</span> GraphQL</span>
        <span className="marquee-item"><span>✦</span> Tailwind</span>
        {/* duplicate for seamless loop */}
        <span className="marquee-item"><span>✦</span> React</span>
        <span className="marquee-item"><span>✦</span> Node.js</span>
        <span className="marquee-item"><span>✦</span> TypeScript</span>
        <span className="marquee-item"><span>✦</span> Next.js</span>
        <span className="marquee-item"><span>✦</span> PostgreSQL</span>
        <span className="marquee-item"><span>✦</span> MongoDB</span>
        <span className="marquee-item"><span>✦</span> Docker</span>
        <span className="marquee-item"><span>✦</span> AWS</span>
        <span className="marquee-item"><span>✦</span> GraphQL</span>
        <span className="marquee-item"><span>✦</span> Tailwind</span>
      </div>
    </div>
  );
};

export default MarqueeSection;
