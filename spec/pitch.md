# Pre-MVP Pitch

**A campaign assistant on Telegram that drafts the day's posts, and a person who approves every one**

Drafted: 2026-09-29
Revised: 2026-10-06

---

## The idea

Every morning a campaign has to decide what to say that day and turn it into posts. That takes hours of staff time and a candidate, or a committee president, who is hard to reach.

The Campaign Agent does the drafting. The person it works for decides, from their own phone, in a chat. They learn no new screen. The demonstration runs on Telegram, a free app; see [what it is not](#what-it-is-not) for why.

It works for a **candidate**, whose posts are written in the first person, or for a **regional committee**, whose posts are written in the committee's voice, with no personal name or photo, and approved by its president.

## How a morning goes

The screenshots are from an earlier prototype of the same flow, in Spanish, as it looked on a phone. That prototype ran on WhatsApp and the demonstration runs on Telegram, so the chat around the cards differs. The cards and the buttons are the same.

1. Early in the morning, the Campaign Agent writes to the person in the chat: good morning, the day's agenda, and what to focus on today.
2. They answer with a text message: the topic, the tone, what is on the agenda. They can type it or dictate it with the phone's own keyboard. A voice note gets a one-line reply asking for text. While the agent works, it says it needs a moment.
3. The agent sends back three key messages for the day, and talking points as a PDF, drawn only from what the person has already said in public. Each point cites where it comes from. Where a fact is missing, the agent leaves a visible gap instead of making one up.

   <img src="img/pitch/02-talking-points.jpg" alt="A PDF of talking points with three short messages; the third leaves a [PROPUESTA] gap for a missing fact" width="360">

4. The agent proposes four posts. Each arrives as its own card: the post's image with its headline, the network, the post's text, and three buttons: **approve**, **request changes** and **discard**.

   <img src="img/pitch/04-four-posts.jpg" alt="Four cards side by side: a post for X, one for Facebook, one for Instagram and an Instagram story, each with Aprobado, Pedir cambios and Descartar buttons" width="720">

5. The person taps a button on each card, and the card changes to show who decided and when. Asking for changes requires a comment, so the team knows what to change.

   <img src="img/pitch/03-approve.jpg" alt="The candidate taps Aprobado on piece 1 of 4, for X" width="360">

6. The campaign team, from a screen on a computer, sees the request and writes the new version. They can also edit any post on their own. The new version arrives in the chat as a new card that says who wrote it and what was asked for, and it needs a new approval.
7. At the set time, each approved post goes out. A version nobody approved is held back.

   <img src="img/pitch/06-scheduled.jpg" alt="The candidate approves version 2 of the Facebook post; the agent confirms four posts are scheduled for today" width="360">

8. The team's screen keeps the whole record: every conversation, every version, who approved which one, and what each step cost. From there the team can also write to the person, try again when something fails, or take over a conversation.

## The rule

Nothing goes out unless a named person approved that exact version. Changing a post cancels its approval.

## The demonstration

It takes about fifteen minutes. Someone narrates, someone holds the phone, and someone runs the team's screen on a computer the audience can see.

1. **A rehearsed morning.** We walk through the morning of Juan Dalmau, whose campaign has agreed. A demo clock runs his morning from 5:30 to 7:18 in about five minutes, and at 5:30 the agent writes to him first. The topic is health, the Plan Universal de Salud. The posts are built only from his public statements, each with its source, and the talking points show the gaps where he has said nothing, such as the Medicaid fiscal cliff in 2027. He asks for a change to one post, the team writes the new version, and he approves it. One post is left unapproved on purpose, and at 7:18 it is held back while the rest go out.
2. **Your turn.** Everyone in the room opens one link on their own phone and answers a few questions: do you work for a committee or for a candidate's campaign, and your name, role and region (or the candidate's name and office). They can add a theme. Then they write their own morning message, get their own morning, and their conversation appears on the team's screen next to the others.

- **Real:** the Telegram conversation, the drafting, the talking points, the artwork and the approvals.
- **Simulated:** publishing and the agenda. A demo clock moves the day forward, and no post reaches a real account.
- **No AI images.** The artwork is laid out in the campaign's colours, typeface and logo, with the post's headline, the name and the date on it. Nothing in it is generated. For now it carries no photos.
- **Marked as a demo, everywhere.** Every post image, the PDF, every chat message and the team's screen say so. The system adds the mark, not the AI, so nothing anyone writes can take it off.

## What it keeps safe

- **No voter, donor or member data.** There are no contact lists, and none is loaded.
- **It publishes nothing.** It has no access to any social media account.
- **The only personal data is the person's own:** what they write in the chat and what they say about themselves when they register. They are told in the first message that this is a demo, and that what they write passes through an AI model: an open model that runs on Cloudflare.
- **It never invents a quote.** For a candidate it knows only from what they have said in public, or what the person tells it, the posts carry no words or positions it was not given. Every quote is checked word for word against a public statement before anything reaches the chat, and so is every figure. Where it has nothing, it shows a gap.
- **Everything is deleted the same day**, at the end of the session, including the messages in the chat itself. The first message says so.
- **Each person is separate.** What one person writes and receives is never seen by another, even though the team's screen shows everyone.
- **Registration is controlled.** The link is shared only with the people in the room. Registration opens and closes from the team's screen, the link's code changes afterwards, and the number of people and the cost per person are capped. A kill switch stops every AI call at once.

## What each campaign provides

Nothing in advance, for the live part. Telegram on the phone, and a few answers when you open the link.

For a rehearsed morning of your own, which we do only with a campaign that has agreed to it:

- Five to ten photos the campaign has the right to use.
- Its visual identity (a colour, a typeface and its logo), or permission to use its party's.
- Its public accounts on each network.
- Three to five topics, with what the person has already said publicly on each.
- Their Telegram account and consent.
- An hour from someone on the team to rehearse.

## What it is not

- **It is not tied to Telegram.** The demonstration uses Telegram because it can be set up in minutes, with no business verification. Campaigns live on WhatsApp, but WhatsApp's business terms prohibit political party activity. The production channel is decided with each campaign.
- **It is not a product yet.** If a campaign wants to keep using it the next day, the honest answer is *not yet*.
- **It is not proof of cost.** It shows what one morning costs (drafting the rehearsed one costs about a cent and a half in the AI model), not what a campaign would pay.
