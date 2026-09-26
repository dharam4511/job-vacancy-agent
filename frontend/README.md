# Job Vacancy Agent - React Frontend

A modern, responsive web UI for searching job vacancies powered by Claude AI.

## Features

- 🎨 Beautiful, modern UI with gradient design
- 🔍 Real-time job search by US state
- 💼 Structured job cards with company info
- 📋 Filterable job listings
- 📥 Export results to CSV
- 📱 Fully responsive design
- ⚡ Fast performance with React

## Setup

### Prerequisites

- Node.js 14+ and npm installed
- Backend API running on `http://localhost:8000`

### Installation

```bash
# Install dependencies
npm install

# Create environment file (if not exists)
echo "REACT_APP_API_URL=http://localhost:8000" > .env
```

## Running the App

### Development Mode

```bash
npm start
```

Opens at `http://localhost:3000`

### Production Build

```bash
npm run build
```

Creates optimized build in `build/` folder

## Project Structure

```
frontend/
├── public/
│   └── index.html              # HTML entry point
├── src/
│   ├── components/
│   │   ├── StateSelector.jsx   # State selection dropdown
│   │   ├── JobsList.jsx        # Jobs grid & filters
│   │   └── JobCard.jsx         # Individual job display
│   ├── App.jsx                 # Main app component
│   ├── App.css                 # Global styles
│   ├── index.js                # React entry point
│   └── index.css               # Base styles
├── package.json                # Dependencies
├── .env                        # Environment variables
└── README.md                   # This file
```

## Components

### StateSelector
- Dropdown for selecting US state
- Search button to trigger job search
- Loading state indicator

### JobsList
- Grid layout for job cards
- Search/filter functionality
- CSV export button
- Empty and loading states

### JobCard
- Company name and job title
- Location and salary info
- Skills/requirements tags
- Contact and apply buttons
- Company website link

## API Integration

The frontend communicates with the backend via:

**Endpoint:** `POST /api/chat`

**Request:**
```json
{
  "message": "Find jobs in California",
  "history": []
}
```

**Response:**
```json
{
  "response": "[{job data}]",
  "history": [...]
}
```

## Styling

Uses custom CSS with:
- CSS variables for theming
- Responsive grid layouts
- Smooth transitions and animations
- Dark/light color scheme support

### Colors
- Primary: #667eea
- Secondary: #f093fb
- Success: #4ade80
- Warning: #facc15

## Environment Variables

```env
REACT_APP_API_URL=http://localhost:8000  # Backend API URL
```

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### GitHub Pages

```bash
# Build
npm run build

# Deploy build/ folder to GitHub Pages
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

**"Could not reach the server"**
- Make sure backend is running on `http://localhost:8000`
- Check API URL in `.env`

**"No jobs found"**
- Verify backend is processing requests correctly
- Check browser console for errors

**Styling issues**
- Clear browser cache (Ctrl+Shift+R)
- Make sure App.css is loaded correctly

## License

MIT
