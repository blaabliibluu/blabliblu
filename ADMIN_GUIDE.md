# 🔐 Admin Panel Quick Guide

## Access Information

**URL:** `admin.html`  
**Default Password:** `admin123`

---

## Features Overview

### 📊 Statistics Dashboard

Located at the top of the admin panel:

- **Total Messages** - All messages ever submitted
- **Today** - Messages received today
- **This Week** - Messages received in the last 7 days
- **Latest Message** - Time since the most recent message

### 🔍 Search & Filter

**Search Bar:**
- Type any keyword to search through message content
- Updates results in real-time as you type

**Filter Buttons:**
- **All** - Show all messages
- **Today** - Show only today's messages
- **This Week** - Show messages from the last 7 days

**Refresh Button:**
- Reload messages from the database
- Useful after making changes

### 📋 Message Table

Each message row displays:
- **#** - Message number (index)
- **Message** - Preview of message content (first 100 characters)
- **Date** - When the message was submitted
- **Actions** - View and Delete buttons

### 🎯 Actions

**View Button (👁️):**
- Opens a modal with the full message content
- Shows complete timestamp and message ID
- Click the X or outside the modal to close

**Delete Button (🗑️):**
- Removes the message permanently
- Requires confirmation before deleting
- Cannot be undone

---

## How to Use

### 1. Login
1. Navigate to `admin.html`
2. Enter the password (default: `admin123`)
3. Click "Login"

### 2. View Messages
- All messages are displayed automatically after login
- Scroll through the table to browse messages

### 3. Search for Specific Messages
- Type keywords in the search box
- Results filter automatically

### 4. Filter by Time Period
- Click "Today" to see today's messages only
- Click "This Week" to see the last 7 days
- Click "All" to see everything again

### 5. View Full Message
- Click the "View" button on any message
- Read the complete message in the popup
- Close the popup when done

### 6. Delete a Message
- Click the "Delete" button on any message
- Confirm the deletion in the popup alert
- The message will be removed permanently

### 7. Refresh Data
- Click the "Refresh" button to reload all messages
- Useful to see new messages without reloading the page

### 8. Logout
- Click the "Logout" button in the top right
- You'll be returned to the login screen

---

## Customization

### Change Password

**File:** `js/admin.js`  
**Line:** 6

```javascript
const ADMIN_PASSWORD = 'your-new-password'; // Change this
```

Replace `'admin123'` with your own secure password.

### Important Notes

- The admin panel works with both the Table API and localStorage
- Messages are loaded automatically from whichever source has data
- Deleted messages are removed from both API and localStorage
- Your session stays active until you logout or close the browser

---

## Security Considerations

⚠️ **Important:** This admin panel uses client-side password protection, which means:

- The password is stored in the JavaScript code
- Anyone with access to the source code can see it
- It's suitable for personal use or trusted environments
- For production use with sensitive data, implement server-side authentication

### Best Practices

1. **Change the default password immediately**
2. **Don't share the admin URL publicly**
3. **Use a strong, unique password**
4. **Logout when finished managing messages**
5. **Keep the password confidential**

---

## Troubleshooting

### Can't See Any Messages
- Check if messages exist in the guestbook first
- Click the "Refresh" button to reload data
- Check browser console for any errors

### Wrong Password Error
- Make sure you're using the correct password
- Check for typos or extra spaces
- Verify the password in `js/admin.js`

### Messages Not Deleting
- Make sure you have confirmed the deletion
- Check browser console for errors
- Try refreshing the page and deleting again

### Can't Login
- Clear your browser cache and cookies
- Make sure JavaScript is enabled
- Try a different browser

---

## Mobile Access

The admin panel is fully responsive and works on:
- 📱 Smartphones
- 📱 Tablets
- 💻 Laptops
- 🖥️ Desktops

The layout adapts automatically to your screen size.

---

## Support

For technical issues or questions:
1. Check the browser console for error messages
2. Review the code comments in `js/admin.js`
3. Verify that your Table API is configured correctly
4. Test in a different browser

---

**Created for:** Guestbook Management  
**Version:** 1.0  
**Last Updated:** February 2026
