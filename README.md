# Web Development Project
Project Title : Web Development Project Part 1
Student Information
Student Number: ST10523180
Student Name: Buhebenkosi
Student Surname: Mbatsha

Project overview
Crumb & Co. — Bakery Website

Project Overview
Crumb & Co. is a responsive website built for a Cape Town-based bakery, 
developed.Crumb & Co. was founded in 2024 by Mr. Brian Mbuyezi, 
a former executive chef at The Quiet Collection, who left a ten-year fine-dining 
career to pursue his lifelong passion for baking. What began as home baking in 
Johannesburg — encouraged by friends who were professional bakers — grew into 
a fully realised bakery business in Cape Town.

The site was built using HTML, CSS, and JavaScript, with Bootstrap as the 
supporting framework, and follows a design brief centered on a warm, cozy, 
bakery-inspired aesthetic that mirrors Brian's personality and passion for 
his craft.

Purpose
As Raside and Ramli (2021:1846) note, the purpose of developing an e-bakery 
is to support an online system in expanding advertising on products. In this 
context, the Crumb & Co. website was designed to:
- Display the bakery's product range, pricing, and ingredients
- Showcase Brian's story and the personality behind the brand
- Help Crumb & Co. grow from a local business into a nationally, and 
  eventually internationally, recognised bakery
- Allow customers to easily get in touch and enquire about custom orders

Vision & Target Audience
Crumb & Co. focuses exclusively on selling cakes, built around Brian's own 
philosophy: *"I love cake — it's the best thing I've ever tasted. So, I 
decided, why not make a cake bakery for lovers of cake, such as I am?"* 
The long-term vision is to grow the bakery from a nationally recognised name 
into an international cake destination, while building a community of cake 
lovers who share in Brian's baking journey.

The target audience is individuals and event planners — particularly in 
Cape Town — looking for custom-designed cakes for birthdays, weddings, and 
other special occasions.

Key Performance Indicators
Success will be measured by the website's ability to:
- Increase Crumb & Co.'s public visibility locally, nationally, and 
  internationally
- Grow customer reach and sales
- Build and strengthen the brand's public image
- Maintain a simple, interactive site without the poor-design pitfalls that, 
  per Rosen and Purinton (2004), often undermine website performance and 
  drive up long-term maintenance costs

Technologies Used
- HTML5
- CSS3
- JavaScript
- Bootstrap
- Git & GitHub (version control)

 Pages
- Home — Introduction, hero section, product previews, and "Why Choose 
  Us" overview
- About Us — Brian's story, mission, and vision statements
- Products & Services — Cake categories, pricing, and services offered 
  (consultations, delivery, pickup, rush orders, etc.)
- Contact — Business contact details, location, and map
- Enquire — Interactive form for submitting custom cake orders

Design & User Experience
The design blends a modern and traditional aesthetic with a touch of bakery 
charm, aiming to recreate the warmth and comfort of walking into a physical 
bakery.

Color Scheme
- Warm Espresso
- Burnt Terracotta
- Heritage Olive
- Alabaster Cream
- Soft Oatmeal
- Honey Gold

Typography
| Element | Font |
|---|---|
| Heading 1 (Page titles) | Berkshire Swash |
| Heading 2 (Section titles) | Cookie |
| Heading 3 (Subheadings) | Patrick Hand |
| Body Text | Quicksand |
| Small Text | Quicksand |

Technical Requirements
- Domain name: www.crumandco.co.za
- Host: Domains.co.za
- Languages: HTML, CSS, JavaScript
- Framework: Bootstrap

Timeline
- Project Start Date: 04 August
- Project Due Date: 14 August

Budget
Beyond the one-time build cost, ongoing hosting and domain renewal fees are 
expected, with an estimated 5–10% annual increase due to inflation and 
provider pricing changes. A website redesign is also budgeted for every five 
years, estimated at R3,000–R10,000, to keep the site modern and aligned with 
customer expectations as the business grows.

Key Features and Functionality
- Homepage — The main entry point for customers, giving an overview of 
  what Crumb & Co. offers and allowing seamless navigation to other pages
- About Us — Gives customers a preview of Crumb & Co.'s history, mission, 
  and vision
- Contact Page — Provides customers with Crumb & Co.'s contact details
- Products and Services — The page customers will interact with most, 
  showing which products are available and at what price
- Enquire Form — Allows customers to submit custom cake order requests 
  directly through the site

Web goals and objectives  
"The purpose of developing an e-Bakery is to support an online system in expanding advertising on the 
products" (Raside and Ramli, 2021:1846). In context to Crumbs & Co. Their website will be used to 
display the types of cakes that are sold at what price and the ingredients used to further showcase what 
type of person Brian is. 

Timeline and Milestones
- **Project Start Date:** 04 August
- **Project Due Date:** 14 August

Changelog:
11 August: added pages & pictures & edited html code
12 August: edited html code
13 August: edited html code & readme file
14August: edited html code & readme file
24August: edited html code

Proposal refrences
Reference List
Raside, A.N. and Ramli, A.A. 2021. Development of Online Bakery Shop Web Application (e-Bakery).
Applied Information Technology and Computer Science, 2(2): 1846–1859.
Freemantle, D. 2002. The psychology of CRM. International Journal of Customer Relationship
Management. Available at: http://www.superboss.co.uk/articles2main.htm [Date Accessed: 04
August 2026]
Rosen, E.E. and Purinton, E. 2004. Website design: viewing the web as a cognitive landscape. Journal of
Business Research, 57: 787–794.

Part1
Reference list
W3Schools, 2026. HTML tutorial. [online] Available at: <https://www.w3schools.com/html/> [Accessed 13 August 2026].

=============================================================================================================================
# Part 2

### Modern Layout Architectures
• Transition to CSS Grid: Structural HTML table dependencies were removed from the product and service galleries. These were replaced with modern CSS Grid layouts (display: grid) to allow items to wrap and align automatically based on screen space.
• Standardised Component Cards: A modular card class (.item-card) was established. This ensures all dynamically loaded products or services maintain identical padding, borders, and height alignment.

### Responsive Design & Mobile Optimization
• Fluid Typography: Static font sizes for headings (h1 through h3) were replaced with fluid sizing using the CSS clamp() function. Text now scales smoothly between mobile viewports and large desktop monitors.
• Viewport Overflow Fix: Applied overflow-x: hidden to the global body setup. This eliminates unwanted horizontal scrolling on mobile touchscreens.
• Optimized Form Inputs: Input fields, text areas, and submission buttons inside the contact forms were updated to scale up to 100% width on smaller screens, making mobile tap targets easier to use.

### Navigation & Header Enhancements
• Distinct Page Branding: Individual header classes were configured for the sub-pages (About, Services, Contact, and Enquiries). Each page now successfully displays its own dedicated background image and linear gradient overlay.
• Flexbox Menu Alignment: The main navigation element was rebuilt using Flexbox to keep the bakery logo securely fixed on the left and the page links neatly grouped on the right.

### Interactive Elements & Accessibility
• Accessible Focus States: High-visibility focus indicators (:focus-visible) were integrated across all links and buttons to support keyboard-only navigation.
• Lightbox and Accordion Frameworks: Styles were established to support functional layout components, including smooth dropdown accordions and a centered lightbox layer for viewing expanded product photos.
• Motion Reduction Support: A @media (prefers-reduced-motion) query block was introduced. This automatically disables structural animations and keyframes if a visitor has motion-reduction enabled on their device.

28August: added css files
10September: wrote css files code
13September: edited css code
15September:edited and fine tuned css code
18September: made final changes for part 2

Part2
Reference list
W3Schools, 2026. HTML tutorial. [online] Available at: <https://www.w3schools.com/html/> [Accessed 18 September 2026].

=============================================================================================================================
# Part 3
## Changelog
JavaScript Changelog – Crumb & Co.
Navigation
•	Added a mobile menu button (☰ / ✕) that opens and closes the navigation links on small screens.
•	The menu closes when Escape is pressed or when the window is resized back to desktop width.
•	The link for the current page is now marked and highlighted automatically.

### Forms: validation
•	Added client-side validation to the enquiry and contact forms, using novalidate so custom error messages show instead of browser pop-ups.
•	Validation rules added:
◦	Name: 2–60 letters, no numbers.
◦	Email: standard email format.
◦	Phone: South African numbers (0… or +27…, 9 digits after the prefix), optional on the contact form.
◦	Cake flavour: 2–50 characters.
◦	Number of cakes: whole number from 1 to 50.
◦	Date: from tomorrow up to 12 months ahead.
◦	Message: minimum 10 characters, with a maximum length.
◦	Delivery: blocked with a message, since delivery is “coming soon”.
•	Fields are checked when the user leaves them. Errors clear live as the user corrects them, and the first invalid field is focused on submit.

### Forms: processing
•	Enquiry form: once valid, shows a response with an estimated price (price × size × quantity), availability, and pickup hours for the chosen day (weekday or weekend).
◦	Rush orders (2 days or less) add a 25% fee.
◦	Wedding cakes need at least 14 days’ notice.
◦	The date picker’s earliest date is set to tomorrow.
•	Contact form: builds the email (To, Subject, Body), shows a preview, and provides a button that opens the visitor’s email app.

### EmailJS integration
•	Both forms now send their details to the business email through the EmailJS REST API, using fetch() in the background (AJAX).
•	Added settings for the Public Key, Service ID and two Template IDs.
•	Added sendToEmailJS() and emailjsIsSetUp(), which handle the request and status messages (“Sending…”, success, failure).
•	The submit button is disabled while sending, to prevent double submissions.
•	If EmailJS is not configured or the request fails, a backup “email us instead” link is shown, so no enquiry is lost.

### Interactive elements
•	Accordion: on the Services page: each service is a button that expands and collapses its description.
•	Lightbox (modal): on the Products page:
◦	Photos open in a larger view when clicked or when Enter is pressed.
◦	Previous and next buttons, arrow keys, Escape, and clicking the background all work.
◦	Focus returns to the clicked photo on close.
•	Interactive map: on the Contact page, using Leaflet and OpenStreetMap, with a marker and popup for 14 Kloof Street. Scroll-zoom is enabled only after clicking the map, so page scrolling isn’t hijacked. A message is shown if the library fails to load.

### Dynamic content and search
•	Customer reviews on the home page are now loaded from a JavaScript array. They rotate every 8 seconds with a fade, and there’s a “Next review” button.
•	Products page: added live search, a category filter (birthday, wedding, custom, cupcakes) and sorting (default, A–Z, Z–A), plus a “no results” message.
•	Services page: added live search and sorting.

### Animations and transitions
•	Sections fade in as they scroll into view, using IntersectionObserver.
•	Animations are skipped for users who have “reduce motion” turned on.

### Security and accessibility
•	All user-entered text is inserted with textContent rather than innerHTML, so it can’t be run as HTML.
•	Added ARIA attributes (aria-expanded, aria-invalid, aria-current, dialog labels) and keyboard support for the menu, gallery and accordion.

### Code structure
•	The script was rewritten in a simpler style: plain functions, var, loops and if statements, with comments explaining each section.

### Testing
•	Tested at screen widths of 360, 768, 1280 and 1920 px with no horizontal scrolling and no console errors.
•	Tested validation, price and availability responses, the accordion, search, lightbox and mobile menu.
•	Tested EmailJS success, failure behaviour.

### Notes
•	Prices in the settings are placeholders and must be replaced with real prices.
•	The EmailJS keys must be added before automatic sending works.

Part3
Reference list
W3Schools, 2026. HTML tutorial. [online] Available at: <https://www.w3schools.com/html/> [Accessed 03 November 2026].



