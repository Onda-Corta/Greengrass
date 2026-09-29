# Pre-MVP Pitch

**A campaign assistant on WhatsApp that drafts the day's posts, and a candidate who approves every one**

Drafted: 2026-09-29

---

## The idea

Every morning a campaign has to decide what to say that day and turn it into posts. That takes hours of staff time and a candidate who is hard to reach.

The Campaign Agent does the drafting. The candidate decides, from their own phone, in WhatsApp, where they already spend the day. They install nothing and learn no new screen.

## How a morning goes

The screenshots are from the prototype, in Spanish, as the candidate sees it on their phone.

1. The Campaign Agent writes to the candidate on WhatsApp and asks what to focus on today.
2. The candidate answers with a voice note: the topic, the tone, what is on the agenda.

   <img src="img/pitch/01-morning.jpg" alt="The Campaign Agent greets the candidate; the candidate answers with a voice note about the water outage and a radio interview" width="360">

3. The agent sends back talking points as a PDF, drawn only from what the candidate has already said in public. Each point cites where it comes from. Where a fact is missing, the agent leaves a visible gap instead of making one up.

   <img src="img/pitch/02-talking-points.jpg" alt="A PDF of talking points with three short messages; the third leaves a [PROPUESTA] gap for a missing fact" width="360">

4. The agent proposes four posts. Each arrives as its own card: an image of how the post will look, the network, the time it would go out, and three buttons: **approve**, **request changes** and **discard**.

   <img src="img/pitch/04-four-posts.jpg" alt="Four cards side by side: a post for X, one for Facebook, one for Instagram and an Instagram story, each with Aprobado, Pedir cambios and Descartar buttons" width="720">

5. The candidate taps a button on each card.

   <img src="img/pitch/03-approve.jpg" alt="The candidate taps Aprobado on piece 1 of 4, for X" width="360">

6. The campaign team, from a screen on a computer, can ask for changes. So can the candidate, by text or voice note. The agent sends new versions, and each new version needs a new approval.

   <img src="img/pitch/05-changes.jpg" alt="The agent reports that the team asked for changes to two posts and sends version 2 of the X post, which the candidate approves" width="360">

7. At its time, each approved post goes out. A version nobody approved does not.

   <img src="img/pitch/06-scheduled.jpg" alt="The candidate approves version 2 of the Facebook post; the agent confirms four posts are scheduled for today" width="360">

8. The team's screen keeps the whole record: every version, who approved which one, and what each step cost.

## The rule

Nothing goes out unless a named person approved that exact version. Changing a post cancels its approval.

## The demonstration

It takes about fifteen minutes and two people. The candidate holds their own phone. Someone runs the team's screen on a computer the audience can see.

- **Real:** the WhatsApp conversation, the voice transcription, the drafting, the talking points, the artwork and the approvals.
- **Simulated:** publishing and the candidate's calendar. A demo clock moves the day forward, and no post reaches a real account.
- **No AI images.** The artwork is made from templates, the campaign's own photos and its visual identity.

## What it keeps safe

- **No voter, donor or member data.** There are no contact lists, and none is loaded.
- **It publishes nothing.** It has no access to any social media account.
- **The only personal data is the candidate's own:** their messages, their voice notes and the photos the campaign supplies. They are told beforehand that their voice passes through a transcription service and their messages through an AI model provider.
- **Everything is deleted afterwards**, unless the campaign asks to keep the record.
- **Each campaign is separate.** Nothing from one appears in another's demonstration.

## What each campaign provides

- Five to ten photos the campaign has the right to use.
- Its visual identity, or permission to use its party's.
- Its public accounts on each network.
- Three to five topics, with what the candidate has already said publicly on each.
- The candidate's WhatsApp number and consent.
- An hour from someone on the team to rehearse.

## What it is not

- **It is not tied to WhatsApp.** The demonstration uses WhatsApp because that is where candidates already are. In production it will very likely need a different channel: WhatsApp's business terms prohibit political party activity.
- **It is not a product yet.** If a campaign wants to keep using it the next day, the honest answer is *not yet*.
- **It is not proof of cost.** It shows what one morning costs, not what a campaign would pay.
