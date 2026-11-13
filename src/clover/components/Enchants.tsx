// @ts-nocheck
import { useState, type CSSProperties } from "react";
import { Modal } from "./panels";
import { Block, PixelIcon } from "./ui";

/**
 * Eight equip slots, all unlocked, laid out exactly like the reference:
 * one on top, two wide, two tucked in, then three along the base.
 * Columns are half-steps on a six-track grid so every tile spans two.
 */
const SLOT_LAYOUT: Array<{ col: number; row: number }> = [
  { col: 3, row: 1 },
  { col: 1, row: 2 }, { col: 5, row: 2 },
  { col: 2, row: 3 }, { col: 4, row: 3 },
  { col: 1, row: 4 }, { col: 3, row: 4 }, { col: 5, row: 4 },
];
const SLOT_COUNT = SLOT_LAYOUT.length;

/**
 * The enchanting room: a violet slot panel on the left (magic circle, plus
 * tiles, all unlocked) and a bright dotted display grid on the right.
 * No enchants exist yet, so both areas start empty by design.
 */
export function EnchantsModal({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  return (
    <Modal title="ENCHANTS!" headTone="tint" headHue={292} icon="enchant" onClose={onClose} className="enchants-modal">
      <div className="ench-toolbar">
        <label className="ench-search" htmlFor="enchants-search">
          <PixelIcon name="lens" className="ench-search-icon" />
          <input
            id="enchants-search"
            className="ench-search-input"
            type="text"
            placeholder="Search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Search enchants"
          />
        </label>
      </div>
      <div className="ench-body">
        <Block tone="dark" className="ench-slots" faceClassName="ench-slots-face">
          <div className="ench-stage">
            <svg className="ench-circle" viewBox="0 0 200 200" aria-hidden="true">
              <circle cx="100" cy="100" r="86" />
              <circle cx="100" cy="100" r="58" />
              <polygon points="100,14 144.3,202.2 22.9,82.8 177.1,82.8 55.7,202.2" />
            </svg>
            <div className="ench-slot-grid" role="group" aria-label={`Enchant slots, ${SLOT_COUNT} unlocked and empty`}>
              {SLOT_LAYOUT.map((pos, index) => (
                <span
                  key={index}
                  className="ench-slot px"
                  style={{ "--i": index, gridColumn: `${pos.col} / span 2`, gridRow: pos.row } as CSSProperties}
                  aria-label={`Enchant slot ${index + 1}, unlocked, empty`}
                >
                  <span className="ench-slot-plus tx-stroke" aria-hidden="true">+</span>
                </span>
              ))}
            </div>
          </div>
          <span className="tx-stroke ench-slots-caption">EXTRA ENCHANT SLOTS</span>
        </Block>
        <Block tone="metal" className="ench-list" faceClassName="ench-list-face" aria-label="Enchant collection">
          <div className="ench-list-grid" aria-label="No enchants yet" />
        </Block>
      </div>
    </Modal>
  );
}
