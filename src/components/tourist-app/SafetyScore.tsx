import React from 'react';
interface SafetyScoreProps {
  score: number;
  status: 'safe' | 'warning' | 'danger';
}
const SafetyScore: React.FC<SafetyScoreProps> = ({
  score,
  status
}) => {
  // Calculate the angle based on the score (0-100)
  const angle = score / 100 * 180;
  // Determine color based on status
  const getColor = () => {
    switch (status) {
      case 'safe':
        return 'text-green-500';
      case 'warning':
        return 'text-yellow-500';
      case 'danger':
        return 'text-red-500';
      default:
        return 'text-blue-500';
    }
  };
  const getBgColor = () => {
    switch (status) {
      case 'safe':
        return 'bg-green-100';
      case 'warning':
        return 'bg-yellow-100';
      case 'danger':
        return 'bg-red-100';
      default:
        return 'bg-blue-100';
    }
  };
  const getStatusText = () => {
    switch (status) {
      case 'safe':
        return 'Safe';
      case 'warning':
        return 'Caution';
      case 'danger':
        return 'Danger';
      default:
        return 'Unknown';
    }
  };
  return <div className="flex flex-col items-center">
      <div className="relative w-48 h-24 overflow-hidden">
        {/* Gauge background */}
        <div className="absolute w-48 h-48 rounded-full bg-gray-100 bottom-0"></div>
        {/* Gauge fill */}
        <div className={`absolute w-48 h-48 rounded-full ${getBgColor()} bottom-0`} style={{
        clipPath: `polygon(50% 100%, 0 100%, 0 100%, 50% 50%)`,
        transform: `rotate(${angle}deg)`
      }}></div>
        {/* Gauge center */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-24 bg-gray-800" style={{
        transformOrigin: 'bottom center',
        transform: `rotate(${angle}deg)`
      }}>
          <div className="w-4 h-4 rounded-full bg-gray-800 absolute -left-1 top-0"></div>
        </div>
      </div>
      <div className="text-center mt-6">
        <div className={`text-5xl font-bold ${getColor()}`}>{score}</div>
        <div className="mt-2 text-lg font-medium">{getStatusText()}</div>
        <div className="mt-1 text-sm text-gray-500">
          {score >= 80 ? 'You are in a safe area' : score >= 50 ? 'Exercise caution in this area' : 'High risk area - stay alert'}
        </div>
      </div>
      <div className="w-full mt-6 grid grid-cols-3 text-center text-xs">
        <div>
          <div className="text-red-500 font-medium">0-40</div>
          <div className="text-gray-500">Danger</div>
        </div>
        <div>
          <div className="text-yellow-500 font-medium">41-70</div>
          <div className="text-gray-500">Caution</div>
        </div>
        <div>
          <div className="text-green-500 font-medium">71-100</div>
          <div className="text-gray-500">Safe</div>
        </div>
      </div>
    </div>;
};
export default SafetyScore;