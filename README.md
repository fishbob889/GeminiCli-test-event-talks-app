# TechDay 2026 Event Schedule

A responsive web application to display the schedule for a 1-day technical event.

## Features

*   **Dynamic Schedule Generation:** Automatically calculates talk timings, including transitions and breaks.
*   **Search Functionality:** Filter talks by category (e.g., "Frontend", "AI", "Security").
*   **Responsive Design:** Optimized for both desktop and mobile viewing.
*   **Modern UI:** Clean, card-based layout with clear visual hierarchy.

## Technologies Used

*   **Backend:** Node.js, Express.js
*   **Frontend:** HTML5, CSS3, JavaScript (ES6+)
*   **Data:** JSON file storage (`talks.json`)

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
├── public/             # Frontend files
│   ├── index.html      # Main HTML page
│   ├── style.css       # Stylesheets
│   └── script.js       # Client-side logic
├── server.js           # Express server and schedule logic
├── talks.json          # Raw talk data
├── package.json        # Project metadata and dependencies
└── README.md           # Project documentation
```

## License

This project is open source and available under the [ISC License](LICENSE).
