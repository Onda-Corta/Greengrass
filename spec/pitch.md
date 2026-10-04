# Pre-MVP Pitch

**A campaign assistant on Telegram that drafts the day's posts, and a person who approves every one**

Drafted: 2026-09-29
Revised: 2026-10-04

---

## The idea

Every morning a campaign has to decide what to say that day and turn it into posts. That takes hours of staff time and a candidate, or a committee president, who is hard to reach.

The Campaign Agent does the drafting. The person it works for decides, from their own phone, in a chat. They learn no new screen. The demonstration runs on Telegram, a free app; see [what it is not](#what-it-is-not) for why.

It works for a **candidate**, whose posts are written in the first person, or for a **regional committee**, whose posts are written in the committee's voice, with no personal name or photo, and approved by its president.

## How a morning goes

The screenshots are from an earlier prototype of the same flow, in Spanish, as it looked on a phone. That prototype ran on WhatsApp and the demonstration runs on Telegram, so the chat around the cards differs. The cards and the buttons are the same.

1. The Campaign Agent writes to the person in the chat and asks what to focus on today.
2. They answer with a text message: the topic, the tone, what is on the agenda. They can type it or dictate it with the phone's own keyboard. A voice note gets a one-line reply asking for text.
3. The agent sends back talking points as a PDF, drawn only from what the person has already said in public. Each point cites where it comes from. Where a fact is missing, the agent leaves a visible gap instead of making one up.

   <img src="img/pitch/02-talking-points.jpg" alt="A PDF of talking points with three short messages; the third leaves a [PROPUESTA] gap for a missing fact" width="360">

4. The agent proposes four posts. Each arrives as its own card: an image of how the post will look, the network, the time it would go out, and three buttons: **approve**, **request changes** and **discard**.

   <img src="img/pitch/04-four-posts.jpg" alt="Four cards side by side: a post for X, one for Facebook, one for Instagram and an Instagram story, each with Aprobado, Pedir cambios and Descartar buttons" width="720">

5. The person taps a button on each card. Asking for changes requires a comment, so the team knows what to change.

   <img src="img/pitch/03-approve.jpg" alt="The candidate taps Aprobado on piece 1 of 4, for X" width="360">

6. The campaign team, from a screen on a computer, sees the request and writes the new version. They can also edit any post on their own. The new version arrives in the chat as a new card, and it needs a new approval.
7. At its time, each approved post goes out. A version nobody approved does not.

   <img src="img/pitch/06-scheduled.jpg" alt="The candidate approves version 2 of the Facebook post; the agent confirms four posts are scheduled for today" width="360">

8. The team's screen keeps the whole record: every conversation, every version, who approved which one, and what each step cost.

## The rule

Nothing goes out unless a named person approved that exact version. Changing a post cancels its approval.

## The demonstration

It takes about fifteen minutes. Someone narrates, someone holds the phone, and someone runs the team's screen on a computer the audience can see.

1. **A rehearsed morning.** We walk through the morning of Juan Dalmau, whose campaign has agreed. The topic is health, the Plan Universal de Salud. The posts are built only from his public statements, each with its source, and the talking points show the gaps where he has said nothing.
2. **Your turn.** Everyone in the room opens one link on their own phone and answers a few questions: do you work for a committee or for a candidate's campaign, and your name, role and region (or the candidate's name and office). They can add a theme. They get their own morning, and their conversation appears on the team's screen next to the others.

- **Real:** the Telegram conversation, the drafting, the talking points, the artwork and the approvals.
- **Simulated:** publishing and the agenda. A demo clock moves the day forward, and no post reaches a real account.
- **No AI images.** The artwork is made from templates and, where the person has them, the campaign's own photos.
- **Marked as a demo, everywhere.** Every post image, the PDF, every chat message and the team's screen say so. The system adds the mark, not the AI, so nothing anyone writes can take it off.

## What it keeps safe

- **No voter, donor or member data.** There are no contact lists, and none is loaded.
- **It publishes nothing.** It has no access to any social media account.
- **The only personal data is the person's own:** what they write in the chat and what they say about themselves when they register. They are told in the first message that this is a demo, and that what they write passes through an AI model provider.
- **It never invents a quote.** For a candidate it knows only from what they have said in public, or what the person tells it, the posts carry no words or positions it was not given. Where it has nothing, it shows a gap.
- **Everything is deleted the same day**, at the end of the session. The first message says so.
- **Each person is separate.** What one person writes and receives is never seen by another, even though the team's screen shows everyone.
- **Registration is controlled.** The link is shared only with the people in the room. Registration opens and closes from the team's screen, the link's code changes afterwards, and the number of people and the cost per person are capped. A kill switch stops every AI call at once.

## What each campaign provides

Nothing in advance, for the live part. Telegram on the phone, and a few answers when you open the link.

For a rehearsed morning of your own, which we do only with a campaign that has agreed to it:

- Five to ten photos the campaign has the right to use.
- Its visual identity, or permission to use its party's.
- Its public accounts on each network.
- Three to five topics, with what the person has already said publicly on each.
- Their Telegram account and consent.
- An hour from someone on the team to rehearse.

## What it is not

- **It is not tied to Telegram.** The demonstration uses Telegram because it can be set up in minutes, with no business verification. Campaigns live on WhatsApp, but WhatsApp's business terms prohibit political party activity. The production channel is decided with each campaign.
- **It is not a product yet.** If a campaign wants to keep using it the next day, the honest answer is *not yet*.
- **It is not proof of cost.** It shows what one morning costs, not what a campaign would pay.
