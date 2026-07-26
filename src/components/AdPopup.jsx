import { useState, useEffect, useCallback } from "react";

const adImages = [
  "/ad/summer_sale_poster.webp",
  "/ad/summer_electrical_poster.webp",
  "/ad/sadaat_electrical_summer_poster.webp",
];

function getRandomDelay() {
  return (Math.random() * 30 + 15) * 1000;
}

function getRandomImage() {
  return adImages[Math.floor(Math.random() * adImages.length)];
}

export default function AdPopup() {
  const [show, setShow] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  const scheduleNext = useCallback(() => {
    const delay = getRandomDelay();
    return setTimeout(() => {
      setCurrentImage(getRandomImage());
      setShow(true);
    }, delay);
  }, []);

  useEffect(() => {
    const hasClosed = sessionStorage.getItem("adPopupClosed");
    if (hasClosed) return;

    const timer = scheduleNext();
    return () => clearTimeout(timer);
  }, [scheduleNext]);

  const handleClose = () => {
    setShow(false);
    sessionStorage.setItem("adPopupClosed", "true");
  };

  if (!show || !currentImage) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
      onClick={handleClose}
    >
      <div
        className="relative max-w-md w-full animate-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute -top-3 -right-3 w-9 h-9 rounded-full flex items-center justify-center z-10 transition-all hover:scale-110"
          style={{ backgroundColor: "#ffffff", boxShadow: "0 2px 12px rgba(0,0,0,0.2)" }}
        >
          <svg className="w-5 h-5" fill="none" stroke="#374151" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <img
          src={currentImage}
          alt="Promotional Offer"
          className="w-full rounded-2xl shadow-2xl"
        />
      </div>
    </div>
  );
}
