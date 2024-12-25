// Loader.jsx
import { Spinner } from "@nextui-org/react";

// eslint-disable-next-line react/prop-types
const Loader = ({ isLoading }) => {
  if (!isLoading) return null; // Don't render if not loading

  return (
    <div style={overlayStyles}>
      <div style={spinnerContainerStyles}>
        <Spinner color="primary" size="lg" />
      </div>
    </div>
  );
};

const overlayStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: 1000,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const spinnerContainerStyles = {
  textAlign: "center",
};

export default Loader;
