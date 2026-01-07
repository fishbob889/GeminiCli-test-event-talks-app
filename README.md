# TechDay 2026 Event Schedule

A responsive web application to display the schedule for a 1-day technical event. This project was built to demonstrate a modern, mobile-friendly schedule management system with real-time filtering and calendar integration.

## Features

*   **📅 Google Calendar Integration:** One-click button to add specific talks to your personal Google Calendar.
*   **🔍 Advanced Search:** Instant filtering across multiple fields:
    *   Talk Titles
    *   Speaker Names
    *   Categories/Keywords
*   **🧩 Schedule Continuity:** Intelligent filtering that keeps lunch breaks and transitions visible to maintain the timeline's context.
*   **⚡ Dynamic Timings:** Automatically calculates start/end times for a single-track event with customizable transition gaps.
*   **📱 Responsive Design:** Modern, clean card-based layout that works perfectly on desktop, tablets, and mobile phones.

## Technologies Used

*   **Backend:** Node.js, Express.js (REST API for schedule data)
*   **Frontend:** HTML5, CSS3 (Custom Variables), JavaScript (ES6+, Fetch API)
*   **Data:** JSON-based persistent storage (`talks.json`)

## Getting Started

### Prerequisites

*   [Node.js](https://nodejs.org/) (v14 or higher)
*   npm (Node Package Manager)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/fishbob889/GeminiCli-test-event-talks-app.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd GeminiCli-test-event-talks-app
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```

### Running the Application

1.  Start the server:
    ```bash
    node server.js
    ```
2.  Open your browser and visit: [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── public/             # Frontend static assets
│   ├── index.html      # Main application structure
│   ├── style.css       # Custom CSS with responsive grid
│   └── script.js       # Client-side state and search logic
├── server.js           # Node.js/Express server & Schedule generator
├── talks.json          # Raw source of truth for event data
├── package.json        # Dependencies and scripts
└── README.md           # Project documentation
```

## License

This project is open source and available under the [ISC License](LICENSE).