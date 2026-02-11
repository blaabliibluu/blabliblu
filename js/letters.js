/**
 * Love Letters - Heartfelt Messages
 */

const letters = {
    1: {
        title: "The Beginning",
        date: "Where It All Started",
        body: `
            <p>It was just a “hi” upon the screen,
            nothing loud, nothing seen, two quiet hearts, unsure and shy,
            hidden behind that small reply.</p>
            
            <p>Your words felt warm like evening light,
            soft as stars in a silent night,
            mine were petals, closed and small,
            afraid to bloom at all.</p>
            
            <p>But text by text, the distance died,
            like rivers slowly turning tide,
            and that one “hi,” so soft, so small,
            became the reason for it all.</p>
            
            <p>Looking back now, I can't imagine what my life would be like if we never met. And honestly, I don't want to. Because that would just be so boring and colourless.</p>
        `
    },
    2: {
        title: "What You Mean To Me",
        date: "More Than Words Can Say",
        body: `
            <p>I've tried so many times to put into words what you mean to me, and every time, I fall short. How do you describe the air you breathe? How do you explain why your heart beats? That's what you are to me - essential, vital, ineffable.</p>
            
            <p>You're my first thought in the morning and my last thought at night. You're the reason I smile for no reason on my phone. You're the calm in my chaos, the light in my darkness. You've seen me at my worst and loved me anyway. You've believed in me when I didn't believe in myself.</p>
            
            <p>With you, I'm not afraid to be vulnerable. I don't have to pretend or put on a mask. You've created a space where I can be completely, authentically myself, and that's the greatest gift anyone has ever given me.</p>
            
            <p>You're not just my amore - you're my home. Wherever you are, that's where I'll follow. i've memorised a thousand beautiful phrases, but the way you said my name just once ordinary, unmade them all.</p>
        `
    },
    3: {
        title: "Where Storm Meets Silence",
        date: "love written between your calm and my chaos.",
        body: `
            <p>I was the storm, wild and loud,
            never learned to bend or bow.
            And you were the calm, so soft and slow,
            a quiet sky with a gentle glow.
            I could talk from dusk till dawn,
            rambling on and on and on,
            and you would listen, never complain,
            holding every word like summer rain.</p>
            
            <p>You came to me when my heart was sealed,
            when love was something I refused to feel.
            But you stood there, patient and true,
            until the locks gave way to you.
            I had no patience, no time to spare,
            no soft corner for anyone there,
            yet with you, I soothed each frown,
            pampered your moods when you felt down.</p>
            
            <p>ou were the mature one, steady and wise,
            with calm in your voice and peace in your eyes,
            but with me, you’d pout and play,
            like a grumpy child who lost his way.
            I never listened, never obeyed,
            never followed the rules they made,
            but when your voice reached my heart,
            I did everything, right from the start.</p>
            
            <p>You were the calm to my raging sea,
            the quiet that understood me.
            And I was the roar, wild and free,
            the noise that woke your heart gently.
            Between your silence and my sound,
            a love so soft was quietly found,
            a rhythm only we could see
            a song that sounded like you and me.</p>
        `
    },
    4: {
        title: "A Promise",
        date: "From My Heart To Yours",
        body: `
            <p>I promise to love you, every single day,
            in gentle moments and storms that stay.
            In laughter bright and tears that fall,
            in silent nights and after all.</p>
            
            <p>I’ll listen close when you speak low,
            see all the parts you never show.
            I’ll choose you still when days are hard,
            protect our love, my guarded heart.</p>
            
            <p>I’ll build a life, both brave and true,
            collect each dawn I share with you.
            This isn’t a promise—it’s my vow,
            my forever, then and now.</p>
            
            <p>Some doors don’t close they become the place you stop running.</p>
        `
    },
    5: {
        title: "The Little Things",
        date: "Details That Matter",
        body: `
            <p>It's the little things about you that I've fallen in love with the most. The small sounds you make when you're comfortable, the quiet sighs, the soft hums, the way you exist when you think no one is really paying attention.</p>
            
            <p>I love how you remember the tiniest details I mention in passing. How you notice when something's bothering me before I even say a word. The way you make everything feel special even ordinary how even an ordinary Tuesday night turns into something extraordinary just because I’m with you.</p>
            
            <p>It's in these quiet moments that I realize how deeply you’ve become a part of my life. When we're doing nothing special, just existing side by side. Those lazy Sunday mornings,the random calls in the middle of the week, the comfortable silences where neither of us feels the need to fill the space with words. That’s where the magic lives.</p>
            
            <p>People chase grand gestures and perfect moments, but I've found paradise in the mundane with you. The little things aren't little at all they're everything. And if I could choose a forever, I’d spend it collecting these tiny, perfect moments with you.</p>`
    },
    6: {
        title: "Forever",
        date: "My Final Truth",
        body: `
            <p>I’ve carried this truth quietly for a long time, letting it settle in places words usually don’t reach. People talk about love like it’s temporary like something meant to pass, to fade, to be outgrown. They warn you about forever, call it unrealistic, fragile, impossible. But when I think of you, forever doesn’t scare me. It doesn’t feel dramatic or naive. It feels calm. It feels like home.</p>
            
            <p>No matter how life shifts, no matter how far we’re pulled apart by time or circumstance, I know this much with certainty I would still choose you. Not once, not impulsively, but again and again, in every version of me that ever exists. I see your flaws clearly. You see my scars just as well. I don’t love you blindly, and I don’t forgive lightly. But choosing you again was never about forgetting the hurt it was about believing in the love beneath it. My heart knew long before I allowed myself to admit it.</p>
            
            <p>I didn’t stay because it was comfortable. I stayed because it felt true. Because even when things broke, you were still where my heart wanted to rest. If forever is real, I don’t imagine it as perfection. I imagine it as growing, changing, stumbling, and still finding our way back to each other. I imagine quiet mornings, shared silences, and the kind of peace that only comes from being understood. If forever is real, I don’t imagine it as perfection. I imagine it as growing, changing, stumbling, and still finding our way back to each other. I imagine quiet mornings, shared silences, and the kind of peace that only comes from being understood.</p>
            
            <p>And if love ever asks me for an answer, it will always be you.</p>
        `
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const envelopes = document.querySelectorAll('.envelope');
    const modal = document.getElementById('letterModal');
    const letterTitle = document.getElementById('letterTitle');
    const letterDate = document.getElementById('letterDate');
    const letterBody = document.getElementById('letterBody');

    envelopes.forEach(envelope => {
        envelope.addEventListener('click', () => {
            const letterId = envelope.getAttribute('data-letter');
            const letter = letters[letterId];

            if (letter) {
                letterTitle.textContent = letter.title;
                letterDate.textContent = letter.date;
                letterBody.innerHTML = letter.body;
                modal.classList.add('active');
                
                // Prevent body scroll when modal is open
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeLetter();
        }
    });

    // Stagger animation for envelopes
    envelopes.forEach((envelope, index) => {
        envelope.style.opacity = '0';
        envelope.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            envelope.style.transition = 'all 0.6s ease';
            envelope.style.opacity = '1';
            envelope.style.transform = 'translateY(0)';
        }, index * 150);
    });
});

function closeLetter() {
    const modal = document.getElementById('letterModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLetter();
    }
});
