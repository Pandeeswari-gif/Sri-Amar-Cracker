import React from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle2, XCircle, Flame, Heart } from 'lucide-react';

const SafetyPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      <div className="text-center space-y-3">
        <span className="px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
          Safety First • Responsible Celebration
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-stone-100">
          Safety & Responsible Use Guidelines
        </h1>
        <p className="text-sm text-stone-400">
          Sri Amar Crackers is committed to safe, responsible, and joyous festival celebrations for every family.
        </p>
      </div>

      {/* Main Notice */}
      <div className="p-6 rounded-3xl bg-amber-950/30 border border-amber-500/40 text-amber-200 text-xs sm:text-sm space-y-2">
        <div className="font-black text-base text-amber-300 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-amber-400" />
          Responsible Firework Handling & Local Compliance
        </div>
        <p className="leading-relaxed">
          Fireworks should always be ignited outdoors in clear, open spaces under attentive adult supervision. Please adhere strictly to all applicable local municipality regulations and designated celebration hours. Never attempt to tamper with, modify, or manufacture any firework device.
        </p>
      </div>

      {/* Dos and Don'ts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* DO's */}
        <div className="p-6 rounded-3xl bg-[#140820] border border-green-500/30 space-y-4">
          <h2 className="text-lg font-black text-green-400 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            DO'S — Safe Practices
          </h2>
          <ul className="space-y-3 text-xs sm:text-sm text-stone-300">
            <li className="flex items-start gap-2">
              <span className="text-green-400 font-bold">•</span>
              <span>Always light crackers in open outdoor areas away from dry grass, vehicles, and inflammable materials.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 font-bold">•</span>
              <span>Keep a bucket of water and sand nearby for emergency extinguishing and safe disposal.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 font-bold">•</span>
              <span>Ensure children are always accompanied and supervised by responsible adults.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 font-bold">•</span>
              <span>Use an incense stick (agarbatti) or sparkler to ignite the tip of the fuse from arm’s length.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 font-bold">•</span>
              <span>Wear cotton clothes and secure footwear while handling fireworks.</span>
            </li>
          </ul>
        </div>

        {/* DON'TS */}
        <div className="p-6 rounded-3xl bg-[#140820] border border-red-500/30 space-y-4">
          <h2 className="text-lg font-black text-red-400 flex items-center gap-2">
            <XCircle className="w-5 h-5 text-red-400" />
            DON'TS — Strict Prohibitions
          </h2>
          <ul className="space-y-3 text-xs sm:text-sm text-stone-300">
            <li className="flex items-start gap-2">
              <span className="text-red-400 font-bold">•</span>
              <span>NEVER ignite fireworks indoors, on balconies, or in confined stairwells.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 font-bold">•</span>
              <span>NEVER attempt to reignite a cracker that did not ignite the first time. Soak it in water.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 font-bold">•</span>
              <span>NEVER modify, open, or combine fireworks in any way.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 font-bold">•</span>
              <span>NEVER hold lighted crackers in your hand or throw them towards people or animals.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 font-bold">•</span>
              <span>NEVER wear synthetic or loose flowing garments while lighting fireworks.</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Pet & Senior Care */}
      <div className="p-6 rounded-3xl bg-[#180a26] border border-amber-500/20 space-y-3 text-xs sm:text-sm text-stone-300">
        <h3 className="font-bold text-amber-300 flex items-center gap-2">
          <Heart className="w-4 h-4 text-amber-400" /> Consideration for Seniors & Domestic Pets
        </h3>
        <p className="leading-relaxed">
          Animals and elderly individuals are often sensitive to sudden loud acoustic sounds. Avoid bursting high-decibel sound crackers late at night or near hospitals and animal shelters. Choose colourful flower pots, novelty sparklers, and ground wheels for gentle family celebrations.
        </p>
      </div>

      <div className="text-center font-bold text-amber-300 text-sm">
        Let Happiness Sparkle Always! ✨
      </div>

    </div>
  );
};

export default SafetyPage;
