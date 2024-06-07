# facTrack

facTrack is an AI-powered tool that transcribes and summarises meeting notes in real-time. This tool leverages external APIs for language processing, providing an efficient way to capture and organise meeting discussions.

## Installation

To get started, clone the repository and install the necessary dependencies using npm:

```bash
git clone https://github.com/yourusername/facTrack.git
cd facTrack
npm install
```

## Usage

1. **Configuration**: Ensure you have the necessary API keys for the external language processing services. Add these keys to your environment variables or a configuration file.

2. **Running the Application**: Start the application by running:

```bash
npm start
```

3. **Using the Tool**:
   - Open the application in your browser.
   - Start a new meeting and enable the microphone to begin transcribing.
   - The tool will automatically process and display real-time transcription and summarised notes.

## Contributing

We welcome contributions to improve facTrack. Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a pull request to discuss and merge your changes.

Please make sure to update tests as appropriate.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Authors and Acknowledgment

- **Your Name** - _Initial work_ - [yourusername](https://github.com/yourusername)
- Thanks to [Founders And Coders](https://www.foundersandcoders.com) for their support and training.

## Project Status

The project is currently in development. Future improvements include adding more robust error handling, improving the UI, and enhancing the summarisation prompt.

## Support

For support, please open an issue on the [GitHub repository](https://github.com/yourusername/ai-meeting-notes-taker/issues).

## Roadmap

- **Version 1.0**: Initial release with basic transcription and summarisation features.
- **Version 1.1**: UI improvements and bug fixes.
- **Version 2.0**: Enhanced summarisation algorithms and support for multiple languages.

## FAQ

### What external APIs are used?

We use Google Meet API to access meet transcripts and OpenAi for text summarisation.

### How do I obtain API keys?

You can sign up for Google Cloud services and obtain API keys from the Google Cloud Console.

### Is this project open for contributions?

Yes, we welcome contributions! Please see the Contributing section for more details.
