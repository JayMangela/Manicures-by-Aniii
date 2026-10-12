'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const EXTENSION_TYPES = [
  { id: 'natural', name: 'Natural Nails (Gel Mani)', price: 18, time: 45 },
  { id: 'biab', name: 'BIAB / Hard Gel Builder', price: 20, time: 60 },
  { id: 'polygel', name: 'Polygel Overlay', price: 25, time: 75 },
  { id: 'gelx', name: 'Gel-X Full Extensions', price: 25, time: 75 },
];

const LENGTHS = [
  { id: 'short', name: 'Short', price: 0 },
  { id: 'medium', name: 'Medium', price: 3 },
  { id: 'long', name: 'Long', price: 5 },
  { id: 'xlong', name: 'Extra Long', price: 8 },
];

const SHAPES = ['Almond', 'Coffin', 'Square', 'Oval', 'Stiletto'];

const FINISHES = [
  { id: 'solid', name: 'Solid Color / Nude', price: 0 },
  { id: 'french', name: 'French Tip (Classic/Micro)', price: 8 },
  { id: 'chrome', name: 'Chrome Shine', price: 5 },
  { id: 'aura', name: 'Aura Gradient Spray', price: 5 },
];

const ART_LEVELS = [
  { id: 'none', name: 'Solid / Simple', price: 0, desc: 'Single tone or minimalist glossy finish.' },
  { id: 'minimal', name: 'Minimal Art', price: 5, desc: 'Dots, line accents, foils on 1-2 accent nails.' },
  { id: 'medium', name: 'Medium Art', price: 8, desc: 'Hand-painted swirls, flames, or flowers on 4 nails.' },
  { id: 'heavy', name: 'Heavy 3D & Charms', price: 12, desc: 'Full 10-nail art, 3D gel textures, rhinestones, charms.' },
];

export function NailArtCalculator() {
  const [extension, setExtension] = useState(EXTENSION_TYPES[1]);
  const [length, setLength] = useState(LENGTHS[0]);
  const [shape, setShape] = useState(SHAPES[0]);
  const [finish, setFinish] = useState(FINISHES[0]);
  const [art, setArt] = useState(ART_LEVELS[1]);
  const [removal, setRemoval] = useState(false);

  const totalPrice = extension.price + length.price + finish.price + art.price + (removal ? 5 : 0);
  const totalDuration = extension.time + (art.id === 'heavy' ? 30 : art.id === 'medium' ? 20 : 10) + (removal ? 20 : 0);

  const hours = Math.floor(totalDuration / 60);
  const mins = totalDuration % 60;
  const timeFormatted = `${hours > 0 ? `${hours}h ` : ''}${mins > 0 ? `${mins}m` : ''}`;

  const serviceQuery = `${extension.name} (${length.name}, ${shape}) with ${art.name}`;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-accent/15 shadow-sm max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <span className="text-xs font-sans font-semibold text-accent uppercase tracking-widest block mb-2">
          Custom Set Price Estimator
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-foreground font-medium mb-3">
          Build & Price Your Custom Set
        </h2>
        <p className="text-muted-foreground font-sans text-sm sm:text-base max-w-lg mx-auto">
          Customize your extension type, length, shape, finish, and nail art level to calculate your instant price quote.
        </p>
      </div>

      <div className="space-y-8">
        
        {/* 1. Base / Extension Type */}
        <div>
          <label className="block text-xs font-sans font-semibold text-foreground uppercase tracking-wider mb-3">
            1. Base Service / Overlay Type
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {EXTENSION_TYPES.map((ext) => (
              <button
                key={ext.id}
                type="button"
                onClick={() => setExtension(ext)}
                className={`p-4 rounded-2xl border text-left font-sans transition-all cursor-pointer flex justify-between items-center ${
                  extension.id === ext.id
                    ? 'border-accent bg-accent/5 ring-1 ring-accent text-foreground'
                    : 'border-accent/15 bg-background text-foreground/80 hover:border-accent/40'
                }`}
              >
                <span className="text-sm font-medium">{ext.name}</span>
                <span className="font-serif font-semibold text-accent text-base">£{ext.price}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Length */}
        <div>
          <label className="block text-xs font-sans font-semibold text-foreground uppercase tracking-wider mb-3">
            2. Desired Length
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {LENGTHS.map((len) => (
              <button
                key={len.id}
                type="button"
                onClick={() => setLength(len)}
                className={`py-3 px-4 rounded-2xl border font-sans text-center transition-all cursor-pointer text-sm ${
                  length.id === len.id
                    ? 'border-accent bg-accent text-white font-medium shadow-sm'
                    : 'border-accent/15 bg-background text-foreground/80 hover:border-accent/40'
                }`}
              >
                <span>{len.name}</span>
                {len.price > 0 && <span className="block text-xs opacity-90 mt-0.5">+£{len.price}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Shape */}
        <div>
          <label className="block text-xs font-sans font-semibold text-foreground uppercase tracking-wider mb-3">
            3. Nail Shape
          </label>
          <div className="flex flex-wrap gap-2">
            {SHAPES.map((sh) => (
              <button
                key={sh}
                type="button"
                onClick={() => setShape(sh)}
                className={`px-5 py-2.5 rounded-full font-sans text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  shape === sh
                    ? 'bg-foreground text-background shadow-sm'
                    : 'bg-background text-foreground/80 hover:bg-accent/10'
                }`}
              >
                {sh}
              </button>
            ))}
          </div>
        </div>

        {/* 4. Finish */}
        <div>
          <label className="block text-xs font-sans font-semibold text-foreground uppercase tracking-wider mb-3">
            4. Base Color & Finish Style
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {FINISHES.map((fin) => (
              <button
                key={fin.id}
                type="button"
                onClick={() => setFinish(fin)}
                className={`py-3 px-3 rounded-2xl border font-sans text-center transition-all cursor-pointer text-xs sm:text-sm ${
                  finish.id === fin.id
                    ? 'border-accent bg-accent text-white font-medium shadow-sm'
                    : 'border-accent/15 bg-background text-foreground/80 hover:border-accent/40'
                }`}
              >
                <span>{fin.name}</span>
                {fin.price > 0 && <span className="block text-[11px] opacity-90 mt-0.5">+£{fin.price}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* 5. Art Level */}
        <div>
          <label className="block text-xs font-sans font-semibold text-foreground uppercase tracking-wider mb-3">
            5. Nail Art Level
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ART_LEVELS.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => setArt(a)}
                className={`p-4 rounded-2xl border text-left font-sans transition-all cursor-pointer flex flex-col justify-between ${
                  art.id === a.id
                    ? 'border-accent bg-accent/5 ring-1 ring-accent'
                    : 'border-accent/15 bg-background hover:border-accent/40'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-foreground">{a.name}</span>
                  <span className="font-serif font-semibold text-accent text-sm">+£{a.price}</span>
                </div>
                <p className="text-xs text-muted-foreground">{a.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* 6. Removal Option */}
        <div className="pt-2">
          <label className="flex items-center gap-3 cursor-pointer p-4 rounded-2xl border border-accent/15 bg-background hover:border-accent/40 transition-all">
            <input
              type="checkbox"
              checked={removal}
              onChange={(e) => setRemoval(e.target.checked)}
              className="w-4 h-4 accent-accent cursor-pointer"
            />
            <div className="font-sans text-sm">
              <span className="font-medium text-foreground">Add Removal of Existing Nails (+£5)</span>
              <span className="block text-xs text-muted-foreground">Gentle soak-off removal before service.</span>
            </div>
          </label>
        </div>

        {/* Live Calculation Summary Card */}
        <motion.div
          layout
          className="bg-background rounded-3xl p-6 border border-accent/20 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-sans font-semibold text-accent uppercase tracking-wider block">
              Configured Set Details
            </span>
            <h4 className="font-serif text-xl font-medium text-foreground">
              {extension.name} ({length.name}, {shape})
            </h4>
            <p className="text-xs font-sans text-muted-foreground">
              Finish: {finish.name} &bull; Art: {art.name} {removal ? '&bull; + Removal' : ''}
            </p>
            <p className="text-xs font-sans text-muted-foreground">
              Estimated Duration: <strong className="text-foreground">{timeFormatted}</strong>
            </p>
          </div>

          <div className="flex flex-col sm:items-end text-center sm:text-right gap-3">
            <div>
              <span className="text-xs font-sans text-muted-foreground block">Estimated Total</span>
              <span className="font-serif text-4xl font-semibold text-accent">£{totalPrice}</span>
            </div>

            <Link
              href={`/book?service=${encodeURIComponent(serviceQuery)}&price=${totalPrice}&step=3`}
              className="bg-accent text-white px-8 py-3.5 rounded-full font-sans font-medium text-sm hover:bg-accent-hover transition-colors shadow-md"
            >
              Book This Exact Look &rarr;
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
