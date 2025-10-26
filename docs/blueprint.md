# **App Name**: EventMaster

## Core Features:

- Event Creation: Allows organizers to create new events with details such as name, date, location, and rich description. Uses React Hook Form and Zod for validation.
- Event Listing: Displays a list of events created by the organizer on the dashboard. Includes metrics such as total events, total participants, and upcoming events.
- Event Details and Editing: Enables organizers to view and edit event details. Includes tabs for details and participants. Provides options to update or delete events.
- User Authentication: Handles user registration and login using Credentials and Google OAuth with NextAuth.js and MongoDB Adapter.
- Contact Form Submission: Allows users to submit contact form with name, email, and message. Persists the submissions in MongoDB.

## Style Guidelines:

- Primary color: Deep blue (#3F51B5) for trust and reliability.
- Background color: Light gray (#F0F0F0) to provide a clean and neutral backdrop.
- Accent color: Soft purple (#9575CD) to highlight important interactive elements.
- Body and headline font: 'Inter' sans-serif for a clean and modern user experience.
- Use consistent and clear icons from Material Design to represent event-related actions and information.
- Employ a responsive layout using Material Web components for consistent rendering across devices.
- Subtle animations and transitions to enhance user interaction, such as loading indicators and form feedback.