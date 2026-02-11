# 🎨 Quick Customization Guide

This guide will help you personalize the website quickly and easily.

---

## 🔐 Step 1: Set Your Password Question

**File to edit:** `index.html`

**Find this line (around line 123):**
```javascript
const correctAnswer = 'central park'; // Change this to your actual answer
```

**Also update the question text (around line 61):**
```html
<label class="form-label" for="answer">What is the name of the place where we had our first date?</label>
```

**Tips:**
- Choose a question only he would know
- Keep the answer simple (case-insensitive comparison)
- Examples: "What's our song?", "Where did we first kiss?", "My nickname for you?"

---

## 🎵 Step 2: Add Your Song

**File to edit:** `js/music-player.js`

**Find line 18 and replace the URL:**
```javascript
this.audio.innerHTML = `
    <source src="YOUR_SONG_URL_HERE.mp3" type="audio/mpeg">
`;
```

**How to get a song URL:**
1. Upload your MP3 to a file hosting service (Google Drive, Dropbox, etc.)
2. Get the direct download link
3. Or use a royalty-free music service with direct URLs
4. Paste the URL between the quotes

**Important:** Make sure it's a direct `.mp3` link!

---

## 💝 Step 3: Customize Your Memories

**File to edit:** `js/memories.js`

**Find the `memories` object (lines 6-58) and edit each memory:**

```javascript
1: {
    title: "Your Memory Title Here",
    content: `Write your full memory story here. You can make it as long or short as you want. Use real details that he'll remember.`
}
```

**Tips:**
- Use specific details (dates, places, what you wore)
- Include emotions and feelings
- Make it personal and genuine
- You can add or remove memories by editing both the JS and HTML

---

## ❓ Step 4: Personalize Quiz Questions

**File to edit:** `js/quiz.js`

**Find the `quizQuestions` array (lines 6-97) and customize:**

```javascript
{
    question: "Your question here?",
    options: [
        "Option 1",
        "Option 2",
        "Option 3",
        "Option 4"
    ],
    responses: [
        "Response to option 1",
        "Response to option 2",
        "Response to option 3",
        "Response to option 4"
    ]
}
```

**Remember:** There are NO wrong answers - every response should be loving and affirming!

---

## 💌 Step 5: Write Your Love Letters

**File to edit:** `js/letters.js`

**Find the `letters` object (lines 6-100+) and edit each letter:**

Now includes **6 letters** (increased from 4!):

```javascript
1: {
    title: "Letter Title",
    date: "Subtitle or Date",
    body: `
        <p>First paragraph of your letter.</p>
        
        <p>Second paragraph with more thoughts.</p>
        
        <p>Keep adding paragraphs as needed.</p>
    `
}
```

**The 6 Letters:**
1. The Beginning - Your origin story
2. What You Mean To Me - Deep feelings
3. Our Journey - Growth together
4. A Promise - Your commitments
5. The Little Things - Small moments that matter
6. Forever - Your ultimate truth

**Tips:**
- Be honest and vulnerable
- Share specific moments and feelings
- Use the `<p>` tags for paragraphs
- Write from the heart
- Letters 5 & 6 are NEW - customize them!

---

## 💎 Step 6: List Your 50 Reasons

**File to edit:** `reasons.html`

**Find the `reasons` array (around line 84) and replace with your reasons:**

```javascript
const reasons = [
    "Your first reason",
    "Your second reason",
    "Your third reason",
    // ... add all 50 reasons
];
```

**Tips:**
- Mix big and small reasons
- Be specific ("your laugh" vs "the way you laugh at my bad jokes")
- Include qualities, moments, and feelings
- Number 50 should be the most powerful

---

## 💙 Step 7: Customize The Confession

**File to edit:** `confession.html`

**Change the typing line (around line 100):**
```javascript
const textToType = "I'm in love with you";
```

**Edit the confession paragraphs (lines 68-88):**
- Replace each `<p>` paragraph with your own words
- Keep the structure but make it personal
- The first line will type out, rest will fade in
- End with your signature style

---

## 🎨 Step 8: Adjust Colors (Optional)

**File to edit:** `css/main.css`

**Find the `:root` section (lines 8-20) to change colors:**

```css
:root {
    --sapphire-dark: #0a1628;    /* Main dark background */
    --emerald-accent: #059669;    /* Accent color */
    --gold-accent: #d4af37;       /* Gold highlights */
    /* ... more colors */
}
```

**Color scheme ideas:**
- Navy & Gold for luxury
- Charcoal & Silver for modern
- Deep Purple & Teal for unique
- Keep it dark and sophisticated!

---

## 🔍 Testing Checklist

Before sharing with him, test:

- [ ] Password unlocks correctly
- [ ] Music plays (or shows play button)
- [ ] All memory cards open and close
- [ ] Quiz progresses through all questions
- [ ] All 4 letters open properly
- [ ] 50 reasons display correctly
- [ ] Confession typing animation works
- [ ] Message form submits successfully
- [ ] Works on mobile/tablet
- [ ] All text is personalized

---

## 📱 Mobile Preview

**Important:** Always preview on mobile before sharing!

- Use browser dev tools (F12 → Device toolbar)
- Or view on your actual phone
- Check that text is readable
- Ensure buttons are tappable
- Verify music player doesn't block content

---

## 🚀 Ready to Share?

Once you've customized everything:

1. **Test the entire flow** from start to finish
2. **Check spelling** and grammar
3. **Preview on mobile** device
4. **Add the music file** URL
5. **Deploy using the Publish tab**
6. **Share the link** at the perfect moment

---

## ⚡ Quick Tips

- **Be specific:** "That time we got lost in the rain and laughed" beats "good memories"
- **Show, don't tell:** "Your smile makes my worst days better" beats "you're nice"
- **Use his language:** Write how you talk to him, not how poets write
- **Mix emotions:** Funny moments + deep feelings = perfect balance
- **End strong:** The confession is the climax - make it count

---

## 🆘 Need Help?

**Common issues:**

**Music won't play:**
- Check if URL is a direct MP3 link
- Some browsers block autoplay - user needs to click play
- Test in different browsers

**Password screen stuck:**
- Check the `correctAnswer` variable matches exactly
- Answer comparison is case-insensitive
- Look for typos in the answer

**Letters overlap:**
- This is already fixed with z-index: 3000
- Make sure you didn't modify the modal CSS

**Messages not saving:**
- Table API might not be available yet
- They'll save to localStorage as backup
- Check browser console for errors (F12)

---

## 💝 Final Reminder

This website is YOUR love story. Don't copy generic phrases - use your actual memories, your real feelings, your authentic voice. That's what will make it unforgettable.

**The more personal, the more powerful. Good luck! 💙**
