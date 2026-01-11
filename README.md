# Muhammad Abdullah - Portfolio Website

A production-ready portfolio website for Muhammad Abdullah, Full Stack Software Engineer, built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **Next.js 15 App Router** - Latest Next.js with server components
- **TypeScript** - Full type safety across the project
- **Tailwind CSS** - Utility-first styling with custom theme
- **Framer Motion** - Smooth animations and transitions
- **Dark/Light Mode Toggle** - Theme switcher with next-themes
- **Fully Responsive** - Mobile-first design with hamburger menu
- **Custom Scrollbar** - Styled scrollbar matching the theme
- **Contact Form** - Working contact form with email integration
- **Admin Dashboard** - Manage projects, blogs, and testimonials
- **Vercel Analytics** - Built-in analytics and speed insights
- **SEO Optimized** - Sitemap, robots.txt, meta tags, and OpenGraph
- **Security** - Rate limiting, spam detection, and authentication

## Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx          # Root layout with metadata and theme
│   ├── page.tsx            # Main page with all sections
│   └── globals.css         # Global styles and custom scrollbar
├── components/
│   ├── Navbar.tsx          # Navigation with mobile menu
│   ├── Hero.tsx            # Hero section with animations
│   ├── ProjectCard.tsx     # Project cards with hover effects
│   ├── TechStack.tsx       # Skills grid
│   └── Footer.tsx          # Footer with copy email button
├── constants/
│   └── data.ts             # All portfolio data (EDIT THIS FILE)
└── public/
    └── images/             # Project screenshots
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env.local` and update the values:

```bash
cp .env.example .env.local
```

**IMPORTANT**: Update these values in `.env.local`:
- `GMAIL_USER` - Your Gmail address
- `GMAIL_APP_PASSWORD` - Generate an App Password from Google Account settings
- `RECIPIENT_EMAIL` - Where contact form submissions should be sent
- `ADMIN_USERNAME` - Admin dashboard username (change from default)
- `ADMIN_PASSWORD` - Admin dashboard password (change from default)
- `JWT_SECRET` - Random secret key (minimum 32 characters)

### 3. Portfolio Data

The portfolio is now fully customized with Muhammad Abdullah's information from his CV:
- Personal info (Full Stack Software Engineer with 3+ years of experience)
- 6 Real projects (Tickly, Houdini Tickets, Dental Clinic Automation, etc.)
- Tech skills including n8n Automation and Apache Airflow
- 4 Professional work experiences
- GitHub and LinkedIn links

To update data, edit `constants/data.ts` or use the **Admin Dashboard**

### 4. Add Project Images

Place your project screenshots in `public/images/`:
- project-1.jpg
- project-2.jpg
- etc.

Then uncomment the `<Image>` component in `components/ProjectCard.tsx` (line 42-48).

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Admin Dashboard

Access the admin dashboard at [http://localhost:3000/admin](http://localhost:3000/admin)

Default credentials (CHANGE THESE IN PRODUCTION):
- Username: `admin`
- Password: `admin123`

From the dashboard, you can:
- Add, edit, and delete projects
- Create and manage blog posts
- Add and manage testimonials

### 7. Build for Production

```bash
npm run build
npm start
```

## Customization Guide

### Colors

The color palette is defined in `app/globals.css` and uses Tailwind's zinc colors with indigo accents:
- Background: `#09090b` (zinc-950)
- Text: `zinc-100` for primary, `zinc-400` for secondary
- Accent: `indigo-500` and `indigo-600`

To change colors, modify the classes in components or extend the theme in `tailwind.config.ts`.

### Fonts

The project uses Inter font from Google Fonts. To change:
1. Import a different font in `app/layout.tsx`
2. Update the className in the `<body>` tag

### Animations

All animations use Framer Motion. Key animation types:
- **Fade in**: On initial load
- **Slide up**: Reveal on scroll
- **Hover lift**: Card hover effects
- **Scale**: Button interactions

Modify animation variants in individual components.

### Sections

The main page has these sections:
- Home (Hero)
- Projects (Featured + More)
- Skills (Tech Stack)
- Experience (Timeline)
- Contact (Footer)

Add or remove sections by editing `app/page.tsx`.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repo on [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `GMAIL_USER`
   - `GMAIL_APP_PASSWORD`
   - `RECIPIENT_EMAIL`
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD`
   - `JWT_SECRET`
   - `RATE_LIMIT_MAX_REQUESTS`
   - `RATE_LIMIT_WINDOW_MS`
   - `NODE_ENV=production`
4. Deploy with one click

**Note**: Vercel Analytics will automatically work once deployed to Vercel. No additional configuration needed.

### Other Platforms

Build the static site:
```bash
npm run build
```

Deploy the `.next` folder to any hosting platform that supports Next.js.

## Performance Optimizations

- **Image Optimization**: Using next/image with lazy loading
- **Code Splitting**: Automatic with Next.js App Router
- **Font Optimization**: Google Fonts via next/font
- **CSS Purging**: Tailwind removes unused styles in production

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Authentication**: JWT with jose
- **Forms**: React Hook Form + Zod
- **Email**: Nodemailer
- **Analytics**: Vercel Analytics & Speed Insights
- **Deployment**: Vercel

## Security Features

- **Rate Limiting**: 3 requests per hour per IP for contact form
- **Input Validation**: Zod schema validation for all forms
- **Spam Detection**: Pattern-based spam filtering
- **XSS Protection**: Input sanitization
- **Authentication**: JWT-based admin authentication
- **Session Management**: Secure HTTP-only cookies
- **Route Protection**: Middleware-based admin route protection

## License

MIT License - feel free to use this template for your own portfolio!

## Credits

Built by a Senior Frontend Engineer using modern best practices.
