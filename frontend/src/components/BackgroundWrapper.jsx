export default function BackgroundWrapper({ children }) {
  return (
    <div className="background-wrapper">
      {/* Foreground Content */}
      <div className="foreground">
        {children}
      </div>
    </div>
  );
}