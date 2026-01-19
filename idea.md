# Bookish 📚

Bookish is a full-stack e-commerce platform designed to demonstrate production-ready development practices while serving genuine business needs. Unlike algorithm-driven marketplaces, Bookish focuses on thoughtful curation, clean design, and a delightful user experience. It showcases how modern web technologies and DevOps practices come together to create a scalable, maintainable, and secure online bookstore.

## 🔭 Vision

To create an online bookstore that combines carefully curated selections with cutting-edge technology, delivering a premium shopping experience that rivals the charm of browsing a well-organized bookshelf.

---

## Core Features

### User Management

- **Registration & Login**: Email/password authentication with JWT
- **User Profiles**: Manage personal information and shipping addresses
- **Role-Based Access**: Customer and Admin roles with different permissions
- **Password Management**: Secure password reset functionality
- **Account Security**: Session management and activity logging

### Book Catalog

- **Browse Books**: Paginated listing with smooth infinite scroll
- **Search**: Full-text search across title, author, ISBN, and description
- **Filter & Sort**: By category, price range, rating, publication date, and availability
- **Book Details**: Comprehensive pages with cover images, descriptions, reviews, and stock status
- **Categories**: Organized collections (Fiction, Non-Fiction, Science, Biography, Self-Help, etc.)
- **Featured Collections**: Staff picks, bestsellers, new arrivals, and seasonal highlights

### Shopping Cart

- **Add to Cart**: One-click addition from any book page
- **Update Quantities**: Modify item counts in real-time
- **Remove Items**: Delete unwanted books with confirmation
- **Cart Persistence**: Saved cart for logged-in users, session-based for guests
- **Price Calculation**: Real-time totals with tax and shipping estimates
- **Stock Validation**: Automatic updates if items go out of stock

### Checkout & Payments

- **Shipping Information**: Address form with validation and autocomplete
- **Order Summary**: Review items, shipping, and total before purchase
- **Payment Integration**: Stripe payment processing (test and live modes)
- **Multiple Payment Methods**: Credit/debit cards and digital wallets
- **Order Confirmation**: Instant email and on-screen confirmation
- **Invoice Generation**: PDF receipts for completed orders

### Order Management

- **Order History**: View all past orders with detailed breakdowns
- **Order Tracking**: Real-time status updates (Pending → Processing → Shipped → Delivered)
- **Order Details**: Itemized view with prices, shipping info, and tracking numbers
- **Cancel/Return Requests**: Self-service cancellation for pending orders
- **Download Invoices**: PDF downloads for record-keeping

### Reviews & Ratings

- **Rate Books**: 5-star rating system
- **Write Reviews**: Text reviews with 500-character limit
- **View Reviews**: Aggregate ratings and individual reviews with helpful votes
- **Edit/Delete**: Manage own reviews
- **Verified Purchase Badge**: Show which reviews are from actual buyers
- **Review Moderation**: Admin approval workflow for quality control

### Admin Dashboard

- **Analytics Overview**: Sales stats, revenue trends, popular books, and conversion metrics
- **Book Management**: Full CRUD operations for inventory
- **Bulk Upload**: CSV/Excel import for adding multiple books
- **Order Management**: View, update status, and process orders
- **User Management**: View customer list and purchase history
- **Inventory Alerts**: Low stock notifications and reorder suggestions
- **Content Management**: Update homepage banners, featured collections, and promotional content

### Additional Features

- **Responsive Design**: Mobile-first, optimized for all devices
- **Image Management**: High-quality book cover uploads with automatic optimization
- **Email Notifications**: Order confirmations, shipping updates, and promotional emails
- **Search History**: Save recent searches for logged-in users
- **Price Drop Alerts**: Email notifications when books on wishlist go on sale (Future)

---

## User Personas

| Persona | Motivation | Key Feature Needed |
|---------|------------|-------------------|
| **The Avid Reader** | Wants quick access to bestsellers and new releases. | Featured collections & fast checkout. |
| **The Student** | Needs affordable textbooks and study materials. | Search filters & price sorting. |
| **The Gift Buyer** | Looking for thoughtful gifts for book lovers. | Curated gift recommendations & digital gift cards. |
| **The Collector** | Seeking specific editions and rare titles. | Detailed book information & ISBN search. |
| **The Casual Browser** | Discovers books through recommendations. | Staff picks & related books section. |

---



## Technical Stack

- **Frontend**: `Reactjs` with Vite for performance and Tailwind CSS for a minimalist, "paper-like" aesthetic.
- **Backend**: `Node.js` with `Express`for a scalable RESTful API.
- **Database**: `MongoDB` for a flexible, document-based schema—ideal for varied book metadata and user-generated reviews.
- **Cloud Storage**: `AWS S3` for hosting high-quality book cover images.

---

## The "Bookish" Edge (USPs)

What makes us different?

1. **Blind Date with a Book**: A subscription or one-time purchase feature where users receive a wrapped book based on three descriptive keywords.
2. **Indie Spotlight**: A dedicated section of the homepage updated weekly that features small-press publishers and debut authors.
3. **Sustainable Shipping**: Option for "Eco-friendly packaging" and carbon-neutral delivery tracking.

---