---
title: Initiative on Sponsorship Forwarding
description: 'meta description of the page'
date: 2021-01-01
---

t’s not a secret that open-source projects are now a critical part of almost every software project. While most open-source projects are maintained by volunteers, the sustainability of these projects becomes a big concern. The recent xz/liblzma vulnerability accident is a great example that shows the importance of open-source projects and how severe the problem could be.

There are multiple ways to support open-source projects (another excellent article by Rob Mensching, highly recommended). Funding is indeed one of its essential aspects. I believe most open-source maintainers are not doing it for money. However, maintainers still need to pay their bills to make a living and spend time maintaining the projects. Unrewarded free work is not sustainable in the long run.

We are glad to see that more and more companies and individuals started to see the importance of open-source sustainability and have started to sponsor open-source projects. We also see that some companies have started to hire or support maintainers to work on open-sources projects full-time (for example, thanks
NuxtLabs for having the Nuxt core team and me 💚.
Astro
Stackblitz
Netlify
Vercel and other companies are also doing it). We, as the maintainers, genuinely appreciate all that support.

However, today, it’s still extremely hard for maintainers to figure out ways to get the minimal funds to work on open-source projects full-time, not even asking for returns that match the value they are providing. There are many aspects of open-source funding that need to be improved. In this post, I’d like to bring up some problems we have observed and propose solutions to improve the situation.

Unbalanced Funding#
In open-source, there are different types of projects.

Some projects are more "front-facing" and are directly interacted with by developers and users on a daily basis. These projects often have short and loud names, well-designed logos, and a large community discussing them or even holding events around them.

On the other hand, there are also "underlying" dependencies that are used extensively but may not be as visible. The majority of the users may not even be aware that they are indirectly depending on them.

Whether a project is "front-facing" or "underlying", both types of projects are crucial to the ecosystem and deserve support. What they have in common is that they rely on people who invest their time and effort into maintaining these projects.

Among all the contributors and maintainers, there is a mix of individuals who have different working styles and levels of visibility. Some are more "high-profile" and actively share their work, while others prefer to stay low-profile and focus on their contributions behind the scenes. The different working styles should not diminish the value of their work.

Naturely, front-facing projects and high-profile maintainers are much more likely to receive attention and sponsorships, while the underlying dependencies and low-profile maintainers are often overlooked. To illustrate this, let me present you this famous xkcd comic again:

Open-source Sponsor Dependencies

Imagine, with that critical dependency being removed, here we have a falling apart version by Adam Leventhal:

Open-source Sponsor Dependencies

When you find a tool that has been helpful to you and you want to show your support, it’s natural to look for a way to sponsor the tool or its maintainers. We greatly appreciate this kind of support. The problem of the unsupported dependencies is not usually the sponsor’s responsibility.

However, it’s important to recognize that when we develop a "front-facing" tool or framework, we often rely on other tools and dependencies to make our work possible. It wouldn’t be fair for the "front-facing" projects to take all the credit. In reality, even those "front-facing" projects are often underfunded. That’s why we are grateful to see many open-source projects forwarding sponsorships to supporting their dependencies.

For example,
ESLint is forwarding sponsorships to its contributors and dependencies,
Astro is giving funds to the ecosystem, projects that I am participating like
Vite and
Elk are also started following similar approaches on their Open Collective. Many other projects are doing it as well.

Nicholas C. Zakas, the creator of ESLint, also wrote a great article Sponsoring dependencies: The next step in open source sustainability, explaining the importance of this.

About Me#
I am honestly super lucky to have the opportunity to work on numerous front-facing projects and be a relatively high-profile maintainer in the community and on social media. I am extremely grateful for all the sponsorships I have received. As I mentioned in another post, I have received tremendous help from the community and contributors in creating the tools that you are using. I firmly believe that I shouldn’t take all the credit and appreciation from sponsors alone. That’s why I wrote this blog post - to find a way to give back to the ecosystem with the resources and influence I have.

Sponsorships Forwarding on GitHub#
I am already sponsoring a number of maintainers who I benefit a lot from.
GitHub Sponsors is a great platform. It covers the transaction fees, and provides great connections with sponsors, maintainers, and projects, making the discovery and sponsorship process smooth. However, while it is great for individual sponsors, it lacks the ability to forward sponsorships to other projects or maintainers.
PATAK-DEV raised this feature request for GitHub two years ago, which is currently the top-upvoted request from the community, but unfortunately, it has not been resolved yet.

Here, let’s do some simple math to see why this feature is essential:

With GitHub Sponsors, the maintainer receives a monthly payout to their bank account.
This payout counts as personal income, and the maintainer needs to pay taxes based on the country they live in.
If the maintainer wants to sponsor another maintainer, they need to pay from their own pocket.
When the second maintainer receives the funds after another month, they must also pay taxes again.
For example, the tax I have to pay here in France is roughly 41%. Assume both maintainers have the same tax rate. This means that when forwarding sponsorship on GitHub Sponsors, the second maintainer will only receive

(1 - 41%) x (1 - 41%) = 34.81%
of the original amount, plus two months of delay in between (on top of the case that GitHub already covers the transaction fees). Sometimes, we even have circular sponsorships because we both want to show appreciation to the others. Ultimately, this is a significant loss, especially when there is not enough funding for open source already (it’s also worth mentioning that GitHub Sponsors is not yet available in all countries).

Despite GitHub Sponsors limitations, a lot of maintainers are still forwarding part of their funds to others (
Danielroe’s Sponsoring,
Matias’ Sponsoring,
Kazupon’s Sponsoring and many more). While we really wanted to support more dependencies and maintainers, the current situation on GitHub is not very feasible in the long run.

Open Collective#
Another popular platform for open-source projects to receive sponsorships is Open Collective. It provides great transparency on how funds are collected and spent.

For open-source projects, Open Source Collective is a commonly used fiscal host on Open Collective. It charges a total of 10% transaction and hosting fees upfront. The important part is that it allows funds to be forwarded to other projects on the same fiscal host with no additional fees. This makes it a much better fit for the sponsorship forwarding use case.

Anthony Fu’s Collective#
So, I came up with the idea of creating my personal collective:
Anthony Fu Collective

Where you can sponsor my work across the ecosystem, including but not limited to:
Vite
Vue
Nuxt
Vitest
VueUse
UnoCSS
Slidev
Elk
Shiki
TwoSlash
ESLint Stylistic

The main difference is that I won’t take the funds for myself;
(except for occasional expense reimbursements like hosting or domain renewal)

All the funds will be redistributed to the dependencies and contributors. Each month, I will select a few dependencies and contributors to forward the funds. Depending on the amount raised, I may also set up recurring sponsorships for high-impact dependencies in the future. You give the trust and support to me, and I will make sure the funds are well spent.

Open-source Sponsor Dependencies

To allow differentiating easily, I will treat the funds on GitHub Sponsors and Open Collective differently:

Sponsor Anthony Fu on Open Collective - To sponsor the dependencies and ecosystem of the projects Anthony maintains.
Sponsor Anthony Fu on GitHub Sponsors - To sponsor Anthony’s personal work on open-source projects.
I would generally recommend sponsoring on Open Collective first to support the entire ecosystem and open source. Well, I’d also be grateful if you could sponsor on both platforms :P

Recurring sponsorships are highly appreciated. They help provide a more consistent monthly income and contribute to long-term sustainability for the projects and maintainers.

This collective is my approach trying to see how I can help the ecosystem with the resources and knowledge I have. It also serves as an initiative to encourage more maintainers and projects to follow, by forwarding the support they receive to the dependencies and contributors they benefit from.

Transparency#
Since this involves money and trust, I think transparency is crucial here. I will try to answer honestly some questions you might have below. Feel free to raise more questions if you have any other concerns, I will try to update this post with my responses accordingly.

Why am I Doing this?#
As I explained throughout this post, my intention is to contribute to the open-source ecosystem and make it better with my little efforts.

To be completely honest and transparent, yes, I couldn’t say I am not doing this 100% selflessly. Despite the fact that I am not taking funds for myself, I might still indirectly benefit from this initiative.

I do undeniably have vanity and ego due to my human nature, and I am not ashamed to admit it. I do care about my reputation and influence to some extent. I see this endeavor as similar to contributing to open source. Does everyone do open source completely selflessly? I doubt that. But does that mean everyone is doing it solely for their own benefit? I don’t believe that either. The beauty of open source lies in its non-zero-sum nature, where maintainers can derive benefits such as a sense of accomplishment, skill improvement, recognition, and reputation, while providing value to benefit the entire world.

Being part of the open-source community who also relies on it, I certainly have the incentive to help the community become better and more sustainable. I am not a materialistic person, and the sponsorships I have received are not huge, but they are enough for me to make a basic living. While I do believe there are other projects and maintainers who would benefit more from the funds at this time.

Ultimately, my goal is to increase the overall funding into the open-source ecosystem and develop robust systems to support projects, so that everyone can reap the benefits of open source and acknowledge the hard work put in by its contributors.

How to Ensure the Distribution is Fair?#
Regrettably, I don’t think it’s possible to design a "perfect algorithm" to "score" and distribute the funds fairly. Representing a project, a person, or their work with a single number to rank is unrealistic.

When it comes to equality and equity, I believe it’s important to prioritize supporting underrepresented and underfunded projects and maintainers. This would involve subjective judgment, and while I can’t guarantee complete fairness, I will strive to be transparent and sincere. I will actively engage with the community and openly communicate how and why the funds are distributed.

Why "Personal" Collective#
As mentioned above, there is no absolute way to distribute the funds fairly. In this case, it’s based on my judgment and the trust you give me. As the starting point of this initiative, I believe it’s easier and simpler to start with a personal collective and adjust based on the feedback and results. Meanwhile, a personal collective not bound to a specific project could be more flexible and better support the goals of this initiative.

This is certainly not going to be the only collective that forwards sponsorships. Maybe in the future, sponsoring multiple individuals collectively and group collectives would help make the distribution less opinionated and less biased.

For a related example, inspired by this tweet, we recently started an organization with several maintainers to improve the performance and quality across JavaScript packages. Later, we might set up a collective for this organization so you can sponsor the efforts on performance improvements. Stay tuned for a future announcement.

Other Alternative Platforms?#
There are quite a few other platforms for open-source funding that also bring exciting solutions to this problem.

This collective is only one more idea, an attempt to help our ecosystem become more sustainable - feel free to explore other platforms and initiatives you think are making sense. The main difference between this collective and the others is that it has me working behind it, instead of just metrics and algorithms. The human factor also made it possible to reduce sponsorships waterflow, where on some platforms the sub-dependencies are harder to get enough funds. With this collective, I can reach the critical dependencies and contributors directly to support them. I will spend time doing the research and communications every month to find important dependencies to support.

Sponsor Now#
This initiative is something I couldn’t do alone. I would need your support to make it happen.

If I have convinced you this initiative is meaningful, use the buttons below to help me support the open-source ecosystem and make it more sustainable. Thank you!

Sponsor the Ecosystem
Feedback#
I am eager to hear your feedback on this initiative. If you have any thoughts, concerns, or suggestions, please feel free to reach out to leave me a comment under this tweet or this toot. You can also mail me at hi@antfu.me.

Thank you for reading this long post. I hope we can take this initiative as a small step and make open-source better and more sustainable together. 💚
