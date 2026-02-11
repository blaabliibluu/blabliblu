/**
 * Memory Lane - Interactive Memory Cards
 */

const memories = {
    1: {
        title: "The First Hello",
        content: `I still remember the day I finally texted you. I had been putting it off for days, not because I forgot, but because I didn’t know what to say. It felt strange texting someone I didn’t even know, and I was sure it would just be a few awkward messages and then nothing. But you were different. There was something calm about you, something that made the conversation feel easy, even though it was just small talk. It didn’t feel forced. It felt comfortable.Somehow, one conversation turned into many, and without even noticing, you became the person I told everything to. What started as a simple “hey” ended up giving me someone who just feels like home.`
    },
    2: {
        title: "The first video call that wasn’t planned at all.",
        content: `You just said you wanted to show me something. Casually. Like it was the most normal thing in the world. One moment we were just chatting, and the next, there you were on my screen real, moving, smiling, talking. What started as a quick call turned into random conversations, unfinished sentences, small jokes, and long pauses that somehow didn’t feel awkward. We didn’t even notice the time passing. The night grew quieter, our voices softer, our words slower. And then, somewhere between one sentence and the next, you fell asleep on the call. No goodnight. No dramatic ending. Just the quiet sound of your breathing on the other side of the screen. It felt strangely peaceful, like the world had slowed down for a while. I stayed on the call a little longer than I needed to.`
    },
    3: {
        title: "The voice notes that felt like more than songs.",
        content: `Sometimes, out of nowhere, a voice note would appear no warning, no explanation just your voice singing a song. Sometimes soft, sometimes playful, sometimes half-serious and half-joking. But there was always something about them that felt different from normal songs, like they weren’t just random, like they carried a meaning you never said out loud. And the funny part was, whenever I praised someone else’s voice, you’d get just a little quiet, or tease me, or pretend not to care but it always felt like you did. Those little reactions somehow said more than the songs ever could.`
    },
    4: {
        title: "Our rapid-fire rounds.",
        content: `There were days when neither of us really had anything to say no big updates, no interesting stories, no deep conversations waiting to happen. Just two people staring at a chat screen, typing and deleting, trying to think of something anything to keep the conversation alive. And then one of us would suggest a rapid-fire round. Random questions, silly answers, sometimes serious, sometimes completely ridiculous. It was never really about the questions or even the answers; it was just an excuse to keep talking a little longer. Because even when there was nothing to say, neither of us really wanted to leave.`
    },
    5: {
        title: "The book we almost wrote about us.",
        content: `I don’t even remember how that idea came up. One random conversation turned into another, and suddenly we were planning a book. Not a real one, not seriously just something imaginary. A story about two people, talking about what they’d be like, what kind of personalities they’d have, what names we’d give them. We spent more time choosing their names than people usually spend naming actual characters. And somewhere in that conversation, it felt like we weren’t just inventing them we were quietly borrowing pieces from ourselves. It was strange how something so fictional felt oddly familiar.`
    },
    6: {
        title: "The realization I didn’t notice at first.",
        content: `It didn’t happen all at once there was no dramatic moment, no sudden thought, no clear beginning, just small things scattered across ordinary days. Like the time something tiny happened and you were the first person I wanted to tell, or the day we barely talked and I couldn’t explain why everything felt a little quieter than usual. There were nights when your silence felt strange, like a familiar sound had gone missing, and one evening, without even thinking, I scrolled back through our old conversations not looking for anything, just reading them again like they meant more than simple words. Somewhere in between, I started noticing the small things about you your habits, your tone, the way you reacted to certain topics. And then one day, I caught myself smiling at my phone for no real reason. It was just a message, nothing special, nothing dramatic, but that small, silly reaction said more than the message ever could. That’s when I realized this wasn’t just routine anymore your thoughts had started to matter, your mood affected mine, and your presence had quietly become part of my day. And the strangest part was… I couldn’t even tell when it began.`
    }
};

// Initialize memory cards
document.addEventListener('DOMContentLoaded', () => {
    const memoryCards = document.querySelectorAll('.memory-card');
    const modal = document.getElementById('memoryModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalText = document.getElementById('modalText');

    memoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const memoryId = card.getAttribute('data-memory');
            const memory = memories[memoryId];

            if (memory) {
                modalTitle.textContent = memory.title;
                modalText.textContent = memory.content;
                modal.classList.add('active');
            }
        });
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Stagger animation for cards
    memoryCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });
});

function closeModal() {
    const modal = document.getElementById('memoryModal');
    modal.classList.remove('active');
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});
