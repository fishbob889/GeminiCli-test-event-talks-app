const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/api/schedule', (req, res) => {
    fs.readFile(path.join(__dirname, 'talks.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to load talks data' });
        }

        const talks = JSON.parse(data);
        const schedule = [];
        
        // Start time: 10:00 AM
        let currentTime = new Date();
        currentTime.setHours(10, 0, 0, 0);

        talks.forEach((talk, index) => {
            // Add lunch break before the 3rd talk (index 2)
            if (index === 2) {
                const lunchStart = new Date(currentTime);
                const lunchEnd = new Date(currentTime.getTime() + 60 * 60000);
                
                schedule.push({
                    type: 'break',
                    title: 'Lunch Break',
                    startTime: formatTime(lunchStart),
                    endTime: formatTime(lunchEnd),
                    duration: 60,
                    category: ['Break']
                });
                
                // Advance time by 60 mins
                currentTime = lunchEnd;
            } 
            // Add 10 min transition between talks (but not before the first one or immediately after lunch logic above handles start of 3rd)
            // Wait, logic:
            // Talk 1 End: 11:00. 
            // Talk 2 Start: 11:10 (10 min gap).
            // So if index > 0, we need a gap?
            // Actually, let's just track the "next available slot".
            // Talk 1: 10:00 -> 11:00. Next slot 11:00.
            // WE NEED 10 MIN TRANSITION.
            // So Talk 2 starts at 11:10.
            
            // Refined Logic:
            // If it's NOT the first talk, and NOT immediately after lunch (which we just handled), add 10 min transition?
            // Actually, simpler:
            // 1. If index > 0, add 10 mins to currentTime for transition.
            // 2. BUT, if we just added lunch (index === 2), the lunch gap IS the transition logic effectively? 
            //    No, lunch is 12:10-13:10. Talk 2 ended 12:10. Talk 3 starts 13:10.
            //    So there's no "10 min transition" *plus* lunch. Lunch replaces the transition.
            
            if (index > 0 && index !== 2) {
                 // Add 10 minute transition
                 // Optional: Add a "Transition" item to schedule or just invisible gap?
                 // Requirement: "Keep a 10 minute transition between talks."
                 // I will strictly shift the start time.
                 currentTime = new Date(currentTime.getTime() + 10 * 60000);
            }

            const startTime = new Date(currentTime);
            const endTime = new Date(currentTime.getTime() + talk.duration * 60000);

            schedule.push({
                type: 'talk',
                ...talk,
                startTime: formatTime(startTime),
                endTime: formatTime(endTime)
            });

            currentTime = endTime;
        });

        res.json(schedule);
    });
});

function formatTime(date) {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
