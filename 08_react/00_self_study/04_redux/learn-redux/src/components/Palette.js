import React from 'react';
import './Palette.css';

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

const PaletteItem = ({ color, active, onClick }) => {
  return (
    <div
      className={`PaletteItem ${active ? 'active' : ''}`}
      style={{ backgroundColor: color }}
      onClick={onClick}
    />
  );
};

const Palette = ({ selected, onSelect }) => {
  return (
    <div className="Palette">
      <h2>색깔을 골라골라</h2>
      <div className="colors">
        {colors.map(color => (
          <PaletteItem
            color={color}
            key={color}
            active={selected === color}
            onClick={() => onSelect(color)}
          />
        ))}
      </div>
    </div>
  );
};

export default Palette;
