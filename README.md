# facTrack

facTrack is an AI-powered tool that transcribes and summarises meeting notes in real-time. This tool is designed to be used in conjunction with Google Meet by the Founders and Coders organisation.

## 🏁 Installation

To get started, clone the repository and install the necessary dependencies using npm:

```bash
git clone https://github.com/yourusername/facTrack.git
cd facTrack
npm install
```

## Usage

**Configuration**: Ensure you have added the necessary keys to your environment variables or a configuration file.

```
OPENAI_API_KEY=
PROJECT_ID=
MONGODB_URI=
JWT_TOKEN=
```

Create `credentials.json` file with the correct data:

1. Go to the facTrack project inside the Founders and Coders google organisation in the google console (accessible to anyone with a @foundersandcoders email)
2. Go to Menu > APIs & Services > Credentials
3. Go to OAuth 2.0 Client IDs and download the fac OAuth client
4. Save the downloaded JSON file as credentials.json, and move the file to your working directory.

**Running the Application**: Start the application by running:

```bash
npm start
```

**Using the Tool**:

- Open the application in your browser.
- Start a new meeting using google and manually create a meeting transcription by clicking Activities > Transcripts
  <img width="550" alt="Screenshot 2024-07-31 at 12 07 04" src="https://github.com/user-attachments/assets/63655a56-5247-45bc-b9b7-8d2cddf51c03">
  <img width="150" alt="Screenshot 2024-07-31 at 12 07 16" src="https://github.com/user-attachments/assets/f9356604-6d87-4e16-9adc-8b250ac5ede2">
  <img width="250" alt="Screenshot 2024-06-13 at 18 37 39" src="https://github.com/eliazzo/facTrack/assets/114364165/44bed224-0320-4bfd-8c03-10bc94a285a3">
  
- When the meeting ends, the transcript will automatically save to your google drive. Head to the home page of the application and follow the instructions.

## Project Status

The project is currently in the beta phase.

**🐛 Known Issues**

The google authentication process can be found in `api/google-meet/authorize.ts`. The google function `authenticate()` (called inside `authorize()`) asks the user for permission to access their google drive. It reads some credentials from `credentials.json` and creates a token, which is stored in the mongodb database `google_auth`. These credentials are sensitive and allow access to the facTrack google project inside the Founders and Coders google organisation in the google console (see configuration for how to get these credentials). Currently, when `authorize()` is run using ts-node, the behaviour is as expected; a pop up opens in the browser. However, when the function is called by a the user clicking a button, the following error appears.

```Error: Cannot find module '/Users/eazzopardi/code/my-projects/factrack/credentials.json'```

The temporary workaround is to run `authorize()` using  ts-node for the initial authentication, and then to use the app from the browser as is intended in the long run.

**Recommendations for the next phase of development:**
- Refine the openAi prompt for more accurate identification and extraction of action items from meeting transcripts and to improve the precision of key point detection.
- Address any persisting issues with Google Meet API integration by investigating alternative methods or using webhooks for real-time event monitoring. 
- Expand integration capabilities to other popular video conferencing tools such as Zoom or Microsoft Teams, based on user feedback and demand. 
- Continue to refine the UI design to improve user experience and introduce basic multimedia support.
- Introduce accessibility features such as screen reader support, keyboard shortcuts, and improved colour contrasts.
- Review and update authentication mechanisms to utilise multi-factor authentication (MFA) for added security during user logins.


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

- **Elisabeth Azzopardi** - _Initial work_ - [eliazzo](https://github.com/eliazzo)
- Thanks to [Founders And Coders](https://www.foundersandcoders.com) for their support and training.

## Support

For support, please open an issue on the [GitHub repository](https://github.com/yourusername/ai-meeting-notes-taker/issues).

## Roadmap

- **Version 1.0**: Initial release with basic transcription and summarisation features.
- **Version 1.1**: UI improvements and bug fixes.
- **Version 2.0**: Enhanced summarisation algorithms and support for multiple languages.
