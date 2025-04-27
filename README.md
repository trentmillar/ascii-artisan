# ASCII Art Converter

A lightweight, browser-based tool that transforms images into ASCII art with customizable settings.


## Features

- **Image to ASCII Conversion**: Upload any image and instantly convert it to ASCII characters
- **High Customization**: 
  - Adjust resolution for more or less detail
  - Change font size for display
  - Customize character density (which characters represent different brightness levels)
  - Toggle color inversion
- **Download Results**: Save your ASCII art as a plain text file
- **Real-time Preview**: See changes as you adjust settings
- **Client-side Processing**: All conversion happens in your browser - no data is sent to servers


## Installation

This project is built with React. To set up locally:

```bash
# Clone the repository
git clone https://github.com/trentmillar/ascii-artisan.git

# Navigate to project directory
cd ascii-artisan

# Install dependencies
npm install

# Start development server
npm start
```

Then open your browser to http://localhost:5173 and you'll see the ASCII art converter.

## Usage

1. **Upload an Image**: Click the file input or drag and drop an image
2. **Adjust Settings**:
   - **Resolution**: Lower values (like 0.05) provide more detail but can create larger outputs
   - **Font Size**: Controls how the ASCII art displays in the preview
   - **ASCII Density**: Customize the characters used from dark to light
   - **Invert Colors**: Switch between dark-on-light and light-on-dark modes
3. **Download**: Save your creation as a text file

## How It Works

The converter uses HTML5 Canvas to process the uploaded image:

1. Resizes the image based on the selected resolution
2. Adjusts for the rectangular nature of monospaced characters
3. Converts each pixel to grayscale
4. Maps each grayscale value to a character from the density string
5. Assembles the characters into lines and columns of text

## Technical Details

- Built with React using functional components and hooks
- Uses the Canvas API for image processing
- No external dependencies for the core conversion logic
- Fully responsive design works on mobile and desktop

## Customization

### ASCII Character Sets

The default character set (`@%#*+=-:. `) transitions from dark to light, but you can customize this to your preference. Some popular alternatives:

- `$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~<>i!lI;:,"^'. `
- `#@%$XWBA098765432*!:+=-,._` 

### Integration Tips

- The component can be easily integrated into existing React applications
- For non-React projects, you can build and use the static output

## Browser Compatibility

Tested and working in:
- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Limitations

- Very large images or extremely low resolution settings might be slow on older devices
- Character-based output is inherently limited in resolution compared to pixel-based images
- Best results are achieved with images that have good contrast

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by various ASCII art generators over the years
- Thanks to the React community for amazing tools and documentation

