import React from "react";

interface MusicCardProps {
  id: number;
  title: string;
  artist: string;
  album: string;
  coverUrl: string;
  onRemove?: () => void;
}

export const MusicCard: React.FC<MusicCardProps> = ({
  title,
  artist,
  album,
  coverUrl,
  onRemove,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={coverUrl}
        alt={`${title} by ${artist}`}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-gray-600">{artist}</p>
            <p className="text-gray-500 text-sm">{album}</p>
          </div>
          {onRemove && (
            <button
              onClick={onRemove}
              className="py-2 px-4 rounded bg-red-500 text-white hover:bg-red-700"
              title="Remove song"
              data-testid="remove-song"
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MusicCard;
