# Diary Entry 17: Two Lanes

**Date:** 2026-11-13

---

## The Task

Entry 16 ended with a demonstration on a phone and a corpus of 90-odd documents describing one product for one kind of client. Six weeks later the direction arrived as a memo, and the memo did not describe that product.

It described infrastructure. A headless Core, a catalogue of modules each client switches on individually, and two products sold on top: Greengrass for parties, unions and community movements, and Basecamp for advertisers, PR people and agencies. Each client in its own instance. A chat doing 70 to 80% of the daily work. An event bus between instances instead of a layer in the middle. NationBuilder kept, not replaced.

The job was to write that into the spec without pretending it had always been there, and without deciding anything the memo had left open.

## Decided, and Not

This was the part most likely to go wrong, so it got its own rule before a word was written. The memo was a draft for discussion with a short list of things the product side had actually decided. Everything else was a proposal or a question.

So the six ADRs do not share a status. Identity per client and the prices are `Accepted`. The other four are `Proposed`, and each carries a table or a label saying which lines inside it are decided: the two lanes themselves, the CRM in the Core, one payments module for both lanes, the gate on agents covering both products, the Asociación de Publicistas working exactly like the Alianza, NationBuilder sync by CSV. A proposed ADR with decided lines in it is an awkward object. It is also the true state of things, and two cleaner documents would each have had to pretend to something.

A proposed ADR cannot amend an accepted one, so the banners had to learn a second phrase. ADR-001 does not say *Amended by* ADR-024. It says *Amendment proposed by*, and that nothing below it changes until that ADR is accepted.

## Two Reversals

Most of what entries 13 to 15 recorded was addition. This is not. Two accepted decisions were reversed, and I want that said plainly here because the ADRs say it in more careful language.

**Pricing.** In March the price was a flat subscription, not tied to any usage metric. In September ADR-019 kept the subscription and added metered costs passed through at cost, with an instruction recorded in entry 13 under the heading *No vig*: the supplier's price is the tenant's price, and the platform earns from the subscription alone. Seven weeks later the price is cost plus a commission in the political lane, and cost plus a 30% margin plus a commission in the commercial one. The margin is exactly what ADR-019 refused, and it refused it with a reason: a platform that earns from consumption has a reason to push consumption. ADR-026 does not answer that argument. It records that the decision was taken with the argument on the table.

What survived is the machinery. The Core still meters the supplier cost of every call, statements are still itemised, spend caps still exist, nothing is on by default, and an alliance can still pay for its members. The new prices sit on top of the number ADR-019 taught the platform to measure.

What did not arrive with the decision is its definitions. What "cost" includes. How a commission is calculated, and of what. What the 30% applies to. How the two lanes split the cost of a capture corpus they share. Whether the free plan, in the product description since 2024, still exists. Who "the product's owner" and "the Comercializadora" are. ADR-026 is accepted and cannot yet produce a number. Each of those is written down as open, and the two undefined names carry a `REVISIT:` in both languages wherever they appear.

**Identity.** ADR-003 gave every person one platform identity and a profile in each organization, and the architecture built a service for it outside every tenant, with its primary in Estonia or Switzerland and a replica in each country. It was the one place where data about people in every organization sat together. It is gone. Each instance runs its own identity service and holds its own accounts. A person who works for the PIP and for the Alianza has two logins.

That is simpler, and it costs three things nobody has replaced: a donor's own record across organizations, an identity that outlives the organization it was made in, and one opt-out of data sharing that binds everyone at once. ADR-025 lists them as open. It rewrites the sections that define identity and marks the rest. There are sentences in the workflows, the geography spec and the wireframes that still say "platform identity", and a reconciliation pass is owed.

## The Voter File Went In and Came Back Out

The first draft of the memo put the voter file in the Core, and of course it did. It is the first of the three things no competitor integrates, alongside offline field tools and tools for coalitions.

Then the commercial lane arrived, and with it the requirement that the Core be the same for both. A voter file means nothing to an advertising agency. The second draft took it back out and made it a module of the political lane that Greengrass can switch on by default.

That is a recommendation, not a decision, and ADR-022 treats it as one: the data model stands as written, voter data and all, until somebody decides. I am recording the round trip because it is the clearest example of what the second lane does to the first. Nothing about the voter file changed. What changed is that there is now a client for whom it is irrelevant, and the test for what belongs in the Core became whether that client needs it.

## The Chat Is the Agent

The memo wants a chat that does most of the work. ADR-018 has been holding a gate since September against exactly that: something that reads across features, holds credentials and invokes operations.

There was no way around it, and the memo did not try. Its position is that the chat is the person's hands and not a second actor. It acts under that person's role and contracts, confirms every write with a tap, never acts in the background, and picks only among operations a module has declared. That went into ADR-018's proposal section, next to the per-tenant harness from entry 14, as a second thing for the review to weigh.

One thing in this area is decided: the gate covers the whole Core. Neither product ships the chat before the review is accepted. It is the single place where the two lanes, which are otherwise promised never to wait for each other, both wait.

Writing the position into ADR-018 turned up something the memo had not said. Bounding the chat by the person is not the same as bounding it by the feature. An Org Admin's hands reach the whole CRM, support scores included, so the profiling question the review already had is no smaller under this position than under the harness.

## What Is Marked and Not Asserted

The memo flagged several facts as unverified, and they stayed flagged. Whether Parsons has a NationBuilder connector, and what it covers. Its licence. NationBuilder's API limits. Whether NATS can export streams across separate clusters and clouds the way the bus needs. Each appears in the spec behind the word **Verify**, and the glossary now treats that word as a marker, like `REVISIT:`.

Two modules in the catalogue, Crisis management and Polls & surveys, have a name and no specification. They are listed as exactly that.

And the name. "Greengrass" is now the political product. The Core has no name. Every document before this one says "GreenGrass" and means the whole platform, and they were left alone. "Basecamp" is also somebody else's project-management software, and a trademark check is on the list.

## What the Rules Held

The glossary went first again: one new part, eight sections, and six resolved rules, the oddest of which is that the module called *Encuestas y sondeos* keeps a word the glossary had banned two months earlier, because the name is the product side's.

Nothing was fixed silently. `product.md`, the oldest document in the repository, got a section at the top that says what changed and left 2024 underneath it as written. Where a section was reversed, the old decision is still on the page under a heading that says it was replaced. The screen inventory was not re-tagged by surface, because that is a judgement on 240 screens against module boundaries that are not accepted yet. It is written down as owed.

## Where It Stands

| Artifact | Count | Status |
|---|---|---|
| Specs | 16 | Product, users, fundraising, integrations, comms intelligence, MVP, security and compliance amended |
| ADRs | 27 | 22 accepted, 5 proposed |
| Accepted decisions reversed | 2 | Pricing (ADR-007, ADR-019) and identity (ADR-003) |
| Screens | 240 | Unchanged; re-tagging by surface owed |
| Modules named and not specified | 2 | Crisis management, Polls & surveys |
| Diary entries | 17 | Current |
| Production gate | 1 | Open, and now in front of both lanes |

## Next

The answers only the product side can give: the pricing definitions, the two undefined names, the voter file, the bus, the name of the Core. Then the checks marked *Verify*, which decide whether two of the proposals are real. Then the review, which was already the critical path for one product and is now the critical path for two.
