import React, { useState, useRef, useEffect } from 'react';

const ASCIIArtConverter: React.FC = () => {
  const [asciiArt, setAsciiArt] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<number>(5);
  const [resolution, setResolution] = useState<number>(0.05);
  const [inverted, setInverted] = useState<boolean>(false);
  const [density, setDensity] = useState<string>('@%#*+=-:. ');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateASCII = () => {
    if (!imageUrl || !canvasRef.current) return;
    
    setLoading(true);
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Calculate dimensions to maintain aspect ratio
      let width = Math.floor(img.width * resolution);
      let height = Math.floor(img.height * resolution);
      
      // Adjust for monospace character aspect ratio (characters are taller than wide)
      height = Math.floor(height * 0.5);

      canvas.width = width;
      canvas.height = height;
      
      // Draw image on canvas
      ctx.drawImage(img, 0, 0, width, height);
      
      // Get image data
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      
      // Generate ASCII
      let ascii = '';
      const densityChars = inverted ? density.split('').reverse().join('') : density;
      
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const pixelIndex = (y * width + x) * 4;
          const r = data[pixelIndex];
          const g = data[pixelIndex + 1];
          const b = data[pixelIndex + 2];
          
          // Calculate grayscale value
          const grayscale = 0.299 * r + 0.587 * g + 0.114 * b;
          
          // Map grayscale to ASCII character
          const charIndex = Math.floor((grayscale / 255) * (densityChars.length - 1));
          ascii += densityChars[charIndex];
        }
        ascii += '\n';
      }
      
      setAsciiArt(ascii);
      setLoading(false);
    };
    
    img.onerror = () => {
      setLoading(false);
      setAsciiArt('Error loading image. Please try another one.');
    };
    
    img.src = imageUrl;
  };

  useEffect(() => {
    if (imageUrl) {
      generateASCII();
    }
  }, [imageUrl, resolution, inverted, density]);

  const downloadASCII = () => {
    if (!asciiArt) return;
    
    const element = document.createElement('a');
    const file = new Blob([asciiArt], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = 'ascii-art.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">ASCII Art Generator</h1>
      
      <div className="w-full max-w-lg">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Upload an Image</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Resolution: {resolution.toFixed(2)}</label>
            <input 
              type="range" 
              min="0.05" 
              max="0.5" 
              step="0.05" 
              value={resolution} 
              onChange={(e) => setResolution(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-bold mb-2">Font Size: {fontSize}px</label>
            <input 
              type="range" 
              min="4" 
              max="16" 
              value={fontSize} 
              onChange={(e) => setFontSize(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">ASCII Density</label>
          <input 
            type="text" 
            value={density} 
            onChange={(e) => setDensity(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
          <p className="text-sm text-gray-500 mt-1">Characters from dark to light</p>
        </div>
        
        <div className="mb-4 flex items-center">
          <input 
            type="checkbox" 
            id="invert" 
            checked={inverted} 
            onChange={(e) => setInverted(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="invert" className="text-gray-700 font-bold">Invert Colors</label>
        </div>
      </div>
      
      <canvas ref={canvasRef} className="hidden"></canvas>
      
      {loading && <p className="my-4">Generating ASCII art...</p>}
      
      {asciiArt && (
        <div className="w-full mt-4">
          <div className="flex justify-between mb-2">
            <h2 className="text-xl font-bold">Result</h2>
            <button 
              onClick={downloadASCII} 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
            >
              Download
            </button>
          </div>
          <pre 
            className="font-mono overflow-auto bg-white p-4 border border-gray-300 rounded"
            style={{ 
              fontSize: `${fontSize}px`, 
              lineHeight: '1', 
              whiteSpace: 'pre',
              maxHeight: '400px'
            }}
          >
            {asciiArt}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ASCIIArtConverter;
